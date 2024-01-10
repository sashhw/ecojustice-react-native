import React from "react";
import { View, Text, Button } from "react-native";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import app from "../FirebaseApp";

const firestore = getFirestore(app);

const CasesScreen = () => {
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
    <View>
      <Text>Cases</Text>
      <Button title="Add Case" onPress={() => addCase()} />
    </View>
  );
};

export default CasesScreen;
