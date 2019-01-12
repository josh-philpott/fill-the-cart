import React, { Component } from "react"
import { StyleSheet, StatusBar, View, SectionList } from "react-native"
import {
  Container,
  Header,
  Content,
  Text,
  Body,
  Title,
  Separator
} from "native-base"
import { Font, AppLoading } from "expo"
import ShoppingListItem from "./shoppingListItem"

export default class ShoppingListScreen extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      sections: [
        {
          title: "Produce",
          data: [
            "1 Shallot",
            "2 Carrots",
            "2 Zucchini",
            "Sliced Mushrooms (~8oz)"
          ]
        },
        {
          title: "Meat",
          data: ["Ground Turkey (1 lb)"]
        },
        {
          title: "Pantry",
          data: [
            "Soy Sauce",
            "Rice Vinegar",
            "Brown Sugar",
            "Jasmine Rice",
            "Ice Cream"
          ]
        }
      ]
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
      <Container>
        <Header>
          <Body>
            <Title>Shopping List</Title>
          </Body>
        </Header>
        <Content>
          <SectionList
            sections={this.state.sections}
            renderSectionHeader={({ section: { title } }) => (
              <Separator bordered>
                <Text style={{ fontSize: 16 }}>{title}</Text>
              </Separator>
            )}
            renderItem={({ item, index }) => (
              <ShoppingListItem item={item} index={index} />
            )}
            keyExtractor={(item, index) => item + index}
          />
        </Content>
      </Container>
    )
  }
}
