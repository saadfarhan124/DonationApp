import { createStackNavigator } from "@react-navigation/stack";
import React, { Component } from "react";

import LoadingScreen from "../screens/shared/LoadingScreen";
import MainScreen from "../screens/shared/MainScreenComponent";
import SignUpWithEmail from "../screens/shared/SignUpWithEmail";
import BottomNavigator from "../screens/Helper/BottomNavigator";
import Login from "../screens/shared/Login";
import AdminBottomNavigator from "../screens/Admin/BottomNavigator";
import { PINK, GRAY, GREEN } from "../colors";

const screens = {
  // Splash: {
  //   screen: LoadingScreen,
  //   navigationOptions: {
  //     headerShown: false,
  //   },
  // },
  // Home: {
  //   screen: MainScreen,
  //   navigationOptions: {
  //     // headerLeft: () => null,
  //     // title: "Donate",
  //     // headerTitleAlign: "center",
  //     headerShown: false,
  //   },
  // },
  SignUpWithEmail: {
    screen: SignUpWithEmail,
    navigationOptions: {
      // headerLeft: () => null,
      title: "Email Registration",
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: "white",
      },
      headerTintColor: GREEN,
      headerTitleStyle: {},

      // headerShown: false,
    },
  },
  // User: {
  //   screen: BottomNavigator,
  //   navigationOptions: {
  //     headerShown: false,
  //   },
  // },
  // Admin: {
  //   screen: AdminBottomNavigator,
  //   navigationOptions: {
  //     headerShown: false,
  //   },
  // },
  // Login: {
  //   screen: Login,
  // },
};
const HomeNavigation = createStackNavigator();
const HomeNavigationStack = () => {
  return (
    <HomeNavigation.Navigator initialRouteName="Splash">
      <HomeNavigation.Screen
        name="Splash"
        options={{ headerShown: false }}
        component={LoadingScreen}
      ></HomeNavigation.Screen>
      <HomeNavigation.Screen
        name="Home"
        options={{ headerShown: false }}
        component={MainScreen}
      ></HomeNavigation.Screen>
      <HomeNavigation.Screen
        name="Admin"
        component={AdminBottomNavigator}
        options={{ headerShown: false }}
      ></HomeNavigation.Screen>
      <HomeNavigation.Screen
        name="User"
        component={BottomNavigator}
        options={{ headerShown: false }}
      ></HomeNavigation.Screen>
      <HomeNavigation.Screen
        name="Login"
        component={Login}
      ></HomeNavigation.Screen>
      <HomeNavigation.Screen
        name="SignUpWithEmail"
        component={SignUpWithEmail}
        options={{
          title: "Email Registration",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "white" },
          headerTintColor: { GREEN },
          headerTitleStyle: {},
        }}
      ></HomeNavigation.Screen>
    </HomeNavigation.Navigator>
  );
};

export default HomeNavigationStack;
