import React, { useState, useEffect } from "react";
import HelperApply from "../shared/HelperApply";
import AllCases from "../Donors/AllCases";
import CaseDonate from "../Donors/CaseDonate";
import CommitedDetails from "../Donors/CommitedDetails";
import FullfilledCaseDetails from "../Donors/FullfilledCaseDetails";
import HelperProfileDetails from "../Donors/HelperProfileDetails";
import Notification from "../shared/Notifications";
import NewRequest from "./NewRequest";
import Profile from "./Profile";
import CaseDetail from "./CaseDetail";
import TotalCases from "./TotalCases";
import Settings from "./Settings";
import { GREEN } from "../../colors";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const BottomNavigator = (props) => {
  const Tab = createMaterialBottomTabNavigator();

  const HelperStack = createStackNavigator();
  const HelperStackScreen = () => {
    return (
      // headerMode={"none"}
      <HelperStack.Navigator>
        <HelperStack.Screen
          name="Profile"
          component={Profile}
        ></HelperStack.Screen>
        <HelperStack.Screen
          name="New Request"
          component={NewRequest}
        ></HelperStack.Screen>
        <HelperStack.Screen
          name="Total Cases"
          component={TotalCases}
        ></HelperStack.Screen>
        <HelperStack.Screen
          name="Case Detail"
          component={CaseDetail}
        ></HelperStack.Screen>
        <HelperStack.Screen
          name="Helper Application"
          component={HelperApply}
        ></HelperStack.Screen>
      </HelperStack.Navigator>
    );
  };

  const DonorStack = createStackNavigator();
  const DonorStackScreen = () => {
    return (
      <DonorStack.Navigator>
        <DonorStack.Screen name="All Cases" component={AllCases} />
        <DonorStack.Screen
          name="Donate Case"
          options={{ title: "Donate to a Case" }}
          component={CaseDonate}
        />
        <DonorStack.Screen
          name="Commitment Details"
          options={{ title: "Commitment Details" }}
          component={CommitedDetails}
        />
        <DonorStack.Screen
          name="Fullfiled Details"
          options={{ title: "Fullfiled Details" }}
          component={FullfilledCaseDetails}
        />
        <DonorStack.Screen
          name="Helper Details"
          options={{ title: "Helper Details" }}
          component={HelperProfileDetails}
        />
      </DonorStack.Navigator>
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
        name="Profile"
        component={HelperStackScreen}
        options={{
          // tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Cases"
        component={DonorStackScreen}
        options={{
          // tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          // tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bell" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
