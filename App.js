import 'react-native-gesture-handler';
import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

import {
  SignInScreen,
  ProfileScreen,
  ProfileScreenUpdate,
  ReportScreen,
  SettingsScreen,
  AllUsersScreen,
  UserReportScreen,
  // SignOutScreen,
  SplashScreen,
  EditProfileScreen
} from "./Screens";
import { AuthContext } from './Context/context';
import Constants from './Constants/Constants';

const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="SignInScreen"
      component={SignInScreen}
      options={{ title: "Sign In" }}
    />
  </AuthStack.Navigator>
);

const Tabs = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const UsersStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const SignOutStack = createStackNavigator();
const EditProfileStack = createStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={ProfileScreen} />
  </HomeStack.Navigator>
);

const UsersStackScreen = () => (
  <UsersStack.Navigator>
    <UsersStack.Screen name="AllUsersScreen" component={AllUsersScreen} />
    <UsersStack.Screen name="UserReportScreen" component={UserReportScreen} />
  </UsersStack.Navigator>
);

const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name="Profile" component={ProfileScreen} />
  </ProfileStack.Navigator>
);

const EditProfileStackScreen = () => (
  <EditProfileStack.Navigator>
    <EditProfileStack.Screen name="EditProfile" component={EditProfileScreen} />
  </EditProfileStack.Navigator>
);

const SignOutStackScreen = () => (
  <SignOutStack.Navigator>
    <SignOutStack.Screen name="SignOut" component={SignOutScreen} />
  </SignOutStack.Navigator>
);

const TabsScreen = () => (
  <Tabs.Navigator>
    <Tabs.Screen name="Home" component={HomeStackScreen} options={{headerShown: false}} />
    <Tabs.Screen name="Users" component={UsersStackScreen} options={{headerShown: false}} />
  </Tabs.Navigator>
);

const Drawer = createDrawerNavigator();
const DrawerScreen = () => (
  <Drawer.Navigator initialRouteName="Profile">
    <Drawer.Screen name="Home" component={TabsScreen} options={{headerShown: false}} />
    <Drawer.Screen name="Profile" component={ProfileStackScreen} options={{headerShown: false}} />
    <Drawer.Screen name="EditProfile" component={EditProfileStackScreen} options={{headerShown: false}} />
    {/* <Drawer.Screen name="SignOut" component={SignOutStackScreen} options={{headerShown: false}} /> */}
  </Drawer.Navigator>
);

const RootStack = createStackNavigator();
const RootStackScreen = ({ userToken }) => (
  <RootStack.Navigator headerMode="none">
    {userToken ? (
      <RootStack.Screen
        name="App"
        component={DrawerScreen}
        options={{
          animationEnabled: false,
          headerShown: false
        }}
      />
    ) : (
      <RootStack.Screen
        name="Auth"
        component={AuthStackScreen}
        options={{
          animationEnabled: false
        }}
      />
    )}
  </RootStack.Navigator>
);

export default () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState("");

  console.log("userToken", userToken)

  const authContext = React.useMemo(() => {
    return {
      signIn: async () => {
        setIsLoading(false);
        setUserToken(Constants.Token);
        try {
          await AsyncStorage.setItem("token", Constants.Token)
        } catch (e) {
          // saving error
        }
      },
      signOut: async () => {
        setIsLoading(false);
        setUserToken("");
        try {
          await AsyncStorage.setItem("token", "")
        } catch (e) {
          // saving error
        }
      }
    };
  }, []);

  React.useEffect(() => {

    setTimeout(() => {
      try {
        AsyncStorage.getItem("token").then((token) => {
          if (token) {
            setUserToken(token);
          }
        });
      } catch (e) {
        // saving error
      }
      setIsLoading(false);
    }, 1000);

  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootStackScreen userToken={userToken} />
      </NavigationContainer>
    </AuthContext.Provider>
  );
};
