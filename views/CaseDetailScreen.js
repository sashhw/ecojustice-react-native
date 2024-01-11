import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import app from "../FirebaseApp";

const firestore = getFirestore(app);

const CaseDetailsScreen = ({ caseData }) => {
  const [singleCase, setCase] = useState("");

  const addCase = async () => {
    try {
      const docRef = await addDoc(collection(firestore, "cases"), {
        name: "This is a test",
        year: 2024,
        location: "Chicago, IL",
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          placeholder="Add name"
          onChangeText={(text) => setCase(text)}
          value={singleCase}
        />
        <Button onPress={addCase} title="Add Case"></Button>
      </View>
    </View>
  );
};

export default CaseDetailsScreen;

const styles = StyleSheet.create({
  container: {},
});
