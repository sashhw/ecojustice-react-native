import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import MainButton from "../components/MainButton";
import InfoScreen from "./InfoScreen";
import TermsScreen from "./TermsScreen";
import CasesScreen from "./CasesScreen";
import MapScreen from "./MapScreen";

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../assets/dam.png")}
      style={[styles.backgroundImage]}
      imageStyle={{ opacity: 0.3 }}
    >
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>EcoJustice</Text>
          </View>
          <View style={styles.buttonContainer}>
            <MainButton
              onPress={() => navigation.navigate("Info")}
              title="Info"
            />
            <MainButton
              onPress={() => navigation.navigate("Terms")}
              title="Terms"
            />
            <MainButton
              onPress={() => navigation.navigate("Cases")}
              title="Cases"
            />
            <MainButton
              onPress={() => navigation.navigate("Map")}
              title="Map"
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Info" component={InfoScreen} />
        <Stack.Screen name="Terms" component={TermsScreen} />
        <Stack.Screen name="Cases" component={CasesScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    paddingVertical: 20,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 30,
    color: "black",
    backgroundColor: "white",
    opacity: 0.5,
    padding: 20,
  },
  textContainer: {
    marginBottom: 30,
    borderRadius: 10,
    overflow: "hidden",
  },
  buttonContainer: {},
});
