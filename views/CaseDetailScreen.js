import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import app from "../FirebaseApp";

const firestore = getFirestore(app);

const CaseDetailsScreen = ({ onCaseAdded }) => {
  const [caseName, setCaseName] = useState("");
  const [location, setLocation] = useState("");
  const [year, setYear] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");

  const addCase = async () => {
    try {
      const docRef = await addDoc(collection(firestore, "cases"), {
        name: caseName,
        year: year,
        location: location,
        body: body,
        image: image,
      });

      console.log("Document written with ID: ", docRef.id);

      if (onCaseAdded) {
        onCaseAdded();
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Add name"
        onChangeText={(text) => setCaseName(text)}
        value={caseName}
        multiline={true}
      />
      <TextInput
        style={styles.input}
        placeholder="Add location"
        onChangeText={(text) => setLocation(text)}
        value={location}
        multiline={true}
      />
      <TextInput
        style={styles.input}
        placeholder="Add year"
        onChangeText={(text) => setYear(text)}
        value={year}
        multiline={true}
      />
      <TextInput
        style={styles.input}
        placeholder="Add body"
        onChangeText={(text) => setBody(text)}
        value={body}
        multiline={true}
      />
      <TextInput
        style={styles.input}
        placeholder="Add image"
        onChangeText={(text) => setImage(text)}
        value={image}
        multiline={true}
      />
      <Button
        onPress={() => {
          addCase();
        }}
        title="Add Case"
        disabled={caseName === ""}
      />
    </View>
  );
};

export default CaseDetailsScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    margin: 20,
    paddingHorizontal: 60,
  },
  input: {
    width: "100%",
    maxWidth: 400,
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "white",
    marginBottom: 10,
  },
});
