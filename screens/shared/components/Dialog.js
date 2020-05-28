import React from "react";
import { Portal, Dialog, Button, Paragraph } from "react-native-paper";
import { GREEN } from "../../../colors";

const CustomDialog = (props) => (
  <Portal>
    <Dialog visible={props.dialogState} onDismiss={() => console.log("")}>
      <Dialog.Title>Donation App</Dialog.Title>
      <Dialog.Content>
        <Paragraph>{props.message}</Paragraph>
      </Dialog.Content>
      <Dialog.Actions>
        <Button color={GREEN} onPress={props.onYes.bind(this)}>
          Yes
        </Button>
        <Button color={GREEN} onPress={() => props.setDialogState(false)}>
          No
        </Button>
      </Dialog.Actions>
    </Dialog>
  </Portal>
);

export default CustomDialog;
