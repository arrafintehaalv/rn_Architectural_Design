import React from "react";
import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    }
});
  

const ScreenContainer = ({ children }) => (
    <View style={styles.container}>{children}</View>
);

export default SplashScreen = () => (
    <ScreenContainer>
      <Text>Loading...</Text>
    </ScreenContainer>
  );