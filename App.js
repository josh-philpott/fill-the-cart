import React, { Component } from "react"
import { View, Text, Button, StyleSheet } from "react-native"
import { createStackNavigator, createAppContainer } from "react-navigation"
import DetailsScreen from "./src/details"
import ShoppingListScreen from "./src/shoppingList"

const AppNavigator = createStackNavigator(
  {
    ShoppingList: ShoppingListScreen,
    Details: DetailsScreen
  },
  {
    initialRouteName: "ShoppingList"
  }
)

export default createAppContainer(AppNavigator)
