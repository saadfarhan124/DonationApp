import React, { useEffect, useState, useRef } from "react";
import { StackActions, NavigationActions } from "react-navigation";

import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  Animated,
  Easing,
} from "react-native";
import { PINK, GREEN, GRAY } from "../../colors";

const LoadingScreen = (props) => {
  const instructions = Platform.select({
    ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
    android:
      "Double tap R on your keyboard to reload,\n" +
      "Shake or press menu button for dev menu",
  });

  //Component did mount
  useEffect(() => {
    setTimeout(() => {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "Home" })],
      });
      props.navigation.dispatch(resetAction);
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Splash Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: GREEN,
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    color: "#F5FCFF",
  },
  instructions: {
    textAlign: "center",
    color: "#F5FCFF",
    marginBottom: 5,
  },
  image: {
    resizeMode: "contain",
  },
});

export default LoadingScreen;
