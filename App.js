import { createStackNavigator, createAppContainer } from "react-navigation"
import ShoppingListScreen from "./src/components/ShoppingList/shoppingList"

const AppNavigator = createStackNavigator(
  {
    ShoppingList: ShoppingListScreen
  },
  {
    initialRouteName: "ShoppingList"
  }
)

export default createAppContainer(AppNavigator)
