import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { AuthContext } from "../Context/context";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    loginButton: {
        color: 'green',
        textTransform: 'uppercase'
    }
});
  

const ScreenContainer = ({ children }) => (
    <View style={styles.container}>{children}</View>
);

export default ProfileScreenUpdate = () => {
    // const { signOut } = React.useContext(AuthContext);

    return (
        <ScreenContainer>
            <Text>ProfileScreen</Text>
        </ScreenContainer>
  );
}