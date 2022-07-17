import { useEffect, useState } from "react";
import styled from "styled-components/native";
import { useAuth } from "../context/AuthProvider";
import { AuthStackParamList, RootStackParamList } from "../routes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<
  AuthStackParamList & RootStackParamList,
  "OAuthRedirect"
>;

const OAuthRedirect: React.FC<Props> = ({ navigation }) => {
  const urlParams = new URLSearchParams(window.location.search);
  const [loading, setLoading] = useState(true);

  const [code] = useState(urlParams.get("code"));

  const { signIn, isSignedIn, setShouldSignUp } = useAuth();

  useEffect(() => {
    if (loading && code) {
      signIn(code)
        .then((newUser) => {
          if (newUser) {
            setShouldSignUp(true);
          }
        })
        .catch((e) => console.error(e))
        .finally(() => {
          setLoading(false);
        });
    }
  }, [code, loading, signIn, navigation]);

  useEffect(() => {
    if (!isSignedIn && !loading) {
      navigation.replace("SignIn");
    }
  }, [isSignedIn, navigation, loading]);

  return <Container />;
};

const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
`;

export default OAuthRedirect;
