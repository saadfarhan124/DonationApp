import React, { useState } from "react";
import { Text } from "react-native-paper";
import Profile from "./Profile";
import Dashboard from "./Dashboard";
import { NavigationContainer } from "@react-navigation/native";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

const BottomNavigator = () => {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Profile} />
        <Tab.Screen name="Settings" component={Dashboard} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomNavigator;
