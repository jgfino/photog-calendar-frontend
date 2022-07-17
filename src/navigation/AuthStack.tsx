import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../routes";
import OAuthRedirect from "../screens/OAuthRedirect";
import SignIn from "../screens/SignIn";

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="OAuthRedirect" component={OAuthRedirect} />
    </Stack.Navigator>
  );
};

export default AuthStack;
