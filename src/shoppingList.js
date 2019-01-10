import React, { Component } from "react"
import { StyleSheet, StatusBar } from "react-native"
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
    this.state = { loading: true }
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    })
    this.setState({ loading: false })
  }

  render() {
    const ingredients = {
      produce: [
        "1 Shallot",
        "2 Carrots",
        "2 Zucchini",
        "Sliced Mushrooms (~8oz)"
      ],
      meat: ["Ground Turkey (1 lb)"],
      pantry: [
        "Soy Sauce",
        "Rice Vinegar",
        "Brown Sugar",
        "Jasmine Rice",
        "Ice Cream"
      ],
      freezer: [
        "Ice Cream",
        "Toaster Streudels (for doodles)",
        "Jimmy Dean Sausage Bisquits (for Mary)",
        "Jam (what's the difference between jelly and jam)"
      ]
    }

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
            <Title>Mary's Little Shopping List</Title>
          </Body>
        </Header>

        <Content>
          <Separator bordered>
            <Text style={{ fontSize: 16 }}>Produce</Text>
          </Separator>
          {ingredients.produce.map(item => {
            return (
              <ListItem>
                <CheckBox checked={false} />
                <Body>
                  <Text>{item}</Text>
                </Body>
              </ListItem>
            )
          })}

          <Separator bordered>
            <Text style={{ fontSize: 16 }}>Meat</Text>
          </Separator>
          {ingredients.meat.map(item => {
            return (
              <ListItem>
                <CheckBox checked={false} />
                <Body>
                  <Text>{item}</Text>
                </Body>
              </ListItem>
            )
          })}

          <Separator bordered>
            <Text style={{ fontSize: 16 }}>Pantry</Text>
          </Separator>
          {ingredients.pantry.map(item => {
            return (
              <ListItem>
                <CheckBox checked={false} />
                <Body>
                  <Text>{item}</Text>
                </Body>
              </ListItem>
            )
          })}

          <Separator bordered>
            <Text style={{ fontSize: 16 }}>Freezer</Text>
          </Separator>
          {ingredients.freezer.map(item => {
            return (
              <ListItem>
                <CheckBox checked={false} />
                <Body>
                  <Text>{item}</Text>
                </Body>
              </ListItem>
            )
          })}
        </Content>
      </Container>
    )
  }
}
