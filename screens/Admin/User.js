import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Dialog, Portal, Paragraph, Button } from "react-native-paper";
import UserCard from "../shared/components/UserCard";
import { GREEN } from "../../colors";
import Firebase from "../../Firebase";
import CustomDialog from "../shared/components/Dialog";

const Users = (props) => {
  const [loaderVisible, setLoaderVisible] = useState(true);
  const [usersList, setUsersList] = useState([]);

  //flag to set update active or trusted
  const [flag, setFlag] = useState(false);

  //selected user for active or trusted
  const [selectedUser, setSelectedUser] = useState({});

  //dialog
  const [dialogState, setDialogState] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  //function to get users
  const listUsers = async () => {
    const userDocuments = await Firebase.firestore().collection("users").get();
    const userArray = [];
    userDocuments.forEach((docs) => {
      userArray.push({
        ...docs.data(),
        key: docs.id,
      });
    });
    setUsersList(userArray);
    setLoaderVisible(false);
  };

  const setActiveHelper = (obj) => {
    setDialogMessage(
      obj.isActive
        ? "Do you want to remove The Active Helper Badge from the user?"
        : "Do you want to grant this user The Active Helper Badge?"
    );
    setSelectedUser(obj);
    setDialogState(true);
    setFlag(true);
  };

  const setTrustedHelper = (obj) => {
    setDialogMessage(
      obj.isTrusted
        ? "Do you want to remove The Trusted Helper Badge from the user?"
        : "Do you want to grant this user The Trusted Helper Badge?"
    );
    setSelectedUser(obj);
    setDialogState(true);
    setFlag(false);
  };

  const onDialogYes = async () => {
    setDialogState(false);
    setLoaderVisible(true);
    if (flag) {
      const updateState = selectedUser.isActive ? false : true;
      await Firebase.firestore()
        .collection("users")
        .doc(selectedUser.id)
        .update({ isActiveHelper: updateState });
    } else {
      const updateState = selectedUser.isTrusted ? false : true;

      await Firebase.firestore()
        .collection("users")
        .doc(selectedUser.id)
        .update({ isTrustedHelper: updateState });
    }
    setLoaderVisible(false);
    await listUsers();
  };

  useEffect(() => {
    props.navigation.addListener("focus", async () => {
      await listUsers();
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.loader}>
        <ActivityIndicator
          animating={loaderVisible}
          size="large"
          color={GREEN}
        />
      </View>
      <FlatList
        data={usersList}
        renderItem={({ item }) => (
          <UserCard
            username={item.name}
            email={item.email}
            id={item.key}
            isActiveHelper={item.isActiveHelper}
            isTrustedHelper={item.isTrustedHelper}
            onActiveHelper={setActiveHelper}
            onTrustedHelper={setTrustedHelper}
          />
        )}
        keyExtractor={(item) => item.key}
      />
      <CustomDialog
        message={dialogMessage}
        dialogState={dialogState}
        setDialogState={setDialogState}
        onYes={onDialogYes}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    margin: 25,
  },
  loader: {
    elevation: 8,
    position: "absolute",
    bottom: "50%",
    left: 0,
    right: 0,
  },
});

export default Users;
