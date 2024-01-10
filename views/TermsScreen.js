import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import {
  initializeDefinitions,
  getDefinitionArray,
} from "../Models/DefinitionArray";
import CardFlip from "../components/TermCard";

const TermsScreen = () => {
  const [definitions, setDefinitions] = useState([]);

  useEffect(() => {
    initializeDefinitions();
    setDefinitions(getDefinitionArray());
  }, []);

  return (
    <ScrollView horizontal={true}>
      {definitions.map((definitionModel, index) => (
        <TouchableOpacity key={index} onPress={() => handleFlip(index)}>
          <CardFlip
            term={definitionModel.word}
            definition={definitionModel.definition}
          />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default TermsScreen;
