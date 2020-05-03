import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import {
  Title,
  Divider,
  Paragraph,
  Button,
  TextInput,
  ActivityIndicator,
  Dialog,
  Portal,
} from "react-native-paper";
import Firebase from "../../Firebase";
import Donation from "../../DataModels/Donation";

import { GRAY, GREEN } from "../../colors";

const CaseDonate = (props) => {
  const [donationAmount, setDonationAmount] = useState("");

  const [buttonState, setButtonState] = useState(true);

  const [loaderVisible, setLoaderVisible] = useState(false);

  const [dialogState, setDialogState] = useState(false);

  const donationOnChange = (donationText) => {
    setDonationAmount(donationText);
    if (
      parseInt(donationText) === 0 ||
      parseInt(donationText) > props.route.params.requiredAmount ||
      donationText.length === 0
    ) {
      setButtonState(true);
    } else {
      setButtonState(false);
    }
  };

  const addDonation = async () => {
    setLoaderVisible(true);
    props.route.params.fullfilledAmount =
      parseInt(props.route.params.fullfilledAmount) + parseInt(donationAmount);
    if (
      parseInt(props.route.params.fullfilledAmount) >
      parseInt(props.route.params.requiredAmount)
    ) {
    } else {
      await Firebase.firestore()
        .collection("cases")
        .doc(props.route.params.key)
        .set(props.route.params);
      const doc = await Firebase.firestore()
        .collection("users")
        .doc(global.user.uid)
        .get();
      const newAmount = (doc.data().amountDonated += parseInt(donationAmount));

      await Firebase.firestore()
        .collection("users")
        .doc(global.user.uid)
        .update({ amountDonated: newAmount });
      setLoaderVisible(false);
      const donation = new Donation(
        global.user.uid,
        props.route.params.key,
        donationAmount
      );

      await Firebase.firestore()
        .collection("donations")
        .add({ ...donation });
      props.navigation.pop();
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
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Title>{props.route.params.name}</Title>
          <Paragraph>{props.route.params.description}</Paragraph>
          <Divider />
          <View style={styles.cardDetails}>
            <View>
              <Text style={[styles.boldFont, { paddingTop: 10 }]}>
                Required Amount
              </Text>
              <Text style={[styles.boldFont, { paddingTop: 10 }]}>
                Fullfilled Amount
              </Text>
              <Text style={[styles.boldFont, { paddingTop: 10 }]}>
                Remaining Amount
              </Text>
            </View>
            <View>
              <Text style={{ paddingTop: 10, textAlign: "right" }}>
                {props.route.params.requiredAmount}
              </Text>
              <Text style={{ paddingTop: 10, textAlign: "right" }}>
                {props.route.params.fullfilledAmount}
              </Text>
              <Text style={{ paddingTop: 10, textAlign: "right" }}>
                {props.route.params.requiredAmount -
                  props.route.params.fullfilledAmount}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ flex: 4, alignSelf: "center" }}>
              Enter amount to Donate
            </Text>
            <TextInput
              value={donationAmount}
              keyboardType="number-pad"
              mode="outlined"
              dense={true}
              style={{ flex: 2 }}
              theme={{
                colors: {
                  placeholder: GRAY,
                  text: "black",
                  primary: GREEN,
                  background: "#ffffff",
                },
              }}
              onChangeText={donationOnChange}
            />
          </View>
          <View>
            <Button
              color={GREEN}
              disabled={buttonState}
              onPress={() => {
                setDialogState(true);
              }}
            >
              <Text>Donate</Text>
            </Button>
          </View>
        </View>
      </View>
      {/* DIALOG */}
      <Portal>
        <Dialog visible={dialogState} onDismiss={() => setDialogState(false)}>
          <Dialog.Title>Donation App</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Do you want to make a donation to this case?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              color={GREEN}
              onPress={() => {
                setDialogState(false);
                addDonation();
              }}
            >
              Yes
            </Button>
            <Button color={GREEN} onPress={() => setDialogState(false)}>
              No
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  container: {
    margin: 20,
  },
  card: {
    backgroundColor: "white",
    elevation: 3,
  },
  cardContent: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  cardDetails: {
    flexDirection: "row",
    //   alignContent: "space-between",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  boldFont: {
    fontWeight: "bold",
  },
  loader: {
    elevation: 8,
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
  },
});
export default CaseDonate;
