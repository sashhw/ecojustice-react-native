import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Modal,
  Button,
  Image,
} from "react-native";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import app from "../FirebaseApp";
import LightBackgroundButton from "../components/LightBackgroundButton";
import CaseDetailsScreen from "./CaseDetailScreen";

const firestore = getFirestore(app);
const ListItemSeparator = () => <View style={styles.listItemSeparator} />;

const CasesScreen = () => {
  const [cases, setCases] = useState([]);
  const [isCaseDetailScreenVisible, setCaseDetailScreenVisibility] =
    useState(false);
  const imageMap = {}; // Replace this with your logic to map item.id to image filenames

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firestore, "cases"),
      (querySnapshot) => {
        const casesData = [];
        querySnapshot.forEach((doc) => {
          casesData.push({ id: doc.id, ...doc.data() });
        });
        setCases(casesData);
      }
    );

    return () => unsubscribe();
  }, []);

  const openModal = () => {
    setCaseDetailScreenVisibility(true);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cases}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            {item.id in imageMap &&
              (() => {
                console.log(`asset:/assets/${imageMap[item.id]}`);
                return (
                  <Image
                    source={{ uri: `asset:/assets/${imageMap[item.id]}` }}
                    style={styles.thumbnail}
                  />
                );
              })()}

            <Text>{`${item.name}`}</Text>
          </View>
        )}
        ItemSeparatorComponent={ListItemSeparator}
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
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <CaseDetailsScreen
                    onCaseAdded={() => {
                      setCaseDetailScreenVisibility(false);
                    }}
                  />
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

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  listItemSeparator: {
    height: 1,
    width: "100%",
    backgroundColor: "gray",
    marginVertical: 10,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  thumbnail: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
});

export default CasesScreen;
