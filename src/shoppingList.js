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
          { item: "1 Shallot", checked: false },
          { item: "2 Carrots", checked: false },
          { item: "2 Zucchini", checked: false },
          { item: "Sliced Mushrooms (~8oz)", checked: false }
        ],
        Meat: [{ item: "Ground Turkey (1 lb)", checked: false }],
        Pantry: [
          { item: "Soy Sauce", checked: false },
          { item: "Rice Vinegar", checked: false },
          { item: "Brown Sugar", checked: false },
          { item: "Jasmine Rice", checked: false },
          { item: "Ice Cream", checked: false }
        ],
        Freezer: [
          { item: "Ice Cream", checked: false },
          { item: "Toaster Streudels (for doodles)", checked: false },
          { item: "Jimmy Dean Sausage Bisquits (for Mary)", checked: false },
          {
            item: "Jam (what's the difference between jelly and jam)",
            checked: true
          }
        ]
      }
    }
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    })
    this.setState({ ...this.state, loading: false })
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

<List dataArray={ingredients}>

</List>
        
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
                        <CheckBox checked={item.checked} />
                        <Body>
                          <Text>{item.item}</Text>
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
