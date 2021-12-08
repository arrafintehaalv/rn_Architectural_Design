import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { AuthContext } from "../Context/context";
import ApiJson from "../Api/Api.json";
import Constants from "../Constants/Constants";

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
        width: '70%'
    },
    loginButton: {
        color: 'green',
        textTransform: 'uppercase'
    }
});
  

const ScreenContainer = ({ children }) => (
    <View style={styles.container}>{children}</View>
);

export default SignInScreen = () => {
    const { signIn } = React.useContext(AuthContext);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const userAuth = () => {
        fetch(`${Constants.Base_Url}user/login`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-API-KEY': Constants.APIKey
            },
            body: JSON.stringify({
                Username: userName,
                Password: password
            })
        })
        .then((response) => {
            if (response) {
                if (userName && password) {
                    console.log(ApiJson)
                    if (ApiJson.userToken) {
                        signIn();
                    }
                }
            }
            
        })
        .catch((error) => {
            if (error) {
                if (userName && password) {
                    console.log(ApiJson)
                    if (ApiJson.userToken) {
                        signIn();
                    }
                }
            }
        });
    }

    const onChangeValue = (value, type) => {
        if (type === 'userName') {
            setUserName(value);
        }
        if (type === 'password') {
            setPassword(value);
        }
    }

    return (
        <ScreenContainer>
            <TextInput
                style={styles.input}
                onChangeText={(value) => onChangeValue(value, 'userName')}
                value={userName}
                placeholder="UserName"
                keyboardType="default"
                maxLength={100}
            />
            <View style={{height: 10}} />
            <TextInput
                style={styles.input}
                onChangeText={(value) => onChangeValue(value, 'password')}
                value={password}
                placeholder="Password"
                keyboardType="number-pad"
                secureTextEntry={true}
                maxLength={30}
            />
            <TouchableOpacity onPress={() => userAuth()}>
                <Text style={styles.loginButton}>Login</Text>
            </TouchableOpacity>
        </ScreenContainer>
  );
}