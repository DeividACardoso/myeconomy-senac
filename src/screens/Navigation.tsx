import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from "./login/Login";
import Signup from "./signup/Signup";
import Home from "./home/Home";
// import Expense from "./expense/Expense";
// import Limit from "./limit/Limit";
// import Profile from "./profile/Profile";
import { Ionicons } from '@expo/vector-icons';
// import ExpenseHistory from './expense/ExpenseHistory';
// import LimitHistory from './limit/LimitHistory';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: 'white',
                },
                tabBarActiveTintColor: '#4CAF50',
                tabBarInactiveTintColor: 'green',
            }}
        >
            <Tab.Screen
                name="Inicio"
                component={Home}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" color={color} size={size} />
                    ),
                }}
            />
            {/* <Tab.Screen
                name="Despesas"
                component={Expense}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="wallet" color={color} size={size} />
                    ),
                }}
            /> */}
            {/* <Tab.Screen
                name="Limite"
                component={Limit}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="calendar" color={color} size={size} />
                    ),
                }}
            /> */}
        </Tab.Navigator>
    );
}

export default function AppNavigation() {

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Signin"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Signup"
                component={Signup}
                options={{
                    title: "",
                    headerStyle: {
                        backgroundColor: 'white'
                    },
                    headerTintColor: '#4CAF50',
                    headerShadowVisible: false,
                }}
            />
            <Stack.Screen
                name="Home"
                component={MyTabs}
                options={{
                    title: "",
                    headerStyle: {
                        backgroundColor: 'white'
                    },
                    headerTintColor: '#4CAF50',
                    headerShadowVisible: false,
                    headerLeft: () => false
                }}
            />
            {/* <Stack.Screen
                name="Profile"
                component={Profile}
                options={{
                    title: "",
                    headerStyle: {
                        backgroundColor: 'white'
                    },
                    headerTintColor: #4CAF50,
                    headerShadowVisible: false,
                }}
            />
            <Stack.Screen
                name="ExpenseHistory"
                component={ExpenseHistory}
                options={{
                    title: "",
                    headerStyle: {
                        backgroundColor: 'white'
                    },
                    headerTintColor: #4CAF50,
                    headerShadowVisible: false,
                }}
            />
            <Stack.Screen
                name="LimitHistory"
                component={LimitHistory}
                options={{
                    title: "",
                    headerStyle: {
                        backgroundColor: 'white'
                    },
                    headerTintColor: #4CAF50,
                    headerShadowVisible: false,
                }}
            /> */}
        </Stack.Navigator>
    );
}