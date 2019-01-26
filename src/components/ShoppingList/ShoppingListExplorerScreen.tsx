import React from "react"
import { NavigationScreenProp } from "react-navigation"
import {
  Container,
  Header,
  Body,
  Title,
  Text,
  List,
  ListItem
} from "native-base"
import { Font, AppLoading } from "expo"

export interface Props {
  navigation: NavigationScreenProp<any, any>
}

interface State {
  loading: boolean
}

export default class ShoppingListExplorerScreen extends React.Component<
  Props,
  State
> {
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

  render() {
    if (this.state.loading) {
      return (
        <Container>
          <AppLoading />
        </Container>
      )
    }

    return (
      <Container>
        <Header>
          <Body>
            <Title>Lists</Title>
          </Body>
        </Header>
        <List>
          <ListItem
            onPress={() => {
              this.props.navigation.navigate("ShoppingList")
            }}>
            <Text>Shopping List</Text>
          </ListItem>
          <ListItem>
            <Text>Ski Check List</Text>
          </ListItem>
          <ListItem>
            <Text>Resort Ski Check Lists</Text>
          </ListItem>
        </List>
      </Container>
    )
  }
}
