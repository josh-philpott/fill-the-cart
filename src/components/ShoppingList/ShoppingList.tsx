import React from "react"
import { SectionList } from "react-native"
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

import AddItem from "./AddItem"
import ShoppingListItem from "./ShoppingListItem"

import _ from "lodash"

export interface Props {}

interface State {
  loading: boolean
  sections: { title: string; data: string[] }[]
}

interface ShoppingListItem {
  category: string
  name: string
}

export default class ShoppingListScreen extends React.Component<Props, State> {
  static navigationOptions = {
    header: null
  }

  constructor(props: Props) {
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

  //TODO: Figure out typing here
  private onAddItem(name: string, category: string): void {
    console.log(`onAddItem -> ${name}, ${category}`)
    let sections = this.state.sections
    const section = _.find(sections, { title: category })
    const sectionIndex = _.findIndex(sections, { title: category })
    console.log(section)
    console.log(sectionIndex)
    if (section && sectionIndex !== undefined) {
      //add new item to the section
      section.data.push(name)
      //replace section at index
      sections.splice(sectionIndex, 1, section)
      this.setState({
        sections
      })
    }
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
          <AddItem onAddItem={this.onAddItem.bind(this)} />

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
