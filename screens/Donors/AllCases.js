import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import CaseCard from "../shared/components/CaseCard";
import { GREEN } from "../../colors";
import { Button, Text, ActivityIndicator } from "react-native-paper";
import Firebase from "../../Firebase";

const Dashboard = (props) => {
  const [activeCases, setActiveCases] = useState([]);

  const [commitedCases, setCommitedCases] = useState([]);
  const [
    commitedCasesWithTransaction,
    setCommitedCasesWithTransaction,
  ] = useState([]);

  const [fulfilledCases, setFulfilledCases] = useState([]);
  const [
    fulfilledCasesWithTransaction,
    setFullfilledCasesWithTransaction,
  ] = useState([]);

  const [noCasesText, setNoCasesText] = useState(false);

  const [loaderVisible, setLoaderVisible] = useState(false);

  const [activeTab, setActiveTab] = useState("Active");

  const getActiveCases = async () => {
    setLoaderVisible(true);
    setCommitedCases([]);
    setFulfilledCases([]);
    const documents = await Firebase.firestore()
      .collection("cases")
      .where("caseStatus", "==", "active")
      .get();
    if (documents.size == 0) {
      setNoCasesText(true);
    } else {
      setNoCasesText(false);
      const casesArray = [];
      documents.forEach((docs) => {
        casesArray.push({
          ...docs.data(),
          key: docs.id,
        });
      });
      setActiveCases(casesArray);
    }
    setLoaderVisible(false);
  };

  const getCommitedCases = async () => {
    setLoaderVisible(true);
    setActiveCases([]);
    setFulfilledCases([]);
    const documents = await Firebase.firestore()
      .collection("transaction")
      .where("donorId", "==", global.user.uid)
      .where("status", "==", "commited")
      .get();
    if (documents.size == 0) {
      setNoCasesText(true);
    } else {
      setNoCasesText(false);
      const casesArray = [];
      const casesArrayWithTransaction = [];
      await Promise.all(
        documents.docs.map(async (item) => {
          const cases = await getCaseById(item.data().caseId);
          casesArray.push({
            ...cases.data(),
            key: cases.id,
          });
          casesArrayWithTransaction.push({
            ...cases.data(),
            caseId: cases.id,
            transactionData: item.data(),
            transationId: item.id,
          });
        })
      );
      setCommitedCases(casesArray);
      setCommitedCasesWithTransaction(casesArrayWithTransaction);
    }
    setLoaderVisible(false);
  };

  const getCaseById = async (id) => {
    return await Firebase.firestore().collection("cases").doc(id).get();
  };

  const getFulfilledCases = async () => {
    setActiveCases([]);
    setCommitedCases([]);
    const documents = await Firebase.firestore()
      .collection("transaction")
      .where("donorId", "==", global.user.uid)
      .where("status", "==", "fulfilled")
      .get();
    if (documents.size == 0) {
      setNoCasesText(true);
    } else {
      setLoaderVisible(true);
      setNoCasesText(false);
      const casesArray = [];
      const casesArrayWithTransaction = [];

      await Promise.all(
        documents.docs.map(async (item) => {
          const cases = await getCaseById(item.data().caseId);
          casesArray.push({
            ...cases.data(),
            key: cases.id,
          });
          casesArrayWithTransaction.push({
            ...cases.data(),
            caseId: cases.id,
            transactionData: item.data(),
            transationId: item.id,
          });
        })
      );
      setFulfilledCases(casesArray);
      setFullfilledCasesWithTransaction(casesArrayWithTransaction);
      setLoaderVisible(false);
    }
  };

  const donate = (id) => {
    // console.log(cases.find((c) => c.key === id));
    props.navigation.navigate(
      "Donate Case",
      activeCases.find((c) => c.key === id)
    );
  };

  const commitedDetails = (id) => {
    props.navigation.navigate(
      "Commitment Details",
      commitedCasesWithTransaction.find((c) => c.key === id)
    );
  };

  const fullfilledDetails = (id) => {
    props.navigation.navigate(
      "Fullfiled Details",
      fulfilledCasesWithTransaction.find((c) => c.key === id)
    );
  };

  useEffect(() => {
    props.navigation.addListener("focus", async () => {
      await getActiveCases();
    });

    return () => {
      setActiveCases([]);
      setNoCasesText(false);
      setLoaderVisible(false);
    };
  }, []);
  return (
    <View>
      <View style={styles.loader}>
        <ActivityIndicator
          animating={loaderVisible}
          size="large"
          color={GREEN}
        />
      </View>
      <View style={{ flexDirection: "row" }}>
        <Button
          color={GREEN}
          style={{ flex: 1, borderRadius: 0 }}
          mode={activeTab == "Active" ? "contained" : "outlined"}
          onPress={async () => {
            setActiveTab("Active");
            await getActiveCases();
          }}
        >
          Active
        </Button>
        <Button
          color={GREEN}
          style={{ flex: 1, borderRadius: 0 }}
          mode={activeTab == "Commited" ? "contained" : "outlined"}
          onPress={async () => {
            setActiveTab("Commited");
            await getCommitedCases();
          }}
        >
          Commited
        </Button>
        <Button
          color={GREEN}
          style={{ flex: 1, borderRadius: 0 }}
          mode={activeTab == "Fulfilled" ? "contained" : "outlined"}
          onPress={async () => {
            setActiveTab("Fulfilled");
            getFulfilledCases();
          }}
        >
          Fulfilled
        </Button>
      </View>
      {noCasesText && (
        <View style={styles.center}>
          <Text style={{ fontSize: 20, marginTop: 120 }}>No active cases</Text>
        </View>
      )}
      <View style={styles.container}>
        <FlatList
          data={
            activeTab === "Active"
              ? activeCases
              : activeTab === "Commited"
              ? commitedCases
              : fulfilledCases
          }
          renderItem={({ item }) => (
            <CaseCard
              type={item.requestType}
              name={item.name}
              description={item.description}
              amountRequired={item.amountRequired}
              fulfilledAmount={item.fulfilledAmount}
              commitedAmount={item.commitedAmount}
              buttonText={activeTab == "Active" ? "Donate" : "Details"}
              id={item.key}
              onClick={
                activeTab == "Active"
                  ? donate
                  : activeTab === "Commited"
                  ? commitedDetails
                  : fullfilledDetails
              }
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    alignItems: "stretch",
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  loader: {
    elevation: 8,
    position: "absolute",
    top: 250,
    left: 0,
    right: 0,
  },
});

export default Dashboard;
