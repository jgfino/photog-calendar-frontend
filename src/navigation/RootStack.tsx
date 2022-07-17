import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../routes";
import Home from "../screens/Home";
import NewUser from "../screens/NewUser";
import OAuthRedirect from "../screens/OAuthRedirect";
import { useAuth } from "../context/AuthProvider";

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  const { shouldSignUp } = useAuth();
  return (
    <Stack.Navigator initialRouteName={shouldSignUp ? "NewUser" : "Home"}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="NewUser" component={NewUser} />
    </Stack.Navigator>
  );
};

export default RootStack;
