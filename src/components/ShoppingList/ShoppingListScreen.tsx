import React from "react"
import { NavigationScreenProp } from "react-navigation"
import {
  Container,
  Header,
  Icon,
  Body,
  Title,
  Right,
  Left,
  Text,
  Button
} from "native-base"
import { Font, AppLoading } from "expo"
import {
  MenuProvider,
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption
} from "react-native-popup-menu"

import ShoppingList from "./ShoppingList"
import { GroceryItem } from "../../interfaces/ShoppingList/types"

export interface Props {
  navigation: NavigationScreenProp<any, any>
}

interface State {
  loading: boolean
}

export default class ShoppingListScreen extends React.Component<Props, State> {
  static navigationOptions = {
    header: null
  }

  constructor(props: Props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  async componentWillMount() {
    // This needs to be at the highest level of the app
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    })
    this.setState({ loading: false })
  }

  private navigateToItemHighlight(item: GroceryItem): void {
    this.props.navigation.navigate("ItemHighlight", { item: item })
  }

  render() {
    if (this.state.loading) {
      return (
        <Container>
          <AppLoading />
        </Container>
      )
    }

    return (
      <MenuProvider>
        <Container>
          <Header>
            <Left>
              <Button
                transparent
                onPress={() => {
                  this.props.navigation.goBack()
                }}>
                <Icon name='arrow-back' />
              </Button>
            </Left>
            <Body>
              <Title>Shopping List</Title>
            </Body>
            <Right>
              <Menu name='shoppingListMoreMenu'>
                <MenuTrigger>
                  <Icon
                    name='more'
                    style={{
                      color: "#FFFFFF",
                      padding: 10
                    }}
                  />
                </MenuTrigger>
                <MenuOptions>
                  <MenuOption onSelect={() => alert(`Delete Items Selected`)}>
                    <Text
                      style={{
                        fontSize: 18,
                        padding: 10,
                        marginTop: 5,
                        marginBottom: 5
                      }}>
                      Delete Items...
                    </Text>
                  </MenuOption>
                  <MenuOption
                    onSelect={() =>
                      this.props.navigation.navigate("ItemHighlight")
                    }>
                    <Text
                      style={{
                        fontSize: 18,
                        padding: 10,
                        marginTop: 5,
                        marginBottom: 5
                      }}>
                      Delete Items...
                    </Text>
                  </MenuOption>
                </MenuOptions>
              </Menu>
            </Right>
          </Header>
          <ShoppingList onItemClick={this.navigateToItemHighlight.bind(this)} />
        </Container>
      </MenuProvider>
    )
  }
}
