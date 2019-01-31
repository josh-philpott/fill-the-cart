import React from 'react'
import { AppRegistry } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { Font, AppLoading } from 'expo'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import { Spinner } from 'native-base'

import { store, persistor } from './src/stores/configureStores'
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
  constructor(props) {
    super(props)
    this.state = {
      fontLoading: true
    }
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf')
    })
    this.setState({ fontLoading: false })
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<Spinner color='green' />} persistor={persistor}>
          {this.state.fontLoading ? <AppLoading /> : <AppContainer />}
        </PersistGate>
      </Provider>
    )
  }
}

AppRegistry.registerComponent('App', () => App)

export default App
