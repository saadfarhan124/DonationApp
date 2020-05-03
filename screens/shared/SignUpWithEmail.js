import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text, ActivityIndicator, Checkbox } from "react-native-paper";
import { PINK, GREEN, GRAY } from "../../colors";
import CustomTextInput from "./components/CustomTextInput";
import Firebase from "../../Firebase";
import User from "../../DataModels/User";

const SignUpWithEmail = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassowrd] = useState("");

  //state for loader
  const [loaderVisible, setLoaderVisible] = useState(false);

  const resetFields = () => {
    setFullName("");
    setEmail("");
    setPassword("");
    setConfirmPassowrd("");
    setLoaderVisible(false);
  };

  const addUserToDB = async (user) => {
    try {
      const userDataModel = new User(user.displayName, user.email);
      const db = Firebase.firestore();
      const docRef = db.collection("users").doc(user.uid);
      await docRef.set(Object.assign({}, userDataModel));
      resetFields();
    } catch (error) {
      resetFields();
      console.log(error);
    }
  };

  const registerWithEmail = async () => {
    if (
      fullName.length === 0 ||
      email.length === 0 ||
      password.length === 0 ||
      confirmPassword.length === 0
    ) {
      console.log("Please fill in all the fields");
    } else if (password !== confirmPassword) {
      console.log("Passwords do not match");
    } else {
      setLoaderVisible(true);
      try {
        const { user } = await Firebase.auth().createUserWithEmailAndPassword(
          email,
          password
        );
        await user.updateProfile({ displayName: fullName });
        user.sendEmailVerification();
        addUserToDB(user);
        // console.log(result);
      } catch (error) {
        if (error.code === "auth/email-already-in-use") {
          resetFields();
          console.log("Email already exists");
        } else {
          resetFields();
          console.log(error);
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.loader}>
        <ActivityIndicator
          animating={loaderVisible}
          size="large"
          color={GREEN}
        />
      </View>

      {/* Fullname */}
      <CustomTextInput
        label="Full Name"
        value={fullName}
        onChangeText={(text) => {
          setFullName(text);
        }}
      />

      {/* Email */}
      <CustomTextInput
        label="Email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
        }}
        keyboardType="email-address"
      />

      {/* Password */}
      <CustomTextInput
        label="Password"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
        }}
        secureTextEntry={true}
      />

      {/* Confirm Password */}
      <CustomTextInput
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={(text) => {
          setConfirmPassowrd(text);
        }}
        keyboardType="email-address"
      />

      {/* Checkbox */}

      {/* Button */}
      <View style={styles.btnRegisterContainer}>
        <Button
          color={GREEN}
          mode="contained"
          onPress={registerWithEmail}
          style={styles.btnRegisterText}
        >
          <Text style={styles.btnRegisterText}>Register</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: "8%",
    paddingVertical: "20%",
    backgroundColor: "white",
    //alignContent: "stretch",
    flex: 1,
  },
  btnRegisterText: {
    color: "white",
  },
  btnRegisterContainer: {
    padding: "2%",
    height: 60,
  },
  loader: {
    zIndex: 1,
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
  },
});
export default SignUpWithEmail;
