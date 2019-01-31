import React from 'react'
import { AppRegistry } from 'react-native'
import { Provider } from 'react-redux'
import { store } from './src/stores/configureStores'
import { persistor } from './src/stores/configureStores'
import { PersistGate } from 'redux-persist/integration/react'

import { createStackNavigator, createAppContainer } from 'react-navigation'
import ShoppingListScreen from './src/components/ShoppingList/ShoppingListScreen'
import ItemHighlightScreen from './src/components/ShoppingList/ItemHighlight/ItemHighlightScreen'

const AppNavigator = createStackNavigator(
  {
    ShoppingList: ShoppingListScreen,
    ItemHighlight: ItemHighlightScreen
  },
  {
    initialRouteName: 'ShoppingList'
  }
)

const AppContainer = createAppContainer(AppNavigator)

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
    )
  }
}

AppRegistry.registerComponent('App', () => App)

export default App
