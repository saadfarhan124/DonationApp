import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import {
  Button,
  Text,
  ActivityIndicator,
  Dialog,
  Portal,
  Paragraph,
  Menu,
} from "react-native-paper";
import Firebase from "../../Firebase";
import Request from "../../DataModels/Request";
import CustomTextInput from "../shared/components/CustomTextInput";
import { GREEN } from "../../colors";

const NewRequest = (props) => {
  const [requestName, setRequestName] = useState("");
  const [requestDescription, setRequestDescription] = useState("");
  const [requestAmountRequired, setRequestAmountRequired] = useState("");
  const [requestType, setRequestType] = useState("");

  const [cnicNeedy, setCnicNeedy] = useState("");
  const [incomeNeedy, setIncomeNeedy] = useState("");
  const [addressNeedy, setAddressNeedy] = useState("");

  const [dialogState, setDialogState] = useState(false);
  const [dialogMessage, setDialogMesssage] = useState("");
  const [menuState, setMenuState] = useState(true);

  // Loader
  const [loaderVisible, setLoaderVisible] = useState(false);

  useEffect(() => {
    return () => {
      setRequestName("");
      setRequestDescription("");
      setRequestAmountRequired("");
      setRequestType("");
      setCnicNeedy("");
      setIncomeNeedy("");
      setAddressNeedy("");
      setDialogState(false);
      setMenuState(false);
      setLoaderVisible(false);
    };
  }, []);

  const addRequest = async () => {
    if (
      requestName.length === 0 ||
      requestDescription.length === 0 ||
      requestAmountRequired.length === 0 ||
      requestType.length === 0 ||
      cnicNeedy.length === 0 ||
      incomeNeedy.length === 0 ||
      addressNeedy.length === 0
    ) {
      ToastAndroid.show(
        "Please enter all the required fields",
        ToastAndroid.SHORT
      );
    }
    // else if (cnicNeedy.length != 13) {
    //   ToastAndroid.show("Please enter a valid CNIC number", ToastAndroid.SHORT);
    // }
    else {
      setLoaderVisible(true);
      if (global.userFirebase.data().isTrustedHelper) {
        //code to insert a new request directly
      } else {
        const newRequest = new Request(
          "New Case Request",
          "Pending",
          {
            requestName,
            requestDescription,
            requestAmountRequired,
            requestType,
            cnicNeedy,
            incomeNeedy,
            addressNeedy,
            username: global.user.displayName,
          },
          global.user.uid
        );
        const results = await Firebase.firestore()
          .collection("requests")
          .add({ ...newRequest });
        setDialogMesssage("Case Requests Pending Approval");
      }

      setLoaderVisible(false);
      setDialogState(true);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.loader}>
        <ActivityIndicator
          animating={loaderVisible}
          size="large"
          color={GREEN}
        />
      </View>

      {/* Request Name */}
      <CustomTextInput
        label="Request Title"
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

      {/* Request Type */}
      <Menu
        visible={menuState}
        onDismiss={() => setMenuState(false)}
        anchor={
          <TouchableOpacity onPress={() => setMenuState(true)}>
            <CustomTextInput
              value={requestType}
              label="Request Type"
              editable={false}
            />
          </TouchableOpacity>
        }
        contentStyle={{ marginTop: 20, marginHorizontal: 10 }}
      >
        <Menu.Item
          titleStyle={{ fontSize: 15 }}
          onPress={() => {
            setRequestType("Food");
            setMenuState(false);
          }}
          title="Food"
        />
        <Menu.Item
          titleStyle={{ fontSize: 15 }}
          onPress={() => {
            setRequestType("Education");
            setMenuState(false);
          }}
          title="Education"
        />
        <Menu.Item
          titleStyle={{ fontSize: 15 }}
          onPress={() => {
            setRequestType("Environment");
            setMenuState(false);
          }}
          title="Environment"
        />
        <Menu.Item
          titleStyle={{ fontSize: 15 }}
          onPress={() => {
            {
              setRequestType("Misc");
              setMenuState(false);
            }
          }}
          title="Misc"
        />
      </Menu>

      <View
        style={{
          flexDirection: "row",
        }}
      >
        <CustomTextInput
          style={{ flex: 1 }}
          label="CNIC of Needy"
          keyboardType="number-pad"
          value={cnicNeedy}
          onChangeText={(text) => {
            setCnicNeedy(text);
          }}
        />
        <CustomTextInput
          style={{ flex: 1 }}
          label="Needy's income"
          keyboardType="number-pad"
          value={incomeNeedy}
          onChangeText={(text) => {
            setIncomeNeedy(text);
          }}
        />
      </View>

      <CustomTextInput
        label="Needy's Address"
        multiline={true}
        value={addressNeedy}
        onChangeText={(text) => {
          setAddressNeedy(text);
        }}
      />

      {/* Button */}
      <View style={styles.btnRegisterContainer}>
        <Button
          onPress={addRequest}
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
            <Paragraph>{dialogMessage}</Paragraph>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: "8%",
    paddingVertical: "5%",
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
    marginBottom: 5,
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
