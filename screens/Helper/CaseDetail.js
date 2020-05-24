import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
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
import { GRAY, GREEN } from "../../colors";
import Firebase from "../../Firebase";

const CaseDetail = (props) => {
  const [dialogState, setDialogState] = useState(false);
  const [loaderVisible, setLoaderVisible] = useState(false);
  const [utilizedAmount, setUtilizedAmount] = useState("");

  const updateUtilizedAmount = async () => {
    setLoaderVisible(true);
    const doc = await Firebase.firestore()
      .collection("cases")
      .doc(props.route.params.key)
      .get();
    const caseNewAmount =
      parseInt(doc.data().utilizedAmount) + parseInt(utilizedAmount);
    console.log(global.userFirebase.data());

    if (caseNewAmount > parseInt(props.route.params.fullfilledAmount)) {
      console.log("saad");
    } else {
      await doc.ref.update({ utilizedAmount: caseNewAmount });
      const userUtilizedAmount = global.userFirebase.data().utilizedAmount;
      const newUserUtilizedAmount =
        parseInt(userUtilizedAmount) + parseInt(utilizedAmount);
      // global.userFirebase.ref.update({ amountUtilized: newUserUtilizedAmount });
      props.navigation.pop();
    }

    setLoaderVisible(false);
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
              <Text style={[styles.boldFont, { paddingTop: 10 }]}>
                Utilized Amount
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
              <Text style={{ paddingTop: 10, textAlign: "right" }}>
                {props.route.params.utilizedAmount}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ flex: 4, alignSelf: "center" }}>
              Enter amount utilized
            </Text>
            <TextInput
              keyboardType="number-pad"
              mode="outlined"
              value={utilizedAmount}
              onChangeText={(text) => setUtilizedAmount(text)}
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
            />
          </View>
          <View>
            <Button
              color={GREEN}
              onPress={() => {
                setDialogState(true);
              }}
            >
              <Text>Update</Text>
            </Button>
          </View>
        </View>
      </View>
      {/* DIALOG */}
      <Portal>
        <Dialog visible={dialogState} onDismiss={() => setDialogState(false)}>
          <Dialog.Title>Donation App</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              Do you want to update the utlized amount of this case?
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              color={GREEN}
              onPress={() => {
                setDialogState(false);
                updateUtilizedAmount();
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
export default CaseDetail;
