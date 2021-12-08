import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { AuthContext } from "../Context/context";
import ApiJson from "../Api/Api.json";
import Constants from "../Constants/Constants";
import AsyncStorage from '@react-native-async-storage/async-storage';

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

export default SignOutScreen = () => {
    const { signOut } = React.useContext(AuthContext);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const userAuth = () => {
        signOut();
    }

    return (
        <ScreenContainer>
            
            <TouchableOpacity onPress={() => userAuth()}>
                <Text style={styles.loginButton}>Login</Text>
            </TouchableOpacity>
        </ScreenContainer>
  );
}