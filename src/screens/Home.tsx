import { useState, useEffect } from "react";
import styled from "styled-components/native";
import { useAuth } from "../context/AuthProvider";

const Home = () => {
  const client = useAuth();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const getProfile = async () => {
      if (client.isSignedIn) {
        try {
          const user = await client.api.getProfile();
          setProfile(user);
        } catch (e) {
          // Handle different errors
          client.signOut();
        }
      }
    };
    getProfile();
  }, [client]);

  if (!profile) return null;

  return (
    <Container>
      <LoginButton
        title={`Hello, ${profile.username}#${profile.discriminator}. Click to log out`}
        onPress={client.signOut}
      />
    </Container>
  );
};
const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
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

export default Home;
