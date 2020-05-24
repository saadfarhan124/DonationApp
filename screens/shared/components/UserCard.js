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
      alignItems: "stretch",
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
      backgroundColor: props.isActiveHelper ? GREEN : "white",
      borderRadius: 400 / 2,
      marginHorizontal: 3,
    },
  });
  return (
    <View style={styles.container}>
      <Card>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Card.Title left={LeftContent} />
          <Card.Content>
            <View style={styles.info}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Title style={{ fontSize: 14 }}>{props.username}</Title>
                  <Divider style={{ backgroundColor: GREEN }} />
                </View>
                <View
                  style={{
                    flex: 1,
                    marginLeft: "45%",
                    flexDirection: "row",
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
                      style={styles.badge}
                    />
                  </TouchableOpacity>

                  {/* Trusted Helper Request */}
                  <TouchableOpacity
                    onPress={props.setTrustedHelper.bind(this, props.id)}
                  >
                    <Image
                      source={require("../../../assets/icons/request-mini.png")}
                      style={styles.badge}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.userInfo}>
                <Avatar.Icon
                  style={styles.icon}
                  size={20}
                  icon="email"
                  color={GREEN}
                />
                <Paragraph style={{ fontSize: 12 }}>{props.email}</Paragraph>
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
            <Button color={GREEN}>View Profile</Button>
          </View>
        </Card.Actions>
      </Card>
    </View>
  );
};

export default UserCard;
