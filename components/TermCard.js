import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Checkbox from "expo-checkbox";

const CardFlip = ({ term, definition }) => {
  const [isFlipped, setFlipped] = useState(false);
  const flipAnimation = new Animated.Value(0);

  const handleFlip = () => {
    Animated.timing(flipAnimation, {
      toValue: isFlipped ? 0 : 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    setFlipped(!isFlipped);
  };

  const frontInterpolate = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }],
  };

  const screenWidth = Dimensions.get("window").width;
  const cardWidth = screenWidth - 100;

  const [isChecked, setIsChecked] = useState(false);

  return (
    <View style={styles.centerContainer}>
      <TouchableOpacity style={styles.cardContainer} onPress={handleFlip}>
        <Animated.View
          style={[styles.card, { width: cardWidth }, frontAnimatedStyle]}
        >
          <View style={styles.cardInnerContainer}>
            <Text style={styles.text}>{isFlipped ? term : definition}</Text>
            <Checkbox value={isChecked} onValueChange={setIsChecked} />
          </View>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "auto",
    height: 300,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    backfaceVisibility: "hidden",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    margin: 10,
  },
  cardContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cardInnerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "300",
    padding: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CardFlip;
