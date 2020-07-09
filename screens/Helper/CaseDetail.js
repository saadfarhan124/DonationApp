import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
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
import CustomTextInput from "../shared/components/CustomTextInput";

const CaseDetail = (props) => {
  const [dialogState, setDialogState] = useState(false);
  const [loaderVisible, setLoaderVisible] = useState(false);
  const [utilizedAmount, setUtilizedAmount] = useState("");

  const updateUtilizedAmount = async () => {
    setLoaderVisible(true);
    console.log(global.userFirebase.data().utilizedAmount);
    // const doc = await Firebase.firestore()
    //   .collection("cases")
    //   .doc(props.route.params.key)
    //   .get();
    // const caseUtilizedAmount =
    //   parseInt(doc.data().utilizedAmount) + parseInt(utilizedAmount);
    // console.log(caseUtilizedAmount);
    // if (caseUtilizedAmount > doc.data().fulfilledAmount) {
    //   console.log("Not enough amount");
    // } else {
    //   await doc.ref.update({ utilizedAmount: caseUtilizedAmount });
    //   const userUtilizedAmount = global.userFirebase.data().amountUtilized;
    //   // const newUserUtilizedAmount =
    //   //   parseInt(userUtilizedAmount) + parseInt(utilizedAmount);
    //   // global.userFirebase.ref.update({ amountUtilized: newUserUtilizedAmount });
    //   props.navigation.pop();
    // }

    // if (caseNewAmount > parseInt(props.route.params.fullfilledAmount)) {
    //   console.log("saad");
    // } else {
    //   await doc.ref.update({ utilizedAmount: caseNewAmount });
    //   const userUtilizedAmount = global.userFirebase.data().utilizedAmount;
    //   const newUserUtilizedAmount =
    //     parseInt(userUtilizedAmount) + parseInt(utilizedAmount);
    //   global.userFirebase.ref.update({ amountUtilized: newUserUtilizedAmount });
    //   props.navigation.pop();
    // }

    setLoaderVisible(false);
  };
  return (
    <View>
      <View style={styles.loader}>
        <ActivityIndicator
          animating={loaderVisible}
          size="large"
          color={GREEN}
        />
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: "10%",
          flexGrow: 1,
          marginHorizontal: 20,
        }}
      >
        {/* Request Name */}
        <CustomTextInput
          label="Request Title"
          editable={false}
          value={props.route.params.name}
        />

        {/* Request Description */}
        <CustomTextInput
          label="Request Description"
          multiline={true}
          editable={false}
          value={props.route.params.description}
        />
        {/* Request Amount */}
        <CustomTextInput
          label="Amount Required"
          editable={false}
          value={props.route.params.amountRequired}
        />

        <CustomTextInput
          label="Request Type"
          editable={false}
          value={props.route.params.requestType}
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
            value={props.route.params.needyCnic}
          />
          <CustomTextInput
            style={{ flex: 1 }}
            label="Needy's income"
            editable={false}
            value={props.route.params.needyIncome}
          />
        </View>
        <CustomTextInput
          label="Needy's Address"
          multiline={true}
          editable={false}
          value={props.route.params.needyAddress}
        />
        <CustomTextInput
          label="Commited Amount"
          value={`${props.route.params.commitedAmount}`}
          editable={false}
        />
        <CustomTextInput
          label="Fullfilled Amount"
          value={`${props.route.params.fulfilledAmount}`}
          editable={false}
        />

        <CustomTextInput
          label="Utilized Amount"
          value={`${props.route.params.utilizedAmount}`}
          editable={false}
        />
        <CustomTextInput
          label="Update utilized amount"
          value={utilizedAmount}
          keyboardType="number-pad"
          onChangeText={(text) => setUtilizedAmount(text)}
        />
        <Button
          color={GREEN}
          mode="outlined"
          // compact={true}
          onPress={updateUtilizedAmount}
          style={{ flex: 1 }}
        >
          Update
        </Button>
      </ScrollView>
    </View>
    // <View style={styles.container}>
    //   <View style={styles.loader}>
    //     <ActivityIndicator
    //       animating={loaderVisible}
    //       size="large"
    //       color={GREEN}
    //     />
    //   </View>
    //   <View style={styles.card}>
    //     <View style={styles.cardContent}>
    //       <Title>{props.route.params.name}</Title>
    //       <Paragraph>{props.route.params.description}</Paragraph>
    //       <Divider />
    //       <View style={styles.cardDetails}>
    //         <View>
    //           <Text style={[styles.boldFont, { paddingTop: 10 }]}>
    //             Required Amount
    //           </Text>
    //           <Text style={[styles.boldFont, { paddingTop: 10 }]}>
    //             Fullfilled Amount
    //           </Text>
    //           <Text style={[styles.boldFont, { paddingTop: 10 }]}>
    //             Remaining Amount
    //           </Text>
    //           <Text style={[styles.boldFont, { paddingTop: 10 }]}>
    //             Utilized Amount
    //           </Text>
    //         </View>
    //         <View>
    //           <Text style={{ paddingTop: 10, textAlign: "right" }}>
    //             {props.route.params.requiredAmount}
    //           </Text>
    //           <Text style={{ paddingTop: 10, textAlign: "right" }}>
    //             {props.route.params.fullfilledAmount}
    //           </Text>
    //           <Text style={{ paddingTop: 10, textAlign: "right" }}>
    //             {props.route.params.requiredAmount -
    //               props.route.params.fullfilledAmount}
    //           </Text>
    //           <Text style={{ paddingTop: 10, textAlign: "right" }}>
    //             {props.route.params.utilizedAmount}
    //           </Text>
    //         </View>
    //       </View>
    //       <View style={{ flexDirection: "row" }}>
    //         <Text style={{ flex: 4, alignSelf: "center" }}>
    //           Enter amount utilized
    //         </Text>
    //         <TextInput
    //           keyboardType="number-pad"
    //           mode="outlined"
    //           value={utilizedAmount}
    //           onChangeText={(text) => setUtilizedAmount(text)}
    //           dense={true}
    //           style={{ flex: 2 }}
    //           theme={{
    //             colors: {
    //               placeholder: GRAY,
    //               text: "black",
    //               primary: GREEN,
    //               background: "#ffffff",
    //             },
    //           }}
    //         />
    //       </View>
    //       <View>
    //         <Button
    //           color={GREEN}
    //           onPress={() => {
    //             setDialogState(true);
    //           }}
    //         >
    //           <Text>Update</Text>
    //         </Button>
    //       </View>
    //     </View>
    //   </View>
    //   {/* DIALOG */}
    //   <Portal>
    //     <Dialog visible={dialogState} onDismiss={() => setDialogState(false)}>
    //       <Dialog.Title>Donation App</Dialog.Title>
    //       <Dialog.Content>
    //         <Paragraph>
    //           Do you want to update the utlized amount of this case?
    //         </Paragraph>
    //       </Dialog.Content>
    //       <Dialog.Actions>
    //         <Button
    //           color={GREEN}
    //           onPress={() => {
    //             setDialogState(false);
    //             updateUtilizedAmount();
    //           }}
    //         >
    //           Yes
    //         </Button>
    //         <Button color={GREEN} onPress={() => setDialogState(false)}>
    //           No
    //         </Button>
    //       </Dialog.Actions>
    //     </Dialog>
    //   </Portal>
    // </View>
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
