import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar, TextInput, Button, Card } from "react-native-paper";
import { GRAY, GREEN } from "../../colors";

const Login = () => {
  return (
    <View style={{ marginTop: 60, marginHorizontal: 20 }}>
      <Card>
        <Card.Content>
          <View style={{ paddingLeft: "37%" }}>
            <Avatar.Image
              size={84}
              source={{
                uri:
                  "https://buzzwonder.com/wp-content/uploads/2020/04/2020-02-21.jpg",
              }}
            />
          </View>
          <View
            style={{
              marginVertical: 50,
              paddingHorizontal: 30,
            }}
          >
            <TextInput
              keyboardType="email-address"
              label="Email"
              mode="outlined"
              dense={true}
              theme={{
                colors: {
                  placeholder: GRAY,
                  text: "black",
                  primary: GREEN,
                  background: "#ffffff",
                },
              }}
            />
            <TextInput
              keyboardType="default"
              label="Password"
              mode="outlined"
              dense={true}
              theme={{
                colors: {
                  placeholder: GRAY,
                  text: "black",
                  primary: GREEN,
                  background: "#ffffff",
                },
              }}
              secureTextEntry={true}
            />
            <View style={{ paddingTop: 20 }}>
              <Button color={GREEN}>
                <Text style={{ fontSize: 19 }}>Login</Text>
              </Button>
            </View>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    paddingTop: "30%",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

export default Login;
