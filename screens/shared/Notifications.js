import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Title, Divider, ActivityIndicator, Text } from "react-native-paper";
import { GREEN } from "../../colors";
import Firebase from "../../Firebase";

const Notification = (props) => {
  const [loaderVisible, setLoaderVisible] = useState(false);
  const [notification, setNotification] = useState([]);

  useEffect(() => {
    props.navigation.addListener("focus", async () => {
      await getNotifications();
    });

    return () => {
      setLoaderVisible(false);
      setNotification([]);
    };
  }, []);

  const getNotifications = async () => {
    setLoaderVisible(true);
    const docs = await Firebase.firestore()
      .collection("notification")
      .where("uid", "==", global.user.uid)
      .get();
    if (docs.size > 0) {
      let notificationArray = [];
      docs.forEach(async (item) => {
        notificationArray.push({
          ...item.data(),
          key: item.id,
        });
        await item.ref.update({ status: "seen" });
      });
      setNotification(notificationArray);
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
      <Title style={{ marginBottom: 10 }}>Notifications</Title>
      <Divider />
      <View style={{ marginVertical: 10 }}>
        <FlatList
          data={notification}
          renderItem={({ item }) => (
            <View style={{ width: "100%", margin: 10 }}>
              {item.status === "unseen" ? (
                <Text style={{ fontWeight: "bold", paddingHorizontal: 10 }}>
                  {item.message.split("\n").join("")}
                </Text>
              ) : (
                <Text style={{ paddingHorizontal: 10 }}>
                  {item.message.split("\n").join("")}
                </Text>
              )}

              <Divider />
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  notification: {},
  loader: {
    elevation: 8,
    position: "absolute",
    top: 250,
    left: 0,
    right: 0,
  },
});

export default Notification;
