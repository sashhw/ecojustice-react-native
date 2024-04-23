import React from "react";
import { View, Text, Modal, Button, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const CaseDetailsModal = ({ selectedCase, onClose }) => {
  if (!selectedCase) {
    return null;
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={!!selectedCase}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.modalContent}>
            <Text style={styles.titleFont}>{selectedCase.name}</Text>
            <Text style={styles.bodyFont}>{selectedCase.body}</Text>
            <Text>{selectedCase.year}</Text>
            <Button title="Close" onPress={onClose} />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
    paddingHorizontal: 30,
    paddingVertical: 100,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  titleFont: {
    fontSize: 20,
    marginBottom: 12,
    fontWeight: "500",
  },
  scrollView: {
    flex: 1,
  },
  bodyFont: {
    fontSize: 16,
  },
});

export default CaseDetailsModal;
