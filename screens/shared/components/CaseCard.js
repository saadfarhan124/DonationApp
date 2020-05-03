import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Subheading,
  Paragraph,
  Divider,
} from "react-native-paper";
import { GREEN } from "../../../colors";

const CaseCard = (props) => {
  return (
    <View style={{ paddingTop: 10 }}>
      <Card>
        <Card.Title
          title={props.name}
          subtitle="Card Subtitle"
          left={(props) => <Avatar.Icon {...props} icon="folder" />}
          right={(rightProps) => (
            <View style={{ marginRight: 10, flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold" }}>Status: </Text>
              <Text>{props.status}</Text>
            </View>
          )}
        />
        <Card.Content>
          <Paragraph>{props.description}</Paragraph>
          <Divider style={{ margin: 20 }} />
          <View style={[styles.flexDirectionRow]}>
            <View style={{ width: "85%" }}>
              <Subheading style={styles.boldFont}>Required Amount: </Subheading>
              <Subheading style={styles.boldFont}>Collected Amount:</Subheading>
              <Subheading style={styles.boldFont}>Remaining Amount:</Subheading>
            </View>
            <View>
              <Subheading>{props.requiredAmount}</Subheading>
              <Subheading>{props.fullfilledAmount}</Subheading>
              <Subheading>
                {props.requiredAmount - props.fullfilledAmount}
              </Subheading>
            </View>
          </View>
        </Card.Content>

        <Card.Actions>
          <View
            style={{
              alignContent: "center",
              justifyContent: "center",
              flex: 1,
              paddingTop: 10,
            }}
          >
            <Button
              color={GREEN}
              onPress={
                props.onClick ? props.onClick.bind(this, props.id) : null
              }
            >
              {props.buttonText ? props.buttonText : "Details"}
            </Button>
          </View>
        </Card.Actions>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  boldFont: {
    fontWeight: "bold",
  },
  flexDirectionRow: {
    flexDirection: "row",
  },
});

export default CaseCard;
