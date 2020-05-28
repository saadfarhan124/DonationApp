import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { StackActions, NavigationActions } from "@react-navigation/native";
import {
  Avatar,
  Card,
  Title,
  Subheading,
  Paragraph,
  Button,
  FAB,
  Dialog,
  ActivityIndicator,
  Portal,
} from "react-native-paper";
import { PINK, GREEN, GRAY } from "../../colors";
import Firebase from "../../Firebase";
import Dashboard from "../shared/components/Dashboard";

const Profile = (props) => {
  const updateDashboard = async () => {
    setLoaderVisible(true);

    // Total Cases
    const total = await Firebase.firestore()
      .collection("cases")
      .where("userId", "==", global.user.uid)
      .get();
    setTotalCases(total.size);

    //InActive Cases
    const inactive = await Firebase.firestore()
      .collection("cases")
      .where("userId", "==", global.user.uid)
      .where("caseStatus", "==", "inactive")
      .get();

    //Total Donation
    const userObj = await Firebase.firestore()
      .collection("users")
      .doc(global.user.uid)
      .get();

    //Total Cases Donated To
    const totalCasesDonated = await Firebase.firestore()
      .collection("donations")
      .where("userId", "==", global.user.uid)
      .get();
    setTotalCasesDonatedTo(totalCasesDonated.size);

    setTotalDonationMade(userObj.data().amountDonated);
    setTotalInactiveCases(inactive.size);
    setTotalActiveCases(total.size - inactive.size);

    setLoaderVisible(false);
  };
  useEffect(() => {
    props.navigation.addListener("focus", async () => {
      await updateDashboard();
    });
  }, []);

  const [dialogState, setDialogState] = useState(false);

  // Dashboard Details
  const [totalCases, setTotalCases] = useState(0);
  const [totalInactiveCases, setTotalInactiveCases] = useState(0);
  const [totalActiveCases, setTotalActiveCases] = useState(0);

  const [loaderVisible, setLoaderVisible] = useState(false);

  // Donation Details
  const [totalDonationMade, setTotalDonationMade] = useState(0);
  const [totalCasesDonatedTo, setTotalCasesDonatedTo] = useState(0);

  const logout = () => {};
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
            <Button
              mode="Outlined"
              color={GREEN}
              onPress={() => console.log("Logout")}
            >
              Logout
            </Button>
          </View>
        </View>
      </View>

      <View style={styles.addButtonContainer}>
        <FAB
          icon="plus"
          color="#ffffff"
          style={{ backgroundColor: GREEN }}
          onPress={() => {
            setDialogState(true);
          }}
          visible={global.userFirebase.data().isActiveHelper}
        />
        <FAB
          icon={require("../../assets/icons/become-helper-mini.png")}
          color="#ffffff"
          style={{ backgroundColor: GREEN }}
          onPress={() => {
            setDialogState(true);
          }}
          visible={!global.userFirebase.data().isActiveHelper}
        />
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
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: "10%",
        }}
      >
        <Dashboard
          title="Donation Dashboard"
          totalDonationMade={totalDonationMade}
          totalCasesDonatedTo={totalCasesDonatedTo}
          type="donation"
        />
        {global.userFirebase.data().isActiveHelper && (
          <Dashboard
            title="Cases Dashboard"
            totalCases={totalCases}
            totalActiveCases={totalActiveCases}
            totalInactiveCases={totalInactiveCases}
            navigation={props.navigation}
            type="case"
          />
        )}
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
