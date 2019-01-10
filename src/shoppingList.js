import React, { Component } from "react"
import { StyleSheet, StatusBar, View } from "react-native"
import {
  Container,
  Header,
  Content,
  ListItem,
  CheckBox,
  Text,
  Body,
  Title,
  Left,
  Right,
  Separator
} from "native-base"
import { Font, AppLoading } from "expo"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start"
  }
})

export default class ShoppingListScreen extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      ingredients: {
        Produce: [
          "1 Shallot",
          "2 Carrots",
          "2 Zucchini",
          "Sliced Mushrooms (~8oz)"
        ],
        Meat: ["Ground Turkey (1 lb)"],
        Pantry: [
          "Soy Sauce",
          "Rice Vinegar",
          "Brown Sugar",
          "Jasmine Rice",
          "Ice Cream"
        ],
        Freezer: [
          "Ice Cream",
          "Toaster Streudels (for doodles)",
          "Jimmy Dean Sausage Bisquits (for Mary)",
          "Jam (what's the difference between jelly and jam)"
        ]
      }
    }
  }

  async componentWillMount() {
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
      <Container style={{ marginTop: StatusBar.currentHeight }}>
        <Header>
          <Body>
            <Title>Shopping List</Title>
          </Body>
        </Header>
        <Content>
          {Object.keys(this.state.ingredients).map(
            (category, categoryIndex) => {
              return (
                <View key={categoryIndex}>
                  <Separator key={categoryIndex} bordered>
                    <Text style={{ fontSize: 16 }}>{category}</Text>
                  </Separator>
                  {this.state.ingredients[category].map((item, itemIndex) => {
                    return (
                      <ListItem key={itemIndex}>
                        <CheckBox checked={true} />
                        <Body>
                          <Text>{item}</Text>
                        </Body>
                      </ListItem>
                    )
                  })}
                </View>
              )
            }
          )}
        </Content>
      </Container>
    )
  }
}
