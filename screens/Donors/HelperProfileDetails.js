import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Firebase from "../../Firebase";
import {
  Avatar,
  Title,
  Paragraph,
  Button,
  FAB,
  Dialog,
  ActivityIndicator,
  Portal,
  Divider,
} from "react-native-paper";
import { GREEN } from "../../colors";
import Dashboard from "../shared/components/Dashboard";

const HelperProfileDetails = (props) => {
  const [loaderVisible, setLoaderVisible] = useState(false);
  const [helper, setHelper] = useState(null);
  const [helperId, setHelperId] = useState("");
  //helperFields
  const [totalCases, setTotalCases] = useState(0);
  const [totalFundsCollected, setTotalFundsCollected] = useState(0);
  const [totalAmountCommitedCases, setTotalAmountCommitedCases] = useState(0);
  const [totalAmountFullfilledCases, setTotalAmountFullfilledCases] = useState(
    0
  );
  const getUserDetails = async () => {};
  useEffect(() => {
    async function getHelperDetails() {
      setLoaderVisible(true);
      const helperObj = await Firebase.firestore()
        .collection("users")
        .doc(props.route.params)
        .get();
      setHelper(helperObj.data());
      setHelperId(helperObj.id);
      let totalCasesVar = 0;
      let casesId = [];
      let totalFunds = 0;
      let totalAmountCommitedCasesVar = 0;
      let totalAmountFullfilledCasesVar = 0;
      const casesDoc = await Firebase.firestore()
        .collection("cases")
        .where("userId", "==", helperObj.id)
        .get();

      casesDoc.forEach((item) => {
        casesId.push(item.id);
      });
      await Promise.all(
        casesId.map(async (item) => {
          let caseById = await Firebase.firestore()
            .collection("transaction")
            .where("caseId", "==", item)
            .get();
          caseById.forEach((item) => {
            if (item.data().status == "fulfilled") {
              totalAmountFullfilledCasesVar += parseInt(item.data().amount);
              totalFunds += parseInt(item.data().amount);
            } else if (item.data().status == "commited") {
              totalAmountCommitedCasesVar += parseInt(item.data().amount);
              totalFunds += parseInt(item.data().amount);
            }
          });
        })
      );
      setTotalCases(casesDoc.size);
      setTotalAmountCommitedCases(totalAmountCommitedCasesVar);
      setTotalAmountFullfilledCases(totalAmountFullfilledCasesVar);
      setTotalFundsCollected(totalFunds);
      setLoaderVisible(false);
    }
    getHelperDetails();
    return () => {
      setTotalCases(0);
      setTotalFundsCollected(0);
      setTotalAmountCommitedCases(0);
      setTotalAmountFullfilledCases(0);
      setLoaderVisible(false);
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.loader}>
        <ActivityIndicator
          animating={loaderVisible}
          size="large"
          color={GREEN}
        />
      </View>
      <View style={styles.flexDirectionRow}>
        <Avatar.Image
          size={84}
          source={{
            uri: helper
              ? helper.photoUri
              : "https://buzzwonder.com/wp-content/uploads/2020/04/2020-02-21.jpg",
          }}
        />
        <View style={styles.profileDetails}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
              marginLeft: "20%",
            }}
          >
            <Title>{helper ? helper.name : ""}</Title>
            <Paragraph>{helper ? helper.email : ""}</Paragraph>
            <Button
              mode="Outlined"
              color={GREEN}
              onPress={() => {
                console.log("");
              }}
            >
              Logout
            </Button>
          </View>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: "10%",
          flexGrow: 1,
        }}
      >
        <Dashboard
          title="Cases"
          navigation={props.navigation}
          type="case"
          totalCases={totalCases}
          totalFundsCollected={totalFundsCollected}
          totalAmountCommitedCases={totalAmountCommitedCases}
          totalAmountFullfilledCases={totalAmountFullfilledCases}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    flex: 1,
    alignItems: "center",
  },
  flexDirectionRow: {
    flexDirection: "row",
  },
  profileDetails: {
    flexDirection: "column",
  },
  loader: {
    elevation: 8,
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
  },
});

export default HelperProfileDetails;
