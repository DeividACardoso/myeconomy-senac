import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from "./login/Login";
import Signup from "./signup/Signup";
import Home from "./home/Home";
import React from "react";
import Limite from "./limite/Limite";
import Perfil from "./profile/Profile";
import { Ionicons } from '@expo/vector-icons';
import DespesaScreen from "./despesa/Despesa";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {

    return (

        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#4CAF50',
                    height: 55,
                    paddingTop: 5,
                },
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: 'green',
                tabBarLabelStyle: {
                    fontSize: 14,
                    fontWeight: 'bold',
                },
                tabBarIconStyle: {
                    marginBottom: -3,
                },
            }}
        >
            <Tab.Screen
                name="Inicio"
                component={Home}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home-sharp" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Despesas"
                component={DespesaScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="wallet-sharp" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Limite"
                component={Limite}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="calendar-sharp" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Perfil"
                component={Perfil}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person-sharp" color={color} size={size} />
                    ),
                }}
            />
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
                    title: "Cadastro",
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
                    title: "MyEconomy",
                    headerStyle: {
                        backgroundColor: 'white'
                    },
                    headerTintColor: '#4CAF50',
                    headerShadowVisible: false,
                    headerLeft: () => false
                }}
            />
            <Stack.Screen
                name="Profile"
                component={Perfil}
                options={{
                    title: "Perfil",
                    headerStyle: {
                        backgroundColor: 'white'
                    },
                    headerTintColor: '#4CAF50',
                    headerShadowVisible: false,
                }}
            />
        </Stack.Navigator>
    );
}