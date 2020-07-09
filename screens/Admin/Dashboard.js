import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import {
  Avatar,
  Title,
  Paragraph,
  Button,
  FAB,
  Dialog,
  ActivityIndicator,
  Portal,
} from "react-native-paper";
import { PINK, GREEN, GRAY } from "../../colors";
import Dashboard from "../shared/components/Dashboard";
import Firebase from "../../Firebase";
const Dashboardd = (props) => {
  const [totalDonation, setTotalDonation] = React.useState(0);
  const [totalCases, setTotalCases] = React.useState(0);
  const [totalHelper, setTotalHelper] = React.useState(0);
  React.useEffect(() => {
    async function getDetails() {
      const documents = await Firebase.firestore()
        .collection("requests")
        .where("status", "==", "Pending")
        .get();

      let donationCount = 0,
        helperCount = 0,
        casesCount = 0;
      documents.docs.forEach((item) => {
        console.log(item.data().type);
        if (item.data().type === "Donation") {
          donationCount += 1;
        } else if (item.data().type === "Helper Application") {
          helperCount += 1;
        } else if (item.data().type === "New Case Request") {
          casesCount += 1;
        }
      });

      setTotalCases(casesCount);
      setTotalDonation(donationCount);
      setTotalHelper(helperCount);
    }
    getDetails();
  }, []);
  return (
    <View style={styles.container}>
      {/* <View style={styles.loader}>
        <ActivityIndicator
          animating={loaderVisible}
          size="large"
          color={GREEN}
        />
      </View> */}
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
              onPress={() => Firebase.auth().signOut()}
            >
              Logout
            </Button>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: "10%" }}>
        <Dashboard
          title="Admin Dashboard"
          type={null}
          navigation={props.navigation}
          totalCases={totalCases}
          totalDonation={totalDonation}
          totalHelper={totalHelper}
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

export default Dashboardd;
