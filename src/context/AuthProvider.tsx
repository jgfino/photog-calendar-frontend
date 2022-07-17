import { createContext, useContext, useEffect, useState } from "react";
import APIClient from "../api/APIClient";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContent = {
  initializing: boolean;
  api: APIClient;
  signIn: (code: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  isSignedIn: boolean;
  shouldSignUp: boolean;
  setShouldSignUp: (shouldSignUp: boolean) => void;
};

const AuthContext = createContext<AuthContent>(undefined!);

const AuthProvider = ({ children }: { children: any }) => {
  const [api, setApi] = useState<APIClient>(undefined!);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [shouldSignUp, setShouldSignUp] = useState(false);

  useEffect(() => {
    (async () => {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const refreshToken = await AsyncStorage.getItem("refreshToken");

      setApi(new APIClient(accessToken, refreshToken));
    })();
  }, []);

  useEffect(() => {
    if (api != null && initializing) {
      setInitializing(false);
    }
  }, [api, initializing]);

  useEffect(() => {
    if (api) {
      setIsSignedIn(api.isSignedIn());
    }
  }, [api]);

  const signIn = async (code: string) => {
    const { newUser, tokens } = await api.exchangeCode(code);
    await AsyncStorage.setItem("accessToken", tokens.accessToken);
    await AsyncStorage.setItem("refreshToken", tokens.refreshToken);
    setApi(new APIClient(tokens.accessToken, tokens.refreshToken));
    return newUser;
  };

  const signOut = async () => {
    await api.logout();
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("refreshToken");
    setApi(new APIClient(null, null));
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        isSignedIn,
        api,
        initializing,
        shouldSignUp,
        setShouldSignUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
