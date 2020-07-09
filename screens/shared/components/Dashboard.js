import React, { useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import { GREEN } from "../../../colors";
import {
  Avatar,
  Card,
  Subheading,
  Button,
  Text,
  Title,
  Paragraph,
} from "react-native-paper";

//Pictures
import CaseRequest from "../../../assets/icons/CaseRequest.png";
import Donate from "../../../assets/icons/Donate.png";
import medicalmini from "../../../assets/icons/medical-mini.png";
import committed from "../../../assets/icons/committed.png";

import requestmini from "../../../assets/icons/request-mini.png";
import fulfillmini from "../../../assets/icons/fulfill-mini.png";
import Distributed from "../../../assets/icons/Distributed.png";

import coinpile from "../../../assets/icons/coin-pile.png";

const Dashboard = (props) => {
  useEffect(() => {}, []);
  return (
    <View style={styles.donationDashboard}>
      <Card style={{ width: 1200, backgroundColor: "#cbf1dfff" }}>
        {props.type === "donation" ? (
          <Card.Title
            title={props.title}
            left={(props) => (
              <Avatar.Image
                size={40}
                source={Donate}
                style={{ backgroundColor: GREEN }}
              />
            )}
          />
        ) : props.type === "case" ? (
          <Card.Title
            title={props.title}
            left={(props) => (
              <Avatar.Image
                size={40}
                source={CaseRequest}
                style={{ backgroundColor: GREEN }}
              />
            )}
          />
        ) : (
          <Card.Title
            title={props.title}
            left={(props) => (
              <Avatar.Image
                size={40}
                source={CaseRequest}
                style={{ backgroundColor: GREEN }}
              />
            )}
          />
        )}

        <Card.Content>
          {props.type === "case" && (
            // <View style={{ marginLeft: "3%" }}>
            //   <View style={[styles.flexDirectionRow]}>
            //     <View style={{ height: "auto", width: "15%" }}>
            //       <Subheading style={styles.boldFont}>Total Cases: </Subheading>
            //       <Subheading style={styles.boldFont}>
            //         Total Active Cases:
            //       </Subheading>
            //       <Subheading style={styles.boldFont}>
            //         Total Inactive Cases:
            //       </Subheading>
            //     </View>
            //     <View style={{ height: "50%", width: "50%" }}>
            //       <Subheading>{props.totalCases}</Subheading>
            //       <Subheading>{props.totalActiveCases}</Subheading>
            //       <Subheading>{props.totalInactiveCases}</Subheading>
            //     </View>
            //   </View>
            // </View>
            <View style={{}}>
              <View style={[styles.flexDirectionRow]}>
                <View>
                  <Image
                    style={{ width: 45, height: 45 }}
                    source={medicalmini}
                  />
                  <Image style={{ width: 45, height: 45 }} source={coinpile} />
                </View>
                <View style={{ marginLeft: 15 }}>
                  <Title>{props.totalCases}</Title>
                  <Paragraph>Open Cases</Paragraph>
                  <Title>RS {props.totalFundsCollected}</Title>
                  <Paragraph>Funds</Paragraph>
                </View>

                <View style={{ marginLeft: 35, flexDirection: "row" }}>
                  <View style={{ justifyContent: "space-between" }}>
                    <Image
                      style={{ width: 35, height: 35 }}
                      source={committed}
                    />
                    <Image
                      style={{ width: 35, height: 35 }}
                      source={fulfillmini}
                    />
                    <Image
                      style={{ width: 35, height: 35 }}
                      source={Distributed}
                    />
                  </View>
                  <View
                    style={{
                      marginTop: 10,
                      marginLeft: 5,
                      justifyContent: "space-between",
                    }}
                  >
                    <Paragraph style={{}}>
                      Rs {props.totalAmountCommitedCases}
                    </Paragraph>
                    <Paragraph style={{}}>
                      Rs {props.totalAmountFullfilledCases}
                    </Paragraph>
                    <Paragraph style={{}}>
                      Rs {props.totalAmountFullfilledCases}
                    </Paragraph>
                  </View>
                </View>
              </View>
            </View>
          )}
          {props.type === "donation" && (
            <View style={{}}>
              <View style={[styles.flexDirectionRow]}>
                <View>
                  <Image
                    style={{ width: 45, height: 45 }}
                    source={medicalmini}
                  />
                  <Image style={{ width: 45, height: 45 }} source={committed} />
                </View>
                <View style={{ marginLeft: 15 }}>
                  <Title>{props.totalCasesDonatedTo}</Title>
                  <Paragraph>Open Cases</Paragraph>
                  <Title>RS {props.totalAmountCommited}</Title>
                  <Paragraph>Commited</Paragraph>
                </View>

                <View style={{ marginLeft: 35, flexDirection: "row" }}>
                  <View style={{ justifyContent: "space-between" }}>
                    <Image
                      style={{ width: 35, height: 35 }}
                      source={requestmini}
                    />
                    {/* <Image
                      style={{ width: 35, height: 35 }}
                      source={fulfillmini}
                    /> */}
                    <Image
                      style={{ width: 35, height: 35 }}
                      source={Distributed}
                    />
                  </View>
                  <View
                    style={{
                      marginTop: 10,
                      marginLeft: 5,
                      justifyContent: "space-between",
                    }}
                  >
                    <Paragraph style={{}}>
                      Rs {props.totalAmountDonated}
                    </Paragraph>
                    {/* <Paragraph style={{}}>
                      Rs {props.totalAmountCommited}
                    </Paragraph> */}
                    <Paragraph style={{}}>
                      Rs {props.totalAmountFullfilled}
                    </Paragraph>
                  </View>
                </View>

                {/* <View style={{ height: "auto", width: "15%" }}>
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
                </View> */}
              </View>
            </View>
          )}
          {props.type === null && (
            <View style={{ marginLeft: "3%" }}>
              <View style={[styles.flexDirectionRow]}>
                <View style={{ height: "auto" }}>
                  <Subheading style={styles.boldFont}>
                    Case Requests:
                  </Subheading>
                  <Subheading style={styles.boldFont}>
                    Active Helper Requests:
                  </Subheading>
                  <Subheading style={styles.boldFont}>
                    Donation Requests:
                  </Subheading>
                </View>
                <View style={{ marginLeft: 15 }}>
                  <Subheading>{props.totalCases}</Subheading>
                  <Subheading>{props.totalHelper}</Subheading>
                  <Subheading>{props.totalDonation}</Subheading>
                </View>
              </View>
            </View>
          )}
        </Card.Content>
        <Card.Actions>
          <View style={{ position: "relative", right: -100 }}>
            {props.navigation && props.type == "case" && (
              <Button
                color={GREEN}
                onPress={() => {
                  props.navigation.navigate("Total Cases");
                }}
              >
                Details
              </Button>
            )}
            {props.navigation && props.type == "donation" && (
              <Button
                color={GREEN}
                onPress={() => {
                  props.navigation.navigate("Total Cases");
                }}
              >
                Details
              </Button>
            )}
            {props.navigation && props.type == null && (
              <Button
                color={GREEN}
                onPress={() => {
                  props.navigation.navigate("All Requests");
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
    flex: 1,
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
    paddingTop: "1%",
  },
  iconStyle: {
    marginTop: 5,
    backgroundColor: GREEN,
  },
});
export default Dashboard;
