import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  Modal,
} from "react-native";
import {
  Title,
  Divider,
  Paragraph,
  Button,
  TextInput,
  ActivityIndicator,
  Dialog,
  Portal,
  Menu,
} from "react-native-paper";
import Firebase from "../../Firebase";
import Donation from "../../DataModels/Donation";
import CalendarPicker from "react-native-calendar-picker";
import { GRAY, GREEN } from "../../colors";
import CustomTextInput from "../shared/components/CustomTextInput";
import Request from "../../DataModels/Request";
import Transaction from "../../DataModels/Transaction";
import Notifications from "../../DataModels/Notifications";

const CaseDonate = (props) => {
  //form fields
  const [donationAmount, setDonationAmount] = useState("");
  const [reminderDate, setReminderDate] = useState("");
  const [reminderMode, setReminderMode] = useState("");

  //Loader
  const [loaderVisible, setLoaderVisible] = useState(false);

  //Visible states
  const [dialogState, setDialogState] = useState(false);

  const [modalFlag, setModalFlag] = useState(false);

  const [menuState, setMenuState] = useState(false);

  const addDonation = async () => {
    setLoaderVisible(true);

    props.route.params.commitedAmount =
      parseInt(props.route.params.commitedAmount) + parseInt(donationAmount);
    await Firebase.firestore()
      .collection("cases")
      .doc(props.route.params.key)
      .set(props.route.params);

    let transaction = new Transaction(
      donationAmount,
      props.route.params.key,
      global.user.uid,
      { reminderDate, reminderMode }
    );
    await Firebase.firestore()
      .collection("transaction")
      .add({ ...transaction });
    let requestData = {
      transactionData: Object.assign({}, transaction),
      caseData: props.route.params,
    };
    let request = new Request(
      "Donation",
      "Pending",
      { ...requestData },
      global.user.uid
    );
    await Firebase.firestore()
      .collection("requests")
      .add({ ...request });

    let notification = new Notifications(
      global.user.uid,
      "Pending",
      `You made a commitment of ${donationAmount}
    to case ${props.route.params.name}`
    );
    await Firebase.firestore()
      .collection("notification")
      .add({ ...notification });
    setLoaderVisible(false);

    props.navigation.pop();

    // if (
    //   parseInt(props.route.params.fullfilledAmount) >
    //   parseInt(props.route.params.requiredAmount)
    // ) {
    // } else {
    //   await Firebase.firestore()
    //     .collection("cases")
    //     .doc(props.route.params.key)
    //     .set(props.route.params);
    //   const doc = await Firebase.firestore()
    //     .collection("users")
    //     .doc(global.user.uid)
    //     .get();
    //   const newAmount = (doc.data().amountDonated += parseInt(donationAmount));

    //   await Firebase.firestore()
    //     .collection("users")
    //     .doc(global.user.uid)
    //     .update({ amountDonated: newAmount });
    //   setLoaderVisible(false);
    //   const donation = new Donation(
    //     global.user.uid,
    //     props.route.params.key,
    //     donationAmount
    //   );

    //   await Firebase.firestore()
    //     .collection("donations")
    //     .add({ ...donation });
    //   props.navigation.pop();
    // }
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
      {/* Modal */}
      <View>
        <Modal visible={modalFlag} animationType="slide" transparent={true}>
          <View
            style={{
              backgroundColor: "rgba(255, 255, 255, 1)",
              position: "absolute",
              top: "30%",
              borderColor: GREEN,
              borderWidth: 2,
            }}
          >
            <TouchableOpacity onPress={() => setModalFlag(false)}>
              <Text style={styles.closeText}>X</Text>
            </TouchableOpacity>
            <CalendarPicker
              onDateChange={(date) => {
                setReminderDate(
                  date.toString().split(" ").slice(1, 4).join(" ")
                );
                setModalFlag(false);
              }}
              initialDate={new Date()}
              textStyle={{
                color: GREEN,
              }}
            />
          </View>
        </Modal>
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
                Commited Amount
              </Text>
              <Text style={[styles.boldFont, { paddingTop: 10 }]}>
                Fullfilled Amount
              </Text>
            </View>
            <View>
              <Text style={{ paddingTop: 10, textAlign: "right" }}>
                {props.route.params.amountRequired}
              </Text>
              <Text style={{ paddingTop: 10, textAlign: "right" }}>
                {props.route.params.commitedAmount}
              </Text>
              <Text style={{ paddingTop: 10, textAlign: "right" }}>
                {props.route.params.fulfilledAmount}
              </Text>
            </View>
          </View>
          <View style={{ width: "100%" }}>
            <CustomTextInput
              keyboardType="number-pad"
              label="Donation Amount"
              onChangeText={(text) => setDonationAmount(text)}
            />
          </View>
          <View style={{ width: "100%" }}>
            <TouchableOpacity onPress={() => setModalFlag(true)}>
              <CustomTextInput
                value={reminderDate}
                editable={false}
                label="Due Date"
              />
            </TouchableOpacity>
          </View>
          <View style={{ width: "100%" }}>
            <Menu
              visible={menuState}
              onDismiss={() => setMenuState(false)}
              anchor={
                <TouchableOpacity onPress={() => setMenuState(true)}>
                  <CustomTextInput
                    value={reminderMode}
                    label="Reminder Type"
                    editable={false}
                  />
                </TouchableOpacity>
              }
              contentStyle={{ marginTop: 20, marginHorizontal: 10 }}
            >
              <Menu.Item
                titleStyle={{ fontSize: 15 }}
                onPress={() => {
                  setMenuState(false);
                  setReminderMode("Hourly");
                }}
                title="Hourly"
              />
              <Menu.Item
                titleStyle={{ fontSize: 15 }}
                onPress={() => {
                  setMenuState(false);
                  setReminderMode("Daily");
                }}
                title="Daily"
              />
              <Menu.Item
                titleStyle={{ fontSize: 15 }}
                onPress={() => {
                  setMenuState(false);
                  setReminderMode("Weekly");
                }}
                title="Weekly"
              />
            </Menu>
          </View>

          <View>
            <Button
              color={GREEN}
              onPress={() => {
                if (
                  donationAmount.length == 0 ||
                  reminderMode.length == 0 ||
                  reminderDate.length === 0
                ) {
                  ToastAndroid.show(
                    "Please fill all the fields first",
                    ToastAndroid.SHORT
                  );
                } else {
                  setDialogState(true);
                }
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
  closeText: {
    marginHorizontal: 5,
    backgroundColor: GREEN,
    color: "white",
    borderRadius: 20,
    width: 32,
    padding: 6,
    alignSelf: "flex-end",
    textAlign: "center",
    borderWidth: 1,
    borderColor: "white",
  },
});
export default CaseDonate;
