import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableOpacity,
  Picker,
  ToastAndroid,
  Image,
} from "react-native";
import {
  Button,
  Text,
  ActivityIndicator,
  Divider,
  RadioButton,
} from "react-native-paper";
import CustomTextInput from "./components/CustomTextInput";
import { GREEN } from "../../colors";
import ImageUploadDialog from "./components/ImageUploadDialog";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import Firebase from "../../Firebase";
import CalendarPicker from "react-native-calendar-picker";
import { countries } from "../../Constants";
import Request from "../../DataModels/Request";

const HelperApply = (props) => {
  //Form Fields

  const [fullname, setFullname] = useState("");
  const [address, setAddress] = useState("");
  const [cnic, setCnic] = useState("");
  const [mobile, setMobile] = useState("");
  const [dob, setDob] = useState("");

  const [selectedCountry, setSelectedCountry] = useState("Pakistan");
  const [selectedCity, setSelectedCity] = useState("Karachi");

  //gender fflag
  const [genderFlag, setGenderFlag] = useState(true);

  //cnic
  const [cnicImage, setCnicImage] = useState(null);

  //utility bill
  const [billImage, setBillImage] = useState(null);

  //flag for selected utility bill or cnic
  const [selected, setSelected] = useState(false);

  //permissions
  const [hasPermission, setHasPermission] = useState(false);

  //dialog flag
  const [dialogFlag, setDialogFlag] = useState(false);

  //modal flag
  const [modalFlag, setModalFlag] = useState(false);

  //loader flag
  const [loaderVisible, setLoaderVisible] = useState(false);

  const submitForm = async () => {
    if (cnicImage === null) {
      ToastAndroid.show(
        "Please upload a clear picture of your CNIC",
        ToastAndroid.SHORT
      );
    } else if (billImage === null) {
      ToastAndroid.show(
        "Please upload a clear picture of your Utility Bill",
        ToastAndroid.SHORT
      );
    } else if (
      fullname.length === 0 ||
      address.length === 0 ||
      cnic.length === 0 ||
      mobile.length === 0 ||
      dob.length === 0
    ) {
      ToastAndroid.show("Please fill all the fields", ToastAndroid.SHORT);
    } else {
      setLoaderVisible(true);
      const cnicUrl = await uploadToFirebaseStorage(cnicImage, "cnic");
      const billUrl = await uploadToFirebaseStorage(billImage, "bill");
      const data = {
        name: fullname,
        address: address,
        cnic: cnic,
        mobile: mobile,
        dob: dob,
        country: selectedCountry,
        city: selectedCity,
        gender: genderFlag ? "Male" : "Female",
        cnicUri: cnicUrl,
        billUri: billUrl,
      };
      await Firebase.firestore()
        .collection("users")
        .doc(global.user.uid)
        .update(data);
      data.photoUrl = global.user.photoURL;
      const helperRequest = new Request(
        "Helper Application",
        "Pending",
        data,
        global.user.uid
      );
      await Firebase.firestore()
        .collection("requests")
        .add({ ...helperRequest });
      setLoaderVisible(false);
      ToastAndroid.show("Request submitted succesfully", ToastAndroid.SHORT);
      props.navigation.pop();
    }
  };

  const selectFromGallery = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 1,
      });
      if (!result.cancelled) {
        if (selected) {
          //cnic
          setCnicImage(result.uri);
        } else {
          //bill
          setBillImage(result.uri);
        }
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

  const selectFromCamera = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 1,
      });
      if (!result.cancelled) {
        if (selected) {
          //cnic
          setCnicImage(result.uri);
        } else {
          //bill
          setBillImage(result.uri);
        }
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

  const uploadToFirebaseStorage = async (result, type) => {
    try {
      const storage = Firebase.storage();
      const storageRef = storage.ref();
      var ref;
      ref = storageRef.child(`${global.user.uid}/${type}`);
      const response = await fetch(result);
      const blob = await response.blob();
      await ref.put(blob);
      const url = await ref.getDownloadURL();
      return url;
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      setHasPermission(status === "granted");
    };
    return () => {
      setFullname("");
      setAddress("");
      setCnic("");
      setMobile("");
      setDob("");
      setSelectedCountry("Pakistan");
      setSelectedCity("Karachi");
      setGenderFlag(true);
      setCnicImage(null);
      setBillImage(null);
      setSelected(false);
      setHasPermission(false);
      setDialogFlag(false);
      setModalFlag(false);
      setLoaderVisible(false);
    };
  }, []);
  return (
    <ScrollView style={styles.container}>
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

      {/* Loader */}
      <View style={styles.loader}>
        <ActivityIndicator
          animating={loaderVisible}
          size="large"
          color={GREEN}
        />
      </View>
      {/* Modal */}
      <View style={{}}>
        <Modal visible={modalFlag} animationType="slide" transparent={true}>
          <TouchableOpacity onPress={() => setModalFlag(false)}>
            <Text style={styles.closeText}>X</Text>
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              marginVertical: 50,
              backgroundColor: "rgba(0, 0, 0, 0.6)",
            }}
          >
            <CalendarPicker
              onDateChange={(date) => {
                setDob(date.toString().split(" ").slice(1, 4).join(" "));
                setModalFlag(false);
              }}
              initialDate={new Date(1996, 11, 7, 10, 33, 30, 0)}
              textStyle={{
                color: GREEN,
              }}
            />
          </View>
        </Modal>
      </View>
      {/* //dialog */}
      <ImageUploadDialog
        visible={dialogFlag}
        onGallery={selectFromGallery}
        onCamera={selectFromCamera}
        onDismiss={() => setDialogFlag(false)}
      />
      <View style={styles.fieldsContainer}>
        <CustomTextInput
          label="Name"
          value={fullname}
          onChangeText={(text) => setFullname(text)}
        />

        <CustomTextInput
          label="Address"
          multiline={true}
          value={address}
          onChangeText={(text) => setAddress(text)}
        />
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <CustomTextInput
            style={{ flex: 1 }}
            label="CNIC"
            keyboardType="number-pad"
            value={cnic}
            onChangeText={(text) => setCnic(text)}
          />
          <CustomTextInput
            style={{ flex: 1 }}
            label="Mobile"
            keyboardType="number-pad"
            value={mobile}
            onChangeText={(text) => setMobile(text)}
          />
        </View>

        <TouchableOpacity onPress={() => setModalFlag(true)}>
          <CustomTextInput editable={false} label="Date of Birth" value={dob} />
        </TouchableOpacity>

        <View
          style={{
            flexDirection: "row",
            // alignContent: "flex-start",
            justifyContent: "space-between",
          }}
        >
          {/* <CustomTextInput style={{ flex: 1 }} label="Country" /> */}
          <Picker
            style={{ flex: 1 }}
            onValueChange={(itemValue) => setSelectedCountry(itemValue)}
            selectedValue={selectedCountry}
          >
            {/* <Picker.Item value="" label="Country" /> */}
            {countries.map((value, index) => (
              <Picker.Item key={index} label={value.name} value={value.name} />
            ))}
          </Picker>
          <Picker
            style={{ flex: 1 }}
            onValueChange={(itemValue) => setSelectedCity(itemValue)}
            selectedValue={selectedCity}
          >
            {countries
              .filter((value, index) => value.name === selectedCountry)
              .map((value, index) =>
                value.cities.map((value, index) => (
                  <Picker.Item
                    key={index}
                    value={value.name}
                    label={value.name}
                  />
                ))
              )}
          </Picker>
        </View>

        <View
          style={{
            marginVertical: 15,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Text>I am a</Text>
          <RadioButton
            value="first"
            status={genderFlag ? "checked" : "unchecked"}
            onPress={() => {
              setGenderFlag(true);
            }}
          />
          <Text>Male</Text>

          <RadioButton
            value="second"
            status={genderFlag ? "unchecked" : "checked"}
            onPress={() => {
              setGenderFlag(false);
            }}
          />
          <Text>Female</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: "2%",
          }}
        >
          <Button
            color={GREEN}
            mode="outlined"
            compact={true}
            onPress={() => {
              setSelected(true);
              setDialogFlag(true);
            }}
          >
            CNIC Upload
          </Button>

          <Button
            color={GREEN}
            mode="outlined"
            compact={true}
            onPress={() => {
              setSelected(false);
              setDialogFlag(true);
            }}
          >
            Utility Bill Upload
          </Button>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Button
            color={GREEN}
            mode="outlined"
            // compact={true}
            onPress={() => {}}
            style={{ width: 130 }}
            onPress={submitForm}
          >
            Submit
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  fieldsContainer: {
    flex: 1,
  },
  closeText: {
    marginTop: 30,
    marginHorizontal: 5,
    backgroundColor: GREEN,
    color: "white",
    borderRadius: 20,
    width: 32,
    padding: 6,
    alignSelf: "flex-end",
    textAlign: "center",
    borderWidth: 1,
    borderColor: "white",
  },
  loader: {
    elevation: 8,
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
  },
});

export default HelperApply;
