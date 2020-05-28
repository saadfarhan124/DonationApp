import React, { useEffect, useState, useRef } from "react";
import { CommonActions } from "@react-navigation/native";
import Firebase from "../../Firebase";

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
    Firebase.auth().onAuthStateChanged(async (user) => {
      var resetActions;
      if (user == null) {
        resetActions = CommonActions.reset({
          index: 1,
          routes: [{ name: "Home" }],
        });
      } else {
        global.user = user;

        global.userFirebase = await Firebase.firestore()
          .collection("users")
          .doc(user.uid)
          .get();

        //realtime updates
        Firebase.firestore()
          .collection("users")
          .doc(user.uid)
          .onSnapshot((doc) => {
            global.userFirebase = doc;
            console.log(doc.data());
          });

        if (global.userFirebase.data().isAdmin) {
          resetActions = CommonActions.reset({
            index: 1,
            routes: [{ name: "Admin" }],
          });
        } else {
          resetActions = CommonActions.reset({
            index: 1,
            routes: [{ name: "User" }],
          });
        }
      }

      setTimeout(() => {
        props.navigation.dispatch(resetActions);
      }, 1000);
    });
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
