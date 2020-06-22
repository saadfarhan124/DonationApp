import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, ToastAndroid } from "react-native";
import { Button, Text, ActivityIndicator, Title } from "react-native-paper";
import ZoomImage from "react-native-zoom-image";
import { Easing } from "react-native"; // import Easing if you want to customize easing function

import CustomTextInput from "../shared/components/CustomTextInput";
import { GREEN } from "../../colors";
import Firebase from "../../Firebase";
import Notifications from "../../DataModels/Notifications";

const DonationRequestDetails = (props) => {
  const [transactionData, setTransactionData] = useState();
  useEffect(() => {
    async function updateTransaction() {
      let transDoc = await Firebase.firestore()
        .collection("transaction")
        .doc(props.route.params.data.transactionData)
        .get();
      setTransactionData(transDoc.data());
      setLoaderVisible(false);
    }
    updateTransaction();

    //cleanuo
    return () => {
      setTransactionData();
      setLoaderVisible(true);
    };
  }, []);

  //loader
  const [loaderVisible, setLoaderVisible] = useState(true);

  const acceptRequest = async () => {
    setLoaderVisible(true);
    let transDoc = await Firebase.firestore()
      .collection("transaction")
      .doc(props.route.params.data.transactionData)
      .get();
    transDoc.ref.update({ status: "fulfilled" });
    props.route.params.data.caseData.fulfilledAmount +=
      parseInt(props.route.params.data.caseData.fulfilledAmount) +
      parseInt(transDoc.data().amount);
    await Firebase.firestore()
      .collection("cases")
      .doc(props.route.params.data.caseData.key)
      .set(props.route.params.data.caseData);
    await Firebase.firestore()
      .collection("requests")
      .doc(props.route.params.key)
      .update({ status: "Accepted" });
    let notification = new Notifications(
      props.route.params.uid,
      "unseen",
      `Your donation amount of ${
        transDoc.data().amount
      } was succesfully recieved for case ${
        props.route.params.data.caseData.name
      }`
    );
    await Firebase.firestore()
      .collection("notification")
      .add({ ...notification });
    props.navigation.pop();
    setLoaderVisible(false);

    // await Firebase.firestore()
    //     .collection("transaction")
    //     .doc(props.route.params.data.transactionData)
    //     .set({status : "fulfilled"})
    // await Firebase.firestore()
    // .collection("cases")
    // .doc
  };

  const rejectRequest = async () => {
    setLoaderVisible(true);
    let transDoc = await Firebase.firestore()
      .collection("transaction")
      .doc(props.route.params.data.transactionData)
      .get();
    transDoc.ref.update({ status: "rejected" });
    await Firebase.firestore()
      .collection("requests")
      .doc(props.route.params.key)
      .update({ status: "Rejected" });
    let notification = new Notifications(
      props.route.params.uid,
      "unseen",
      `Your donation amount of ${
        transDoc.data().amount
      } was rejected for case ${props.route.params.data.caseData.name}`
    );
    await Firebase.firestore()
      .collection("notification")
      .add({ ...notification });
    setLoaderVisible(false);
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
      <View style={styles.center}>
        <Title>Transaction Details</Title>
      </View>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <CustomTextInput
          style={{ flex: 1 }}
          label="Donated Amount"
          editable={false}
          value={transactionData ? transactionData.amount : "0"}
        />
        <CustomTextInput
          style={{ flex: 1 }}
          label="Status"
          editable={false}
          value={transactionData ? transactionData.status : ""}
        />
      </View>
      <View>
        {transactionData && transactionData.uri ? (
          <ZoomImage
            source={{ uri: transactionData.uri }}
            imgStyle={{ width: "100%", height: 150 }}
            style={{ width: "100%", height: 150 }}
            duration={200}
            enableScaling={false}
            easingFunc={Easing.ease}
          />
        ) : (
          <View style={styles.center}>
            <Text>No evidence sumbitted yet</Text>
          </View>
        )}
      </View>
      <View style={styles.center}>
        <Title>Case Details</Title>
      </View>
      {/* Request Name */}
      <CustomTextInput
        label="Request Title"
        editable={false}
        value={props.route.params.data.caseData.name}
      />

      {/* Request Description */}
      <CustomTextInput
        label="Request Description"
        multiline={true}
        editable={false}
        value={props.route.params.data.caseData.description}
      />
      {/* Request Amount */}
      <CustomTextInput
        label="Amount Required"
        editable={false}
        value={props.route.params.data.caseData.amountRequired}
      />

      <CustomTextInput
        label="Request Type"
        editable={false}
        value={props.route.params.data.caseData.requestType}
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
          value={props.route.params.data.caseData.needyCnic}
        />
        <CustomTextInput
          style={{ flex: 1 }}
          label="Needy's income"
          editable={false}
          value={props.route.params.data.caseData.needyIncome}
        />
      </View>
      <CustomTextInput
        label="Needy's Address"
        multiline={true}
        editable={false}
        value={props.route.params.data.caseData.needyAddress}
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
    justifyContent: "center",
    alignItems: "center",
  },
  loader: {
    elevation: 8,
    position: "absolute",
    top: "35%",
    left: 0,
    right: 0,
  },
});

export default DonationRequestDetails;
