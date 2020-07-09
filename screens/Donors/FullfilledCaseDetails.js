import React, { useState, useEffect } from "react";
import ZoomImage from "react-native-zoom-image";
import { Easing } from "react-native"; // import Easing if you want to customize easing function
import { View, StyleSheet, ScrollView, ToastAndroid } from "react-native";
import { Button, ActivityIndicator, Title, Text } from "react-native-paper";
import { GREEN } from "../../colors";
import CustomTextInput from "../shared/components/CustomTextInput";
import ImageUploadDialog from "../shared/components/ImageUploadDialog";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import Firebase from "../../Firebase";

const FullfilledCaseDetails = (props) => {
  //loader
  const [loaderVisible, setLoaderVisible] = useState(false);
  //permissions
  const [hasPermission, setHasPermission] = useState(false);

  //dialog flag
  const [dialogFlag, setDialogFlag] = useState(false);

  const [evidenceImage, setEvidenceImage] = useState(null);

  useEffect(() => {
    async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      setHasPermission(status === "granted");
    };
    return () => {
      setLoaderVisible(false);
      setHasPermission(false);
      setDialogFlag(false);
    };
  }, []);

  const selectFromCamera = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 1,
      });
      if (!result.cancelled) {
        setEvidenceImage(result.uri);
      } else {
        ToastAndroid.show(
          "Please select an image to continue",
          ToastAndroid.SHORT
        );
      }
      setDialogFlag(false);
    } catch (E) {
      ToastAndroid.show(E.message, ToastAndroid.SHORT);
    }
  };

  const uploadToFirebaseStorage = async (result, transactionId) => {
    try {
      const storage = Firebase.storage();
      const storageRef = storage.ref();
      var ref;
      ref = storageRef.child(
        `${global.user.uid}/transactions/${transactionId}`
      );
      const response = await fetch(result);
      const blob = await response.blob();
      await ref.put(blob);
      const url = await ref.getDownloadURL();
      return url;
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
  };

  const selectFromGallery = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 1,
      });
      if (!result.cancelled) {
        setEvidenceImage(result.uri);
      } else {
        ToastAndroid.show(
          "Please select an image to continue",
          ToastAndroid.SHORT
        );
      }
      setDialogFlag(false);
    } catch (E) {
      ToastAndroid.show(E.message, ToastAndroid.SHORT);
    }
  };

  const updateTransaction = async () => {
    setLoaderVisible(true);
    let url = await uploadToFirebaseStorage(
      evidenceImage,
      props.route.params.transationId
    );
    await Firebase.firestore()
      .collection("transaction")
      .doc(props.route.params.transationId)
      .update({ uri: url });
    setLoaderVisible(false);
  };

  return (
    <View>
      <View style={styles.loader}>
        <ActivityIndicator
          animating={loaderVisible}
          size="large"
          color={GREEN}
        />
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingBottom: "10%",
          flexGrow: 1,
          marginHorizontal: 20,
        }}
      >
        {/* //dialog */}
        <ImageUploadDialog
          visible={dialogFlag}
          onGallery={selectFromGallery}
          onCamera={selectFromCamera}
          onDismiss={() => setDialogFlag(false)}
        />

        <View style={styles.center}>
          <Title>Transaction Details</Title>
        </View>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <CustomTextInput
            style={{ flex: 1 }}
            label="Donated Amount"
            editable={false}
            value={props.route.params.transactionData.amount}
          />
          <CustomTextInput
            style={{ flex: 1 }}
            label="Status"
            editable={false}
            value={props.route.params.transactionData.status}
          />
        </View>

        <View style={styles.center}>
          <Title>Upload Commitment Evidence</Title>
        </View>
        {evidenceImage ? (
          <View>
            <View style={styles.center}>
              <Title>Evidence</Title>
            </View>
            <ZoomImage
              source={{ uri: evidenceImage }}
              imgStyle={{ width: "100%", height: 150 }}
              style={{ width: "100%", height: 150 }}
              duration={200}
              enableScaling={false}
              easingFunc={Easing.ease}
            />
          </View>
        ) : (
          <View style={styles.center}>
            <Text>No evidence sumbitted yet</Text>
          </View>
        )}
        <Button
          color={GREEN}
          mode="outlined"
          compact={true}
          style={{ borderRadius: 0 }}
          onPress={() => {
            setDialogFlag(true);
          }}
        >
          Upload Image
        </Button>
        <View style={styles.center}>
          <Title>Case Details</Title>
        </View>
        {/* Request Name */}
        <CustomTextInput
          label="Request Title"
          editable={false}
          value={props.route.params.name}
        />

        {/* Request Description */}
        <CustomTextInput
          label="Request Description"
          multiline={true}
          editable={false}
          value={props.route.params.description}
        />
        {/* Request Amount */}
        <CustomTextInput
          label="Amount Required"
          editable={false}
          value={props.route.params.amountRequired}
        />

        <CustomTextInput
          label="Request Type"
          editable={false}
          value={props.route.params.requestType}
        />

        <View
          style={{
            flexDirection: "row",
          }}
        >
          <CustomTextInput
            style={{ flex: 1 }}
            label="CNIC of Needy"
            editable={false}
            value={props.route.params.needyCnic}
          />
          <CustomTextInput
            style={{ flex: 1 }}
            label="Needy's income"
            editable={false}
            value={props.route.params.needyIncome}
          />
        </View>
        <CustomTextInput
          label="Needy's Address"
          multiline={true}
          editable={false}
          value={props.route.params.needyAddress}
        />
        <Button
          color={GREEN}
          mode="outlined"
          compact={true}
          onPress={async () => {
            if (evidenceImage == null) {
              ToastAndroid.show(
                "Please upload a valid image",
                ToastAndroid.SHORT
              );
            } else {
              await updateTransaction();
            }
          }}
        >
          Update
        </Button>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  loader: {
    elevation: 8,
    position: "absolute",
    top: "35%",
    left: 0,
    right: 0,
  },
});

export default FullfilledCaseDetails;
