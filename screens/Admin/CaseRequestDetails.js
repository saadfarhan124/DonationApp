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
import CustomTextInput from "../shared/components/CustomTextInput";
import { GREEN } from "../../colors";
import Case from "../../DataModels/Case";
import Firebase from "../../Firebase";
import Notifications from "../../DataModels/Notifications";

const CaseRequestDetails = (props) => {
  const [loaderVisible, setLoaderVisible] = useState(false);

  useEffect(() => {}, []);

  const acceptRequest = async () => {
    setLoaderVisible(true);
    await Firebase.firestore()
      .collection("requests")
      .doc(props.route.params.key)
      .update({ status: "Accepted" });
    const newCase = new Case(
      props.route.params.data.requestName,
      props.route.params.data.requestDescription,
      props.route.params.data.requestAmountRequired,
      props.route.params.data.requestType,
      props.route.params.data.cnicNeedy,
      props.route.params.data.incomeNeedy,
      props.route.params.data.addressNeedy,
      props.route.params.uid,
      props.route.params.data.username
    );
    await Firebase.firestore()
      .collection("cases")
      .add({ ...newCase });
    setLoaderVisible(false);
    await Firebase.firestore()
      .collection("notification")
      .add(
        Object.assign(
          {},
          new Notifications(
            props.route.params.uid,
            "unseen",
            "Your request was Accepted"
          )
        )
      );
    ToastAndroid.show("Request Accepted", ToastAndroid.SHORT);
    props.navigation.pop();
  };

  const rejectRequest = async () => {
    setLoaderVisible(true);
    await Firebase.firestore()
      .collection("requests")
      .doc(props.route.params.key)
      .update({ status: "Rejected" });
    await Firebase.firestore()
      .collection("notification")
      .add(
        Object.assign(
          {},
          new Notifications(
            props.route.params.uid,
            "unseen",
            "Your request was Rejected"
          )
        )
      );
    setLoaderVisible(false);
    ToastAndroid.show("Request Denied", ToastAndroid.SHORT);
    props.navigation.pop();
  };

  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: "10%",
        flexGrow: 1,
        marginHorizontal: 20,
      }}
    >
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
        editable={false}
        value={props.route.params.data.requestName}
      />

      {/* Request Description */}
      <CustomTextInput
        label="Request Description"
        multiline={true}
        editable={false}
        value={props.route.params.data.requestDescription}
      />
      {/* Request Amount */}
      <CustomTextInput
        label="Amount Required"
        editable={false}
        value={props.route.params.data.requestAmountRequired}
      />

      <CustomTextInput
        label="Request Type"
        editable={false}
        value={props.route.params.data.requestType}
      />

      <View
        style={{
          flexDirection: "row",
        }}
      >
        <CustomTextInput
          style={{ flex: 1 }}
          label="CNIC of Needy"
          editable={false}
          value={props.route.params.data.cnicNeedy}
        />
        <CustomTextInput
          style={{ flex: 1 }}
          label="Needy's income"
          editable={false}
          value={props.route.params.data.incomeNeedy}
        />
      </View>
      <CustomTextInput
        label="Needy's Address"
        multiline={true}
        editable={false}
        value={props.route.params.data.addressNeedy}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Button
          color={GREEN}
          style={{ flex: 1, marginHorizontal: 10 }}
          mode="contained"
          onPress={acceptRequest}
        >
          Accept
        </Button>
        <Button
          color={GREEN}
          style={{ flex: 1, marginHorizontal: 10 }}
          mode="contained"
          onPress={rejectRequest}
        >
          Reject
        </Button>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loader: {
    elevation: 8,
    position: "absolute",
    bottom: "50%",
    left: 0,
    right: 0,
  },
});

export default CaseRequestDetails;
