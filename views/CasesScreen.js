import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Modal, Button } from "react-native";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import app from "../FirebaseApp";
import LightBackgroundButton from "../components/LightBackgroundButton";
import CaseDetailsScreen from "./CaseDetailScreen";

const firestore = getFirestore(app);

const CasesScreen = () => {
  const [cases, setCases] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [isCaseDetailScreenVisible, setCaseDetailScreenVisibility] =
    useState(false);

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
        console.error("Error fetching documents: ", error);
      }
    };
    fetchCases();
  }, []);

  const openModal = () => {
    setCaseDetailScreenVisibility(true);
  };

  return (
    <View>
      <FlatList
        data={cases}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => (
          <View>
            <Text>Existing Cases:</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <Text>{`Name: ${item.name}, Year: ${item.year}, Location: ${item.location}`}</Text>
        )}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 1,
              width: "100%",
              backgroundColor: "gray",
            }}
          />
        )}
        ListFooterComponent={() => (
          <View>
            <LightBackgroundButton
              title="Add Case"
              onPress={() => openModal()}
            />
            <Modal
              animationType="slide"
              transparent={true}
              visible={isCaseDetailScreenVisible}
              onRequestClose={() => setCaseDetailScreenVisibility(false)}
            >
              {/* Display the details view in the modal */}
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    padding: 20,
                    borderRadius: 10,
                  }}
                >
                  <CaseDetailsScreen caseData={selectedCase} />
                  <Button
                    title="Close"
                    onPress={() => setCaseDetailScreenVisibility(false)}
                  />
                </View>
              </View>
            </Modal>
          </View>
        )}
      />
    </View>
  );
};

export default CasesScreen;

const styles = StyleSheet.create({
  container: {},
});
