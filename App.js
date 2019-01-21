import { createStackNavigator, createAppContainer } from "react-navigation"
import ShoppingListScreen from "./src/components/ShoppingList/ShoppingListScreen"
import ItemHighlightScreen from "./src/components/ShoppingList/ItemHighlight/ItemHighlightScreen"

const AppNavigator = createStackNavigator(
  {
    ShoppingList: ShoppingListScreen,
    ItemHighlight: ItemHighlightScreen
  },
  {
    initialRouteName: "ShoppingList"
  }
)

export default createAppContainer(AppNavigator)
