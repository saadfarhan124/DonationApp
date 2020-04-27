import React, { useEffect } from "react";
import { StyleSheet, Text, View, Platform, StatusBar } from "react-native";
import { Provider as PaperProvider, Appbar } from "react-native-paper";
import HomeNavigation from "./Navigators/HomeNavigation";
import Firebase from "./Firebase";
import "firebase/firestore";
import { PINK, GREEN, GRAY } from "./colors";

import { YellowBox } from "react-native";
import _ from "lodash";

export default function App() {
  YellowBox.ignoreWarnings(["Setting a timer"]);
  const _console = _.clone(console);
  console.warn = (message) => {
    if (message.indexOf("Setting a timer") <= -1) {
      _console.warn(message);
    }
  };

  useEffect(() => {}, []);
  return (
    <PaperProvider>
      <StatusBar barStyle="light-content" backgroundColor={GREEN} />
      <HomeNavigation />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  bottom: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 40,
  },
});
