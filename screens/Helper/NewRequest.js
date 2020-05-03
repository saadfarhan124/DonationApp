import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import {
  Button,
  Text,
  ActivityIndicator,
  Dialog,
  Portal,
  Paragraph,
} from "react-native-paper";
import Firebase from "../../Firebase";
import Case from "../../DataModels/Case";

import CustomTextInput from "../shared/components/CustomTextInput";
import { GREEN } from "../../colors";

const NewRequest = (props) => {
  const [requestName, setRequestName] = useState("");
  const [requestDescription, setRequestDescription] = useState("");
  const [requestAmountRequired, setRequestAmountRequired] = useState("");

  const [dialogState, setDialogState] = useState(false);

  const addCase = async () => {
    if (
      requestName.length === 0 ||
      requestDescription.length === 0 ||
      requestAmountRequired.length === 0
    ) {
      console.log("Please enter all the required fields");
    } else {
      setLoaderVisible(true);
      const newCase = new Case(
        requestName,
        requestDescription,
        requestAmountRequired,
        global.user.uid
      );
      const db = Firebase.firestore();
      const results = await db.collection("cases").add({ ...newCase });
      setDialogState(true);
    }
  };

  // Loader
  const [loaderVisible, setLoaderVisible] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.loader}>
        <ActivityIndicator
          animating={loaderVisible}
          size="large"
          color={GREEN}
        />
      </View>

      {/* Request Name */}
      <CustomTextInput
        label="Request Name"
        value={requestName}
        onChangeText={(text) => {
          setRequestName(text);
        }}
      />

      {/* Request Description */}
      <CustomTextInput
        label="Request Description"
        multiline={true}
        value={requestDescription}
        onChangeText={(text) => {
          setRequestDescription(text);
        }}
      />

      {/* Request Amount */}
      <CustomTextInput
        label="Amount Required"
        value={requestAmountRequired}
        keyboardType="number-pad"
        onChangeText={(text) => {
          setRequestAmountRequired(text);
        }}
      />

      {/* Button */}
      <View style={styles.btnRegisterContainer}>
        <Button
          onPress={addCase}
          color={GREEN}
          mode="contained"
          style={styles.btnRegisterText}
        >
          <Text style={styles.btnRegisterText}>Add Request</Text>
        </Button>
      </View>
      {/* DIALOG */}
      <Portal>
        <Dialog visible={dialogState} onDismiss={() => setDialogState(false)}>
          <Dialog.Title>Donation App</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Case Inserted Successfully</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              color={GREEN}
              onPress={() => {
                setDialogState(false);
                props.navigation.pop();
              }}
            >
              Ok
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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

export default NewRequest;
