import React from "react";
import { GREEN } from "../../../colors";
import { Portal, Dialog, Button, Paragraph } from "react-native-paper";
import { View } from "react-native";

const ImageUploadDialog = (props) => (
  <Portal>
    <Dialog
      // onDismiss={props.onDismiss(false)}
      visible={props.visible}
      onDismiss={() => console.log("")}
    >
      <Dialog.Title>Upload CNIC</Dialog.Title>
      <View
        style={{
          alignItems: "flex-start",
          marginHorizontal: 10,
          marginBottom: 10,
        }}
      >
        <Button onPress={props.onCamera} color={GREEN}>
          Take Picture
        </Button>
        <Button onPress={props.onGallery} color={GREEN}>
          Upload from Gallery
        </Button>
      </View>
    </Dialog>
  </Portal>
  //   onPress={() => props.setDialogState(false)}
);

export default ImageUploadDialog;
