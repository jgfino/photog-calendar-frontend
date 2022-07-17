import React from "react";
import { ThemeProvider } from "styled-components/native";
import { darkTheme, lightTheme } from "./themes";
import { AuthProvider, useAuth } from "./context/AuthProvider";
import RootStack from "./navigation/RootStack";
import AuthStack from "./navigation/AuthStack";
import { NavigationContainer } from "@react-navigation/native";
import { LinkingStatic, useColorScheme } from "react-native";

const AppWithAuth = () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};

const App = () => {
  const colorScheme = useColorScheme();

  const { isSignedIn, initializing } = useAuth();

  const theme = colorScheme === "light" ? lightTheme : darkTheme;

  if (initializing) return null;

  const linking = {
    prefixes: ["http://localhost:19006/", "photogcalendar://"],
    config: {
      screens: {
        OAuthRedirect: "/success",
        NewUser: "create-account",
        [isSignedIn ? "Home" : "SignIn"]: "",
      },
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer linking={linking}>
        {isSignedIn ? <RootStack /> : <AuthStack />}
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default AppWithAuth;
