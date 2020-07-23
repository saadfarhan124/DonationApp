import React, { useEffect, useState } from "react";
import {
  View,
  ToastAndroid,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
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
import { PINK, GREEN, GRAY } from "../../colors";
import Firebase from "../../Firebase";
import Dashboard from "../shared/components/Dashboard";

const Profile = (props) => {
  //donor fields
  const [totalCasesDonatedTo, setTotalCasesDonatedTo] = useState(0);
  const [totalAmountCommited, setTotalAmountCommited] = useState(0);
  const [totalAmountDonated, setTotalAmountDonated] = useState(0);
  const [totalAmountFullfilled, setTotalAmountFullfilled] = useState(0);

  //helperFields
  const [totalCases, setTotalCases] = useState(0);
  const [totalFundsCollected, setTotalFundsCollected] = useState(0);
  const [totalAmountCommitedCases, setTotalAmountCommitedCases] = useState(0);
  const [totalAmountFullfilledCases, setTotalAmountFullfilledCases] = useState(
    0
  );

  const updateDashboard = async () => {
    setLoaderVisible(true);
    //helpers
    if (global.userFirebase.data().isActiveHelper) {
      let totalCasesVar = 0;
      let casesId = [];
      let totalFunds = 0;
      let totalAmountCommitedCasesVar = 0;
      let totalAmountFullfilledCasesVar = 0;
      const casesDoc = await Firebase.firestore()
        .collection("cases")
        .where("userId", "==", global.user.uid)
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
    }

    //donors
    const transDocs = await Firebase.firestore()
      .collection("transaction")
      .where("donorId", "==", global.user.uid)
      .where("status", "in", ["fulfilled", "commited"])
      .get();
    let totalAmountCommitedVar = 0;
    let totalAmountDonatedVar = 0;
    let totalAmountFullfilleddVar = 0;

    transDocs.forEach((doc) => {
      if (doc.data().status == "commited") {
        totalAmountCommitedVar += parseInt(doc.data().amount);
      }
      if (doc.data().status != "rejected") {
        totalAmountDonatedVar += parseInt(doc.data().amount);
      }
      if (doc.data().status == "fulfilled") {
        totalAmountFullfilleddVar += parseInt(doc.data().amount);
      }
    });

    setTotalCasesDonatedTo(transDocs.size);
    setTotalAmountCommited(totalAmountCommitedVar);
    setTotalAmountDonated(totalAmountDonatedVar);
    setTotalAmountFullfilled(totalAmountFullfilleddVar);

    setLoaderVisible(false);
  };
  useEffect(() => {
    props.navigation.addListener("focus", async () => {
      await updateDashboard();
    });

    return () => {
      setDialogState(false);
      setTotalCasesDonatedTo(totalCasesDonatedTo);
      setTotalAmountCommited(totalAmountCommited);
      setTotalAmountDonated(totalAmountDonated);
      setTotalAmountFullfilled(totalAmountFullfilled);
      setTotalCases(totalCases);
      setTotalFundsCollected(totalFundsCollected);
      setTotalAmountCommitedCases(totalAmountCommitedCases);
      setTotalAmountFullfilledCases(totalAmountFullfilledCases);
      setLoaderVisible(false);
    };
  }, []);

  const [dialogState, setDialogState] = useState(false);

  // Dashboard Details

  const [loaderVisible, setLoaderVisible] = useState(false);

  // Donation Details

  const logout = () => {
    Firebase.auth().signOut();
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
      <View style={styles.flexDirectionRow}>
        <Avatar.Image
          size={84}
          source={{
            uri: global.user.photoURL
              ? global.user.photoURL
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
            <Title>{global.user.displayName}</Title>
            <Paragraph>{global.user.email}</Paragraph>
            <Button mode="Outlined" color={GREEN} onPress={logout}>
              Logout
            </Button>
          </View>
        </View>
      </View>

      {/* Donation Collapsible */}

      <View style={styles.addButtonContainer}>
        {global.userFirebase.data().isActiveHelper ? (
          <FAB
            icon="plus"
            color="#ffffff"
            style={{ backgroundColor: GREEN }}
            onPress={() => {
              setDialogState(true);
            }}
            visible={true}
          />
        ) : (
          <FAB
            icon={require("../../assets/icons/become-helper-mini.png")}
            color="#ffffff"
            style={{ backgroundColor: GREEN }}
            onPress={() => {
              setDialogState(true);
            }}
            visible={true}
          />
        )}
      </View>
      {/* DIALOG */}
      <Portal>
        <Dialog visible={dialogState} onDismiss={() => setDialogState(false)}>
          <Dialog.Title>Donation App</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              {global.userFirebase.data().isActiveHelper
                ? "Do you want to create a new case?"
                : "Do you want to apply to be an active helper?"}
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              color={GREEN}
              onPress={() => {
                setDialogState(false);
                if (global.userFirebase.data().isActiveHelper) {
                  props.navigation.navigate("New Request");
                } else {
                  props.navigation.navigate("Helper Application");
                }
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
      <View></View>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: "10%",
          flexGrow: 1,
        }}
      >
        {global.userFirebase.data().isActiveHelper && (
          <Dashboard
            title="Cases"
            navigation={props.navigation}
            type="case"
            totalCases={totalCases}
            totalFundsCollected={totalFundsCollected}
            totalAmountCommitedCases={totalAmountCommitedCases}
            totalAmountFullfilledCases={totalAmountFullfilledCases}
          />
        )}
        <Dashboard
          title="Donation"
          navigation={props.navigation}
          type="donation"
          totalCasesDonatedTo={totalCasesDonatedTo}
          totalAmountCommited={totalAmountCommited}
          totalAmountDonated={totalAmountDonated}
          totalAmountFullfilled={totalAmountFullfilled}
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
  donationDashboard: {
    paddingTop: "10%",
    width: "90%",
  },
  centerItem: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  boldFont: {
    fontWeight: "bold",
  },
  addButtonContainer: {
    position: "absolute",
    zIndex: 2,
    bottom: 0,
    right: 0,
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 36,
  },
  loader: {
    elevation: 8,
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
  },
  btnDetails: {
    position: "absolute",
    right: 0,
    paddingBottom: 20,
  },
});

export default Profile;
