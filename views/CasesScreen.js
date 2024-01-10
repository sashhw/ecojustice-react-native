import React, { useEffect, useState } from "react";
import { View, Text, Button, ScrollView } from "react-native";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import app from "../FirebaseApp";

const firestore = getFirestore(app);

const CasesScreen = () => {
  const [cases, setCases] = useState([]);
  useEffect(() => {
    const fetchCases = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "cases"));
        const casesData = [];
        querySnapshot.forEach((doc) => {
          casesData.push({ id: doc.id, ...doc.data() });
        });
        setCases(casesData);
      } catch (error) {
        console.Console.error("Error fetching documents: ", error);
      }
    };
    fetchCases();
  }, []);

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
    <ScrollView>
      <View>
        <Text> Existing Cases: </Text>
        {cases.map((c) => (
          <Text
            key={c.id}
          >{`Name: ${c.name}, Year: ${c.year}, Location: ${c.location}`}</Text>
        ))}
        <Button title="Add Case" onPress={() => addCase()} />
      </View>
    </ScrollView>
  );
};

export default CasesScreen;
