import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  ToastAndroid,
} from "react-native";
import { Avatar, Title, Button, ActivityIndicator } from "react-native-paper";
import CustomTextInput from "../shared/components/CustomTextInput";
import ZoomImage from "react-native-zoom-image";
import { Easing } from "react-native"; // import Easing if you want to customize easing function
import { GREEN } from "../../colors";
import Firebase from "../../Firebase";
import Notifications from "../../DataModels/Notifications";

const HelperRequestDetails = (props) => {
  const acceptRequest = async () => {
    setLoaderVisible(true);
    await Firebase.firestore()
      .collection("requests")
      .doc(props.route.params.key)
      .update({ status: "Accepted" });
    await Firebase.firestore()
      .collection("users")
      .doc(props.route.params.uid)
      .update({ isActiveHelper: true });
    await Firebase.firestore()
      .collection("notification")
      .add(
        Object.assign(
          {},
          new Notifications(
            props.route.params.uid,
            "unseen",
            "Your request was Accepted"
          )
        )
      );
    setLoaderVisible(false);
    ToastAndroid.show("Request Accepted", ToastAndroid.SHORT);
    props.navigation.pop();
  };
  const declineRequest = async () => {
    setLoaderVisible(true);
    await Firebase.firestore()
      .collection("requests")
      .doc(props.route.params.key)
      .update({ status: "Rejected" });
    await Firebase.firestore()
      .collection("notification")
      .add(
        Object.assign(
          {},
          new Notifications(
            props.route.params.uid,
            "unseen",
            "Your request was Rejected"
          )
        )
      );
    setLoaderVisible(false);
    ToastAndroid.show("Request Denied", ToastAndroid.SHORT);
    props.navigation.pop();
  };

  const [loaderVisible, setLoaderVisible] = useState(false);
  useEffect(() => {}, []);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.loader}>
        <ActivityIndicator
          animating={loaderVisible}
          size="large"
          color={GREEN}
        />
      </View>
      <View style={styles.center}>
        <Avatar.Image
          size={84}
          source={{
            uri: global.user.photoURL
              ? global.user.photoURL
              : "https://buzzwonder.com/wp-content/uploads/2020/04/2020-02-21.jpg",
          }}
        />
      </View>
      <View style={styles.fieldsContainer}>
        <CustomTextInput
          editable={false}
          label="Name"
          value={props.route.params.data.name}
        />
        <CustomTextInput
          label="Address"
          editable={false}
          multiline={true}
          value={props.route.params.data.address}
        />
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <CustomTextInput
            style={{ flex: 1 }}
            label="CNIC"
            editable={false}
            value={props.route.params.data.cnic}
          />
          <CustomTextInput
            style={{ flex: 1 }}
            label="Mobile"
            editable={false}
            value={props.route.params.data.mobile}
          />
        </View>
        <CustomTextInput
          editable={false}
          label="Date of Birth"
          value={props.route.params.data.dob}
        />
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <CustomTextInput
            style={{ flex: 1 }}
            label="CNIC"
            editable={false}
            value={props.route.params.data.country}
          />
          <CustomTextInput
            style={{ flex: 1 }}
            label="Mobile"
            editable={false}
            value={props.route.params.data.city}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            flex: 1,
          }}
        >
          <Title>Utility Bill</Title>
          <Title>CNIC</Title>
        </View>
        <View
          style={{
            marginVertical: 10,
            marginHorizontal: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          <ZoomImage
            source={{ uri: props.route.params.data.billUri }}
            imgStyle={{ width: 150, height: 150 }}
            style={{ width: 150, height: 150 }}
            duration={200}
            enableScaling={false}
            easingFunc={Easing.ease}
          />
          {/* <Image
            style={{ }}
            source={{ uri: props.route.params.data.billUri }}
          /> */}
          <ZoomImage
            source={{ uri: props.route.params.data.cnicUri }}
            imgStyle={{ width: 150, height: 150 }}
            style={{ width: 150, height: 150 }}
            duration={200}
            enableScaling={false}
            easingFunc={Easing.ease}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginBottom: 15,
          }}
        >
          <Button color={GREEN} mode="outlined" onPress={acceptRequest}>
            Accept
          </Button>
          <Button color={GREEN} mode="outlined" onPress={declineRequest}>
            Reject
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  fieldsContainer: {
    marginTop: 30,
    flex: 1,
  },
  container: {
    marginTop: 30,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loader: {
    elevation: 8,
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
  },
});

export default HelperRequestDetails;
