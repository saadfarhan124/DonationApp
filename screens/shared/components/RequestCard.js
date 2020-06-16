import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import {
  Avatar,
  Button,
  Card,
  TouchableRipple,
  Paragraph,
  Divider,
  Title,
} from "react-native-paper";
import { GREEN } from "../../../colors";

const LeftContent = (props) => (
  <Avatar.Image
    style={{ alignSelf: "baseline" }}
    size={55}
    source={{
      uri: global.user.photoURL,
    }}
  />
);

const RequestCard = (props) => {
  const styles = StyleSheet.create({
    container: {
      margin: 10,
    },
    info: {
      marginTop: 8,
    },
    userInfo: {
      flexDirection: "row",
      alignItems: "center",
    },
    icon: {
      backgroundColor: "white",
      alignItems: "flex-start",
    },
    badge: {
      height: 35,
      width: 35,
      borderRadius: 400 / 2,
      marginHorizontal: 3,
    },
    activeHelperBadge: {
      backgroundColor: props.isActiveHelper ? GREEN : "white",
    },
    trustedHelperBadge: {
      backgroundColor: props.isTrustedHelper ? GREEN : "white",
    },
  });
  return (
    <View style={styles.container}>
      <Card>
        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
          }}
        >
          <Card.Content style={{ flex: 1, marginVertical: 15 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Title style={{ marginHorizontal: 25, fontSize: 14 }}>
                  Status : {props.status}
                </Title>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Title style={{ marginHorizontal: 25, fontSize: 14 }}>
                  Type : {props.type}
                </Title>
              </View>
            </View>
          </Card.Content>
        </View>
        <Card.Actions>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
            }}
          >
            <Button
              onPress={props.onClick.bind(this, {
                id: props.id,
                type: props.type,
              })}
              mode="outlined"
              color={GREEN}
            >
              Details
            </Button>
          </View>
        </Card.Actions>
      </Card>
    </View>
  );
};

export default RequestCard;
