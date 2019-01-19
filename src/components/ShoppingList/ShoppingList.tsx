import React from "react"
import { SectionList } from "react-native"
import { Content, Text, Separator } from "native-base"
import { Font, AppLoading } from "expo"

import AddItem from "./AddItem"
import ShoppingListItem from "./ShoppingListItem"

import _ from "lodash"

export interface Props {}

interface State {
  sections: { title: string; data: string[] }[]
}

export default class ShoppingListScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
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
        },
        {
          title: "In Your Cart",
          data: []
        }
      ]
    }
  }

  private onAddItem(item: GroceryItem): void {
    let sections = this.state.sections
    const index = _.findIndex(sections, { title: item.category })

    if (index >= 0) {
      const section = sections[index]
      //add new item to the section
      section.data.push(item.name)
      //replace section at index
      sections.splice(index, 1, section)
      this.setState({
        sections
      })
    }
  }

  render() {
    return (
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
    )
  }
}
