import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button, ActivityIndicator } from "react-native-paper";
import * as Facebook from "expo-facebook";
import Firebase from "../../Firebase";
import firebase from "firebase";
import * as Google from "expo-google-app-auth";
import User from "../../DataModels/User";
import { CommonActions } from "@react-navigation/native";
import { GREEN } from "../../colors";

const MainScreen = (props) => {
  useEffect(() => {}, []);
  const [loaderVisible, setLoaderVisible] = useState(false);

  const addUserToDB = async (user) => {
    // try {
    //   const db = Firebase.firestore();
    //   if (!document.exists) {
    //     await docRef.set(Object.assign({}, userDataModel));
    //     console.log(document.data());
    //     console.log("success");
    //   } else {
    //     console.log("already exists");
    //   }
    //   setLoaderVisible(false);
    // } catch (error) {
    //   console.log(error);
    //   setLoaderVisible(false);
    // }
  };

  //Facebook sign in method
  const loginWithFacebook = async () => {
    setLoaderVisible(true);
    await Facebook.initializeAsync("156585939119660");
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"],
      });
      if (type === "success") {
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        const { user } = await Firebase.auth().signInWithCredential(credential);
        addUserToDB(user);
      }
    } catch (error) {
      setLoaderVisible(false);
      if (error.code === "auth/account-exists-with-different-credential") {
        const provider = await Firebase.auth().fetchSignInMethodsForEmail(
          error.email
        );
        console.log(
          `An account already exists with this email using a different provider that is ${provider[0]}`
        );
      }
    }
  };

  //Google Sign In Method
  const loginWithGoogle = async () => {
    setLoaderVisible(true);
    try {
      const { type, accessToken, idToken, user } = await Google.logInAsync({
        androidClientId:
          "1034258162280-ln5s8s9925bpunte30cpm80rmkpdk11q.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });

      if (type === "success") {
        const credential = firebase.auth.GoogleAuthProvider.credential(idToken);
        const { user } = await Firebase.auth().signInWithCredential(credential);
        addUserToDB(user);
      }
    } catch (error) {
      console.log(error);
      setLoaderVisible(false);
    }
  };

  return (
    //Main Container
    <View style={styles.container}>
      <View style={styles.loader}>
        <ActivityIndicator
          animating={loaderVisible}
          size="large"
          color={GREEN}
        />
      </View>
      {/* View with each social button inside */}
      <View style={styles.socialButtons}>
        <Button
          icon="facebook"
          mode="contained"
          onPress={loginWithFacebook}
          color="#3b5998"
        >
          Sign up with Facebook
        </Button>
      </View>

      <View style={styles.socialButtons}>
        <Button
          icon="google"
          mode="contained"
          onPress={loginWithGoogle}
          color="#dd4b39"
        >
          Sign up with Google
        </Button>
      </View>

      <View style={styles.socialButtons}>
        <Button
          icon="email"
          mode="contained"
          onPress={() => props.navigation.navigate("SignUpWithEmail")}
          color="#D3D3D3"
        >
          Sign up with Email
        </Button>
      </View>

      {/* View for bottom information */}
      <View style={styles.bottomLoginText}>
        <Text>Already have an account?</Text>
        <Button
          color="#dd4b39"
          mode="text"
          onPress={() => props.navigation.navigate("Login")}
        >
          Login
        </Button>
      </View>
      <View
        style={{
          width: 80,
          position: "absolute",
          bottom: 70,
        }}
      ></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  socialButtons: {
    width: "70%",
    marginTop: 10,
  },
  bottomLoginText: {
    position: "absolute",
    alignContent: "center",
    justifyContent: "center",
    flex: 1,
    bottom: 20,
  },
  loginButton: {
    color: "blue",
  },
  loader: {
    elevation: 8,
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
  },
});

export default MainScreen;
