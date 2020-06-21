import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import UserCard from "../shared/components/UserCard";
import { GREEN } from "../../colors";
import Firebase from "../../Firebase";
import CustomDialog from "../shared/components/Dialog";
import RequestCard from "../shared/components/RequestCard";

const AllRequests = (props) => {
  const [loaderVisible, setLoaderVisible] = useState(true);
  //Reuqest list
  const [requestList, setRequestList] = useState([]);

  const listRequests = async () => {
    const requestDocuments = await Firebase.firestore()
      .collection("requests")
      .where("status", "==", "Pending")
      .get();
    const requestArray = [];
    requestDocuments.forEach((docs) => {
      requestArray.push({
        ...docs.data(),
        key: docs.id,
      });
    });
    setRequestList(requestArray);
    setLoaderVisible(false);
  };
  const RequestDetails = (obj) => {
    if (obj.type == "New Case Request") {
      props.navigation.navigate(
        "Case Request Details",
        requestList.find((c) => c.key === obj.id)
      );
    } else if (obj.type == "Helper Application") {
      props.navigation.navigate(
        "Request Details",
        requestList.find((c) => c.key === obj.id)
      );
    }
  };
  useEffect(() => {
    async function anyNameFunction() {
      await listRequests();
    }
    anyNameFunction();
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
        data={requestList}
        renderItem={({ item }) => (
          <RequestCard
            status={item.status}
            type={item.type}
            navigation={props.navigation}
            onClick={RequestDetails}
            id={item.key}
          />
        )}
        keyExtractor={(item) => item.key}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loader: {
    elevation: 8,
    position: "absolute",
    bottom: "50%",
    left: 0,
    right: 0,
  },
});

export default AllRequests;
