import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Subheading,
  Paragraph,
  FAB,
} from "react-native-paper";
import { GREEN } from "../../../colors";
import foodIcon from "../../../assets/icons/cake-pop.png";
import envIcon from "../../../assets/icons/energy.png";
import eduIcon from "../../../assets/icons/mortarboard.png";
import amountRequiredIcon from "../../../assets/icons/request-mini.png";
import amountFullfilled from "../../../assets/icons/fulfill-mini.png";
import donate from "../../../assets/icons/Donate.png";

const CaseCard = (props) => {
  return (
    <View style={{ paddingTop: 10 }}>
      <Card>
        <Card.Title
          title={props.name}
          left={(leftProps) => {
            if (props.type === "Education") {
              return (
                <Image
                  style={{ width: 45, height: 45 }}
                  source={eduIcon}
                  resizeMethod="resize"
                />
              );
            } else if (props.type === "Food") {
              return (
                <Image
                  style={{ width: 45, height: 45 }}
                  source={foodIcon}
                  resizeMethod="resize"
                />
              );
            } else if (props.type == "Environment") {
              return (
                <Image
                  style={{ width: 45, height: 45 }}
                  source={envIcon}
                  resizeMethod="resize"
                />
              );
            } else {
              return (
                <Image
                  style={{ width: 45, height: 45 }}
                  source={foodIcon}
                  resizeMethod="resize"
                />
              );
            }
          }}
          // right={(rightProps) => (
          //   <View style={{ marginRight: 10, flexDirection: "row" }}>
          //     <Text style={{ fontWeight: "bold" }}>Status: </Text>
          //     <Text>{props.status}</Text>
          //   </View>
          // )}
        />
        <Card.Content>
          <Paragraph>{props.description}</Paragraph>

          <View style={[styles.flexDirectionRow]}>
            <View
              style={{ justifyContent: "space-between", marginHorizontal: 20 }}
            >
              <Image
                style={{ width: 35, height: 35 }}
                source={amountRequiredIcon}
              />
              <Image
                style={{ width: 35, height: 35 }}
                source={amountFullfilled}
              />
            </View>
            <View
              style={{
                marginTop: 10,
                marginLeft: 5,
                justifyContent: "space-between",
              }}
            >
              <Paragraph style={{}}>Rs 50,000</Paragraph>
              <Paragraph style={{}}>Rs 50,000</Paragraph>
            </View>
            {/* <View style={{ flex: 1, alignItems: "flex-end" }}>
              <TouchableOpacity
                style={{
                  width: 100,
                  height: 100,
                  backgroundColor: "#fff",
                  borderRadius: 50,
                }}
              >
                <Image source={donate} style={{ width: 55, height: 55 }} />
              </TouchableOpacity>
            </View> */}
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
