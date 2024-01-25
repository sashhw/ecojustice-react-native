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
const FooterSeparator = () => <View style={styles.footerSeparator} />;

const CasesScreen = () => {
  const [cases, setCases] = useState([]);
  const [isAddCaseModalVisible, setAddCaseModalVisibility] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);
  const [isCaseDetailsModalVisible, setCaseDetailsModalVisibility] =
    useState(false);

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
    setCaseDetailsModalVisibility(true);
  };

  const closeCaseDetailsModal = () => {
    setSelectedCase(null);
    setCaseDetailsModalVisibility(false);
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
        ItemSeparatorComponent={({ highlighted }) => (
          <View
            style={[styles.separator, highlighted && { marginVertical: 10 }]}
          />
        )}
        ListFooterComponent={ListItemSeparator}
      />
      <FooterSeparator style={styles.footerSeparator} />
      <LightBackgroundButton
        title="Add Case"
        onPress={() => openAddCaseModal()}
        style={styles.addCaseButton}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={isAddCaseModalVisible}
        onRequestClose={() => setAddCaseModalVisibility(false)}
      ></Modal>
      <CaseDetailsModal
        selectedCase={selectedCase}
        onClose={closeCaseDetailsModal}
        visible={isCaseDetailsModalVisible}
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
    opacity: 0.5,
  },
  footerSeparator: {
    height: 1,
    backgroundColor: "gray",
    opacity: 0.1,
  },
  nameText: {
    fontWeight: "300",
    fontSize: 16,
    marginHorizontal: 10,
  },
  addCaseButton: {
    width: 100,
    marginBottom: 20,
    alignSelf: "center",
  },
});

export default CasesScreen;
