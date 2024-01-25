import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Modal,
  Button,
  TouchableOpacity,
} from "react-native";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import app from "../FirebaseApp";
import LightBackgroundButton from "../components/LightBackgroundButton";
import AddCaseModal from "./AddCaseModal";
import CaseDetailsModal from "./CaseDetailsModal";

const firestore = getFirestore(app);
const ListItemSeparator = () => <View style={styles.separator} />;
const SeparatorAfterLastItem = () => <View style={styles.footerSeparator} />;

const CasesScreen = () => {
  const [cases, setCases] = useState([]);
  const [isAddCaseModalVisible, setAddCaseModalVisibility] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);

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

  const openAddCaseModal = () => {
    setAddCaseModalVisibility(true);
  };

  const openCaseDetailsModal = (item) => {
    setSelectedCase(item);
  };

  const closeCaseDetailsModal = () => {
    setSelectedCase(null);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cases}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => openCaseDetailsModal(item)}>
            <View style={styles.listItem}>
              <Text
                style={styles.nameText}
                numberOfLines={1}
                ellipsizeMode="tail"
              >{`${item.name}`}</Text>
            </View>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={ListItemSeparator}
        ListFooterComponent={() => (
          <View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={isAddCaseModalVisible}
              onRequestClose={() => setAddCaseModalVisibility(false)}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <AddCaseModal
                    onCaseAdded={() => {
                      setAddCaseModalVisibility(false);
                    }}
                  />
                  <Button
                    title="Close"
                    onPress={() => setAddCaseModalVisibility(false)}
                  />
                </View>
              </View>
            </Modal>
            <CaseDetailsModal
              selectedCase={selectedCase}
              onClose={closeCaseDetailsModal}
            />
          </View>
        )}
        ListFooterComponentStyle={styles.footer}
      />
      <SeparatorAfterLastItem />
      <LightBackgroundButton
        title="Add Case"
        onPress={() => openAddCaseModal()}
        style={styles.addCaseButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
  },
  separator: {
    height: 1,
    backgroundColor: "gray",
  },
  footerSeparator: {
    height: 1,
    backgroundColor: "gray",
    opacity: 0.2,
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
  nameText: {
    fontWeight: "300",
    fontSize: 16,
    marginHorizontal: 10,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  addCaseButton: {
    width: 100,
    marginBottom: 20,
    alignSelf: "center",
  },
});

export default CasesScreen;
