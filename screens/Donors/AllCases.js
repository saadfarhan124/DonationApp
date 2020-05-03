import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  ActivityIndicator,
} from "react-native";
import CaseCard from "../shared/components/CaseCard";
import { GREEN } from "../../colors";

import Firebase from "../../Firebase";

const Dashboard = (props) => {
  const [cases, setCases] = useState([]);
  const [noCasesText, setNoCasesText] = useState(false);

  const [loaderVisible, setLoaderVisible] = useState(false);

  const getCases = async () => {
    setLoaderVisible(true);
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
      setCases(casesArray);
    }
    setLoaderVisible(false);
  };

  const donate = (id) => {
    // console.log(cases.find((c) => c.key === id));
    props.navigation.navigate(
      "Donate Case",
      cases.find((c) => c.key === id)
    );
  };

  useEffect(() => {
    props.navigation.addListener("focus", async () => {
      await getCases();
    });
  }, []);
  return (
    <View style={styles.container}>
      {noCasesText && (
        <View style={styles.center}>
          <Text style={{ fontSize: 20 }}>No active cases</Text>
        </View>
      )}
      <View style={styles.loader}>
        <ActivityIndicator
          animating={loaderVisible}
          size="large"
          color={GREEN}
        />
      </View>
      <FlatList
        data={cases}
        renderItem={({ item }) => (
          <CaseCard
            name={item.name}
            description={item.description}
            fullfilledAmount={item.fullfilledAmount}
            requiredAmount={item.requiredAmount}
            status={item.caseStatus}
            buttonText="Donate"
            id={item.key}
            onClick={donate}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flex: 1,
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
    top: "50%",
    left: 0,
    right: 0,
  },
});

export default Dashboard;
