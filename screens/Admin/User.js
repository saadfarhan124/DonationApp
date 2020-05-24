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
      obj.isActiveHelper
        ? "Do you want to grant this user The Active Helper Badge?"
        : "Do you want to remove The Active Helper Badge from the user?"
    );
    setDialogState(true);
    console.log(obj.id);
  };

  const setTrustedHelper = (id) => {
    // console.log(id);
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
            onActiveHelper={setActiveHelper}
            setTrustedHelper={setTrustedHelper}
          />
        )}
        keyExtractor={(item) => item.key}
      />
      <CustomDialog message={dialogMessage} dialogState={dialogState} />
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
