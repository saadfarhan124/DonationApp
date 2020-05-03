import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { GREEN } from "../../../colors";
import { Avatar, Card, Subheading, Button, Text } from "react-native-paper";

const Dashboard = (props) => {
  return (
    <View style={styles.donationDashboard}>
      <Card style={{ width: 1200 }}>
        <Card.Title
          title={props.title}
          left={(props) => (
            <Avatar.Icon
              {...props}
              icon="folder"
              color="#ffffff"
              style={{ backgroundColor: GREEN }}
            />
          )}
        />
        <Card.Content>
          {props.type === "case" && (
            <View style={{ marginLeft: "3%" }}>
              <View style={[styles.flexDirectionRow]}>
                <View style={{ height: "auto", width: "15%" }}>
                  <Subheading style={styles.boldFont}>Total Cases: </Subheading>
                  <Subheading style={styles.boldFont}>
                    Total Active Cases:
                  </Subheading>
                  <Subheading style={styles.boldFont}>
                    Total Inactive Cases:
                  </Subheading>
                </View>
                <View style={{ height: "50%", width: "50%" }}>
                  <Subheading>{props.totalCases}</Subheading>
                  <Subheading>{props.totalActiveCases}</Subheading>
                  <Subheading>{props.totalInactiveCases}</Subheading>
                </View>
              </View>
            </View>
          )}
          {props.type === "donation" && (
            <View style={{ marginLeft: "3%" }}>
              <View style={[styles.flexDirectionRow]}>
                <View style={{ height: "auto", width: "15%" }}>
                  <Subheading style={styles.boldFont}>
                    Total Amount Donated:
                  </Subheading>
                  <Subheading style={styles.boldFont}>
                    Total Cases Donated:
                  </Subheading>
                </View>
                <View style={{}}>
                  <Subheading>{props.totalDonationMade}</Subheading>
                  <Subheading>{props.totalCasesDonatedTo}</Subheading>
                </View>
              </View>
            </View>
          )}
        </Card.Content>
        <Card.Actions>
          <View style={{ position: "relative", right: -100 }}>
            {props.navigation && (
              <Button
                color={GREEN}
                onPress={() => {
                  props.navigation.navigate("Total Cases");
                }}
              >
                Details
              </Button>
            )}
          </View>
        </Card.Actions>
      </Card>
    </View>
  );
};
const styles = StyleSheet.create({
  flexDirectionRow: {
    flexDirection: "row",
  },
  boldFont: {
    fontWeight: "bold",
  },
  btnDetails: {
    position: "absolute",
    right: 0,
    paddingBottom: 20,
  },
  donationDashboard: {
    paddingTop: "2%",
    flex: 1,
  },
});
export default Dashboard;
