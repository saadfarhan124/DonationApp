import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { GREEN } from "../../colors";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Dashboard from "./Dashboard";
import Users from "./User";
import Cases from "./Cases";

const AdminBottomNavigator = (props) => {
  const Tab = createMaterialBottomTabNavigator();

  const UserStack = createStackNavigator();
  const UsersStackScreen = () => {
    return (
      <UserStack.Navigator>
        <UserStack.Screen
          name="Users"
          component={Users}
          options={{ headerTitleAlign: "center" }}
        />
      </UserStack.Navigator>
    );
  };

  const CaseStack = createStackNavigator();
  const CaseStackScreen = () => {
    return (
      <CaseStack.Navigator>
        <CaseStack.Screen
          name="Cases"
          component={Cases}
          options={{ headerTitleAlign: "center" }}
        />
      </CaseStack.Navigator>
    );
  };
  return (
    <Tab.Navigator
      barStyle={{ backgroundColor: GREEN }}
      activeColor="#f0edf6"
      shifting={true}
      inactiveColor="#3e2465"
    >
      <Tab.Screen
        name="Users"
        component={UsersStackScreen}
        options={{
          // tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Cases"
        component={CaseStackScreen}
        options={{
          // tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <View>
              <MaterialCommunityIcons name="account" color={color} size={26} />
              <View
                style={{
                  // On React Native < 0.57 overflow outside of parent will not work on Android, see https://git.io/fhLJ8
                  position: "absolute",
                  right: -6,
                  top: -3,
                  backgroundColor: "red",
                  borderRadius: 6,
                  width: 12,
                  height: 12,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 10, fontWeight: "bold" }}
                >
                  {12}
                </Text>
              </View>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AdminBottomNavigator;
