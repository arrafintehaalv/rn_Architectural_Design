import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { AuthContext } from "../Context/context";
import ApiJson from "../Api/Api.json";

const styles = StyleSheet.create({
    container: {
      flex: 1,
    //   justifyContent: "center",
    //   alignItems: "center"
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
    user: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center'
    }
});
  

const ScreenContainer = ({ children }) => (
    <View style={styles.container}>{children}</View>
);

export default AllUsersScreen = () => {
    return (
        <ScreenContainer>
            {ApiJson.usersData && ApiJson.usersData.length > 0 ? 
                <ScrollView style={{flex: 1}}>
                    {ApiJson.usersData.map(item => {
                        <View key={item.id} style={styles.user}>
                            <Text>{item.name}</Text>
                            <Text>{item.role}</Text>
                            {ApiJson.UserRole === "Admin" ? <>
                                <TouchableOpacity><Text>Edit</Text></TouchableOpacity>
                                <TouchableOpacity><Text>Delete</Text></TouchableOpacity>
                            </> : null
                            }
                            
                        </View>
                    })}

                </ScrollView>
                    : null
             }
            
        </ScreenContainer>
  );
}