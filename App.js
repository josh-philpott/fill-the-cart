import React from "react"
import { AppRegistry } from "react-native"
import { Provider } from "react-redux"
import { createStore } from "redux"

import { createStackNavigator, createAppContainer } from "react-navigation"
import ShoppingListScreen from "./src/components/ShoppingList/ShoppingListScreen"
import ItemHighlightScreen from "./src/components/ShoppingList/ItemHighlight/ItemHighlightScreen"
import rootReducer from "./src/reducers/rootReducer"

const AppNavigator = createStackNavigator(
  {
    ShoppingList: ShoppingListScreen,
    ItemHighlight: ItemHighlightScreen
  },
  {
    initialRouteName: "ShoppingList"
  }
)

const AppContainer = createAppContainer(AppNavigator)

class App extends React.Component {
  store = createStore(rootReducer)

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
