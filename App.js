import React from "react"
import { AppRegistry } from "react-native"
import { Provider } from "react-redux"
import configureStores from "./src/stores/configureStores"

import { createStackNavigator, createAppContainer } from "react-navigation"
import ShoppingListScreen from "./src/components/ShoppingList/ShoppingListScreen"
import ShoppingListExplorerScreen from "./src/components/ShoppingList/ShoppingListExplorerScreen"
import ItemHighlightScreen from "./src/components/ShoppingList/ItemHighlight/ItemHighlightScreen"
import rootReducer from "./src/reducers/rootReducer"

const AppNavigator = createStackNavigator(
  {
    ShoppingListExplorer: ShoppingListExplorerScreen,
    ShoppingList: ShoppingListScreen,
    ItemHighlight: ItemHighlightScreen
  },
  {
    initialRouteName: "ShoppingListExplorer"
  }
)

const AppContainer = createAppContainer(AppNavigator)

class App extends React.Component {
  store = configureStores(rootReducer)

  render() {
    return (
      <Provider store={this.store}>
        <AppContainer />
      </Provider>
    )
  }
}

AppRegistry.registerComponent("App", () => App)

export default App
