import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const baseUrl = "http://localhost:3001/api";

class APIClient {
  #accessToken: string | null;
  #refreshToken: string | null;

  constructor(accessToken: string | null, refreshToken: string | null) {
    this.#accessToken = accessToken;
    this.#refreshToken = refreshToken;
  }

  async refreshTokens() {
    try {
      const req = await axios.post(
        `${baseUrl}/auth/token`,
        { refreshToken: this.#refreshToken },
        { headers: { Authorization: `Bearer ${this.#accessToken}` } }
      );
      const { accessToken, refreshToken } = req.data;
      await AsyncStorage.setItem("accessToken", accessToken);
      await AsyncStorage.setItem("refreshToken", refreshToken);
      this.#accessToken = accessToken;
      this.#refreshToken = refreshToken;
    } catch (e) {
      this.#accessToken = null;
      this.#refreshToken = null;
    }
  }

  async post(url: string, body: object, retry = true): Promise<any> {
    const req = axios.post(url, body, {
      headers: { Authorization: `Bearer ${this.#accessToken}` },
    });

    try {
      const res = await req;
      return res.data;
    } catch (e) {
      if (retry) {
        await this.refreshTokens();
        return this.post(url, body, false);
      } else {
        throw e;
      }
    }
  }

  async get(url: string, retry = true): Promise<any> {
    const req = axios.get(url, {
      headers: { Authorization: `Bearer ${this.#accessToken}` },
    });

    try {
      const res = await req;
      return res.data;
    } catch (e) {
      if (retry) {
        await this.refreshTokens();
        return this.get(url, false);
      } else {
        throw e;
      }
    }
  }

  isSignedIn() {
    return this.#accessToken != null && this.#refreshToken != null;
  }

  async getProfile(id?: string) {
    return this.get(`${baseUrl}/profile/${id ? `/${id}` : ""}`);
  }

  async exchangeCode(code: string) {
    const res = await axios.post(`${baseUrl}/auth/login`, { code });
    const { tokens, newUser } = res.data;
    return { newUser, tokens };
  }

  async logout() {
    await axios.post(`${baseUrl}/auth/logout`, {
      refreshToken: this.#refreshToken,
    });
  }
}

export default APIClient;
