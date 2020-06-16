import React, { useEffect, useState, useRef } from "react";
import { CommonActions } from "@react-navigation/native";
import Firebase from "../../Firebase";
import User from "../../DataModels/User";

import { View, StyleSheet, Text, StatusBar, Easing } from "react-native";
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
      if (user == null) {
        const resetActions = CommonActions.reset({
          index: 1,
          routes: [{ name: "Home" }],
        });
        props.navigation.dispatch(resetActions);
      } else {
        global.user = user;
        const userDataModel = new User(
          user.displayName,
          user.email,
          user.photoURL
        );
        const docRef = Firebase.firestore().collection("users").doc(user.uid);
        const document = await docRef.get();
        if (!document.exists) {
          await docRef.set(Object.assign({}, userDataModel));
          global.userFirebase = await Firebase.firestore()
            .collection("users")
            .doc(user.uid)
            .get();
        } else {
          global.userFirebase = await Firebase.firestore()
            .collection("users")
            .doc(user.uid)
            .get();
        }
        var action;
        if (global.userFirebase.data().isAdmin) {
          action = CommonActions.reset({
            index: 1,
            routes: [{ name: "Admin" }],
          });
        } else {
          action = CommonActions.reset({
            index: 1,
            routes: [{ name: "User" }],
          });
        }
        props.navigation.dispatch(action);
      }
      // var resetActions;
      // if (user == null) {
      //   resetActions = CommonActions.reset({
      //     index: 1,
      //     routes: [{ name: "Home" }],
      //   });
      // } else {
      //   const userDataModel = new User(
      //     user.displayName,
      //     user.email,
      //     user.photoURL
      //   );
      //   global.user = user;
      //   const docRef = Firebase.firestore().collection("users").doc(user.uid);
      //   const document = await docRef.get();
      //   if (!document.exists) {
      //     await docRef.set(Object.assign({}, userDataModel));
      //     global.userFirebase = document;
      //   } else {
      //     global.userFirebase = await Firebase.firestore()
      //       .collection("users")
      //       .doc(user.uid)
      //       .get();
      //   }
      //   //realtime updates
      //   Firebase.firestore()
      //     .collection("users")
      //     .doc(user.uid)
      //     .onSnapshot((doc) => {
      //       global.userFirebase = doc;
      //     });
      //   try {
      //     if (global.userFirebase.data().isAdmin) {
      //       resetActions = CommonActions.reset({
      //         index: 1,
      //         routes: [{ name: "Admin" }],
      //       });
      //     } else {
      //       resetActions = CommonActions.reset({
      //         index: 1,
      //         routes: [{ name: "User" }],
      //       });
      //     }
      //     props.navigation.dispatch(resetActions);
      //   } catch (error) {
      //     console.log(global.userFirebase.data());
      //     console.log(error.message);
      //   }
      // }
      // setTimeout(() => {}, 1000);
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
