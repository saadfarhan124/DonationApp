import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import CaseCard from "../shared/components/CaseCard";
import Firebase from "../../Firebase";

const TotalCases = () => {
  const [cases, setCases] = useState([]);
  const getCases = async () => {
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
  };

  useEffect(() => {
    getCases();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={cases}
        renderItem={({ item }) => (
          <CaseCard
            name={item.name}
            description={item.description}
            fullfilledAmount={item.fullfilledAmount}
            requiredAmount={item.requiredAmount}
            status={item.caseStatus}
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
});
export default TotalCases;
