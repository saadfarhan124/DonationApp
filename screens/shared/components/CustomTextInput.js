import React from "react";
import { TextInput, IconButton } from "react-native-paper";
import { PINK, GREEN, GRAY } from "../../../colors";
import { View, StyleSheet } from "react-native";

const CustomTextInput = (props) => {
  return (
    <View style={{ padding: "2%" }}>
      <TextInput
        height={120}
        mode="outlined"
        theme={{
          colors: {
            placeholder: GRAY,
            text: "black",
            primary: GREEN,
            background: "#ffffff",
          },
        }}
        label={props.label}
        value={props.value}
        onChangeText={(text) => {
          props.onChangeText(text);
        }}
        // keyboardType='visible-password'
        keyboardType={
          props.keyboardType === "number-pad"
            ? props.keyboardType
            : props.keyboardType === "email-address"
            ? props.keyboardType
            : "default"
        }
        underlineColor={GRAY}
        secureTextEntry={props.secureTextEntry ? props.secureTextEntry : false}
        style={styles.textInput}
        dense={true}
        multiline={props.multiline ? props.multiline : false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    fontSize: 13,
  },
});

export default CustomTextInput;
