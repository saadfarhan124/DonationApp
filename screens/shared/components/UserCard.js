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

const UserCard = (props) => {
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
                <Avatar.Image
                  style={{ alignSelf: "baseline" }}
                  size={55}
                  source={{
                    uri: global.user.photoURL,
                  }}
                />
              </View>
              <View>
                <Title style={{ marginHorizontal: 25, fontSize: 14 }}>
                  {props.username}
                </Title>
                <Divider
                  style={{ backgroundColor: GREEN, marginHorizontal: 25 }}
                />
                <View style={{ flexDirection: "row", marginHorizontal: 25 }}>
                  <Avatar.Icon
                    style={styles.icon}
                    size={20}
                    icon="email"
                    color={GREEN}
                  />
                  <Paragraph style={{ fontSize: 12 }}>{props.email}</Paragraph>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  justifyContent: "flex-end",
                }}
              >
                {/* Active Helper Request */}
                <TouchableOpacity
                  onPress={props.onActiveHelper.bind(this, {
                    id: props.id,
                    isActive: props.isActiveHelper,
                  })}
                >
                  <Image
                    source={require("../../../assets/icons/become-helper-mini.png")}
                    style={[styles.badge, styles.activeHelperBadge]}
                  />
                </TouchableOpacity>

                {/* Trusted Helper Request */}
                <TouchableOpacity
                  onPress={props.onTrustedHelper.bind(this, {
                    id: props.id,
                    isTrusted: props.isTrustedHelper,
                  })}
                >
                  <Image
                    source={require("../../../assets/icons/request-mini.png")}
                    style={[styles.badge, styles.trustedHelperBadge]}
                  />
                </TouchableOpacity>
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
            <Button mode="outlined" color={GREEN}>
              View Profile
            </Button>
          </View>
        </Card.Actions>
      </Card>
    </View>
  );
};

export default UserCard;
