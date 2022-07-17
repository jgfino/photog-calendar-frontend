import { Linking } from "react-native";
import styled from "styled-components/native";

const SignIn = () => {
  return (
    <Container>
      <LoginButton
        title="Login With Discord"
        onPress={() =>
          Linking.openURL(
            "https://discord.com/api/oauth2/authorize?client_id=966491845150519406&redirect_uri=http%3A%2F%2Flocalhost%3A19006%2Fsuccess&response_type=code&scope=identify"
          )
        }
      />
    </Container>
  );
};
const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const LoginButton = styled.Button`
  color: ${({ theme }) => theme.colors.background};
  background-color: ${({ theme }) => theme.colors.text};
  border: none;
  width: 10em;
  cursor: pointer;
  border-radius: 1em;
  align-self: center;
  padding: 0.5em;
`;

export default SignIn;
