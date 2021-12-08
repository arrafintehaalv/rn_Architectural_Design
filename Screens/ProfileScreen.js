import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { AuthContext } from "../Context/context";
import APiJson from "../Api/Api.json"

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
    },
    elementView: {
        marginBottom: 10
    }
});
  

const ScreenContainer = ({ children }) => (
    <View style={styles.container}>{children}</View>
);

export default ProfileScreen = () => {
    const { signOut } = React.useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const onChangeValue = (value, type) => {
        if (type === 'email') {
            setEmail(value);
        }
        if (type === 'password') {
            setPassword(value);
        }
    }
    return (
        <ScreenContainer>
            <View style={styles.elementView}><Text>Name: {APiJson.Name}</Text></View>
            <View style={styles.elementView}><Text>Email: {APiJson.Email}</Text></View>
            <View style={styles.elementView}><Text>UserRole: {APiJson.UserRole}</Text></View>
            <TouchableOpacity style={styles.elementView} onPress={() => signOut()}><Text>Sign Out</Text></TouchableOpacity>
        </ScreenContainer>
  );
}