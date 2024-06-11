import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import AppNavigation from "./src/screens/Navigation";

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigation />
    </NavigationContainer>
  );
}
