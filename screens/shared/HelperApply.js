import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Button, Text, ActivityIndicator } from "react-native-paper";
import CustomTextInput from "./components/CustomTextInput";

const HelperApply = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.fieldsContainer}>
        <CustomTextInput label="Name" />
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <CustomTextInput style={{ flex: 1 }} label="Country" />
          <CustomTextInput style={{ flex: 1 }} label="City" />
        </View>
        <CustomTextInput label="Address" multiline={true} />
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <CustomTextInput
            style={{ flex: 1 }}
            label="CNIC"
            keyboardType="number-pad"
          />
          <CustomTextInput
            style={{ flex: 1 }}
            label="Mobile"
            keyboardType="number-pad"
          />
        </View>
        <CustomTextInput label="CNIC" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  fieldsContainer: {
    flex: 1,
  },
});

export default HelperApply;
