import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  Avatar,
  Button,
  Card,
  IconButton,
  Paragraph,
} from "react-native-paper";
import { GREEN } from "../../../colors";

const CaseCard = (props) => {
  return (
    <View>
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

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingTop: 10,
            }}
          >
            <Text style={styles.boldFont}>Amount Required</Text>
            <Text style={styles.boldFont}>Amount Collected</Text>
            <Text style={styles.boldFont}>Amount Remaining</Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text>{props.requiredAmount}</Text>
            <Text>{props.fullfilledAmount}</Text>
            <Text>{props.requiredAmount - props.fullfilledAmount}</Text>
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
});

export default CaseCard;
