import React from "react";
import { View, Text, Modal, Button, StyleSheet } from "react-native";

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
        <View style={styles.modalContent}>
          <Text>{selectedCase.name}</Text>
          <Text>{selectedCase.body}</Text>
          <Text>{selectedCase.year}</Text>
          <Button title="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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

export default CaseDetailsModal;
