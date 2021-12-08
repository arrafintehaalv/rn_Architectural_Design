import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { AuthContext } from "../Context/context";
import APiJson from "../Api/Api.json"
import Constants from "../Constants/Constants";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-start",
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
    },
    elementView: {
        marginBottom: 10
    }
});
  

const ScreenContainer = ({ children }) => (
    <View style={styles.container}>{children}</View>
);

export default EditProfileScreen = ({navigation}) => {
    const { signOut } = React.useContext(AuthContext);
    const [email, setEmail] = useState(APiJson.Name ? APiJson.Name : "");
    const [password, setPassword] = useState(APiJson.Password ? APiJson.Password : "");
    const [group, setGroup] = useState(APiJson.Group ? APiJson.Group : "");
    const [avatar, setAvatar] = useState(APiJson.Avatar ? APiJson.Avatar : "Default.png");
    const [id] = useState(APiJson.Id ? APiJson.Id : 0);

    const editProfile = () => {
        fetch(`${Constants.Base_Url}user/update_profile`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-API-KEY': Constants.APIKey,
                'X-Token': Constants.Token
            },
            body: JSON.stringify({
                Email: email,
                Password: password,
                Group: group,
                Avatar: avatar,
                id: id
            })
        })
        .then((response) => {
            if (response) {
                navigation.navigate('Home')
            }
            
        })
        .catch((error) => {
            if (error) {
                navigation.navigate('Home')
            }
        });
    }

    const onChangeValue = (value, type) => {
        if (type === 'email') {
            setEmail(value);
        }
        if (type === 'password') {
            setPassword(value);
        }
        if (type === 'group') {
            setGroup(value);
        }
    }
    return (
        <ScreenContainer>
            <TextInput
                style={styles.input}
                onChangeText={(value) => onChangeValue(value, 'email')}
                value={email}
                placeholder="Email"
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
            <TextInput
                style={styles.input}
                onChangeText={(value) => onChangeValue(value, 'group')}
                value={group}
                placeholder="Group"
                keyboardType="default"
                maxLength={30}
            />
            <View style={{height: 10}} />
            <TouchableOpacity onPress={() => editProfile()}><Text>Update</Text></TouchableOpacity>
        </ScreenContainer>
  );
}