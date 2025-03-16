import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
// import WelcomeScreen from "../screens/WelcomeScreen";
import LoadingScreen from "../screens/Loading/LoadingScreen";
import LoginPage from "../screens/auth/LoginPage";
import RegisterPage from "../screens/auth/RegisterPage";
import VerificationCodeLogin from "../screens/auth/VerificationCodeLogin";
import RegisterVerification from "../screens/auth/RegisterVerification";
import WelcomeScreen from "../screens/Welcome/WelcomeScreen";

const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Welcome" component={WelcomeScreen} />
    <Stack.Screen name="Loading" component={LoadingScreen} />
    <Stack.Screen name="LoginPage" component={LoginPage} />
    <Stack.Screen name="RegisterPage" component={RegisterPage} />
    <Stack.Screen name="RegisterVerification" component={RegisterVerification} />
    <Stack.Screen name="VerificationCodeLogin" component={VerificationCodeLogin} />
  </Stack.Navigator>
);

export default AuthStack;
