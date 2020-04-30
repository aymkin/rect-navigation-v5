import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { AuthContext } from './App/context'

import { Calendar, Details, Search, Search2, Profile, SignIn, CreateAccount, Splash} from "./App/Screens";
import TabBarIcon from "./App/TabBarIcon";

const CalendarStack = createStackNavigator()
const CalendarStackScreen = () => (
  <CalendarStack.Navigator>
    <CalendarStack.Screen name="Calendar" component={Calendar}/>
    <CalendarStack.Screen name="Details" component={Details}/>
  </CalendarStack.Navigator>
)

const SearchStack = createStackNavigator();
const SearchStackScreen = () => (
  <SearchStack.Navigator>
    <SearchStack.Screen name="Search" component={Search} />
    <SearchStack.Screen name="Search2" component={Search2} />
  </SearchStack.Navigator>
);

const Tabs = createBottomTabNavigator();
const TabsScreen = () => (
  <Tabs.Navigator>
    <Tabs.Screen name="Calendar" component={CalendarStackScreen} options={{
      tabBarLabel: "Calendar",
      tabBarIcon: ({ focused }) => (
        <TabBarIcon
          focused={focused}
          name={Platform.OS === "ios" ? `ios-calendar` : "md-calendar"}
        />
      )
    }}
    />
    <Tabs.Screen name="Search" component={SearchStackScreen} options={{
      tabBarLabel: "Calendar",
      tabBarIcon: ({ focused }) => (
        <TabBarIcon
          focused={focused}
          name={Platform.OS === "ios" ? `ios-search` : "md-search"}
        />
      )
    }} />
  </Tabs.Navigator>
);

const ProfileStack = createStackNavigator();
const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name="Profile" component={Profile} />
  </ProfileStack.Navigator>
);

const Drawer = createDrawerNavigator();
const DrawerScreen = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="Bookings" component={TabsScreen} options={{
      drawerLabel: "Bookings",
      drawerIcon: ({ focused }) => (
        <TabBarIcon
          focused={focused}
          name={Platform.OS === "ios" ? `ios-pricetags` : "md-pricetags"}
        />
      )
    }}
    />
    <Drawer.Screen name="Profile" component={ProfileStackScreen} options={{
      drawerLabel: "Settings",
      drawerIcon: ({ focused }) => (
        <TabBarIcon
          focused={focused}
          name={Platform.OS === "ios" ? "ios-settings" : "md-settings"}
        />
      )
    }}

    />
  </Drawer.Navigator>
);

const AuthStack = createStackNavigator();
const AuthStackScreen = ({ userToken }) => {
  return (
    <AuthStack.Navigator headerMode='none'>
      {userToken ? (
        <AuthStack.Screen
          name="App"
          component={DrawerScreen}
          options={{
            animationEnabled: false
          }}
        />
      ) : (
        <React.Fragment>
          <AuthStack.Screen
            name={"SignIn"}
            component={SignIn}
            options={{ title: "Sign In" }}
          />
          <AuthStack.Screen
            name={"CreateAccount"}
            component={CreateAccount}
            options={{ title: "Create Account" }}
          />
        </React.Fragment>
      )}

    </AuthStack.Navigator>
  );
};


export default function App() {
  const [userToken, setUserToken] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const authContex = useMemo(() => {
    return {
      signin: () => {
        setIsLoading(true);
        setTimeout(() => {
          setUserToken("asdf");
        }, 2000)
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      },
      signup: () => {
        setIsLoading(true);
        setUserToken("asdf");
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      },
      signout: () => {
        setIsLoading(true);
        setUserToken(null);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    }
  }, [])
  if (isLoading) return <Splash />
  return (
    <AuthContext.Provider value={authContex}>
      <NavigationContainer>
        <AuthStackScreen userToken={userToken}/>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

