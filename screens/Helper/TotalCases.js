import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import CaseCard from "../shared/components/CaseCard";
import Firebase from "../../Firebase";
import { GREEN } from "../../colors";

const TotalCases = (props) => {
  const [cases, setCases] = useState([]);
  const [loaderVisible, setLoaderVisible] = useState(false);
  const getCases = async () => {
    setLoaderVisible(true);
    setCases([]);
    const documents = await Firebase.firestore()
      .collection("cases")
      .where("userId", "==", global.user.uid)
      .get();
    const casesArray = [];
    documents.forEach((docs) => {
      casesArray.push({
        ...docs.data(),
        key: docs.id,
      });
    });
    setCases(casesArray);
    setLoaderVisible(false);
  };

  useEffect(() => {
    async function test() {
      await getCases();
    }
    test();
    props.navigation.addListener("focus", async () => {});
  }, []);

  const detailScreen = (id) => {
    props.navigation.navigate(
      "Case Detail",
      cases.find((c) => c.key === id)
    );
  };

  return (
    <View style={styles.container}>
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
            type={item.requestType}
            commitedAmount={item.commitedAmount}
            amountRequired={item.amountRequired}
            status={item.caseStatus}
            utilizedAmount={item.utilizedAmount}
            id={item.key}
            onClick={detailScreen}
            navigation={props.navigation}
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
  loader: {
    elevation: 8,
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
  },
});
export default TotalCases;
