import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { StackActions, NavigationActions } from "react-navigation";
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
            uri:
              "https://buzzwonder.com/wp-content/uploads/2020/04/2020-02-21.jpg",
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
      <View style={styles.donationDashboard}>
        <Card>
          <Card.Title
            title="Requests Dashboard"
            left={(props) => (
              <Avatar.Icon
                {...props}
                icon="folder"
                color="#ffffff"
                style={{ backgroundColor: GREEN }}
              />
            )}
          />
          <Card.Content>
            <View style={{ marginLeft: "4%" }}>
              <View style={styles.flexDirectionRow}>
                <Subheading style={styles.boldFont}>Total Cases: </Subheading>
                <Subheading>{totalCases}</Subheading>
              </View>
              <View style={styles.flexDirectionRow}>
                <Subheading style={styles.boldFont}>
                  Total Active Cases:{" "}
                </Subheading>
                <Subheading>{totalActiveCases}</Subheading>
              </View>
              <View style={styles.flexDirectionRow}>
                <Subheading style={styles.boldFont}>
                  Total Inactive Cases:{" "}
                </Subheading>
                <Subheading>{totalInactiveCases}</Subheading>
              </View>
            </View>
          </Card.Content>
          <Card.Actions>
            <View style={styles.btnDetails}>
              <Button
                color={GREEN}
                onPress={() => {
                  props.navigation.navigate("Total Cases");
                }}
              >
                Details
              </Button>
            </View>
          </Card.Actions>
        </Card>
      </View>
      <View style={styles.addButtonContainer}>
        <FAB
          icon="plus"
          color="#ffffff"
          style={{ backgroundColor: GREEN }}
          onPress={() => {
            setDialogState(true);
          }}
        />
      </View>
      {/* DIALOG */}
      <Portal>
        <Dialog visible={dialogState} onDismiss={() => setDialogState(false)}>
          <Dialog.Title>Donation App</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Do you want to create a new case?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              color={GREEN}
              onPress={() => {
                setDialogState(false);
                props.navigation.navigate("New Request");
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
