import React from "react"
import { SectionList } from "react-native"
import { Content, Text, Separator } from "native-base"

import AddItem from "./AddItem"
import ShoppingListItem from "./ShoppingListItem"

import _ from "lodash"

export interface Props {}

interface State {
  // sections: { title: string; data: string[] }[]
  items: GroceryItem[]
}

export default class ShoppingList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      items: [
        { category: "Produce", name: "1 Shallot", inCart: false },
        { category: "Produce", name: "2 Carrots", inCart: false },
        { category: "Meat", name: "Ground Turkey (1 lb)", inCart: false },
        { category: "Pantry", name: "Soy Sauce", inCart: false },
        { category: "Pantry", name: "Rice Vinegar", inCart: false },
        { category: "Pantry", name: "Brown Sugar", inCart: false },
        { category: "Pantry", name: "Jasmine Rice", inCart: false },
        { category: "Other", name: "Jasmine Rice", inCart: true }
      ]
    }
  }

  private onAddItem(item: GroceryItem): void {
    let items = this.state.items
    items.push(item)
    this.setState({ items })
  }

  private getItemsByCategory(): SectionListData[] {
    let itemsByCategoryDerived = _(this.state.items)
      .groupBy(item => (item.inCart ? "In Cart" : item.category))
      .map((value, key) => {
        let onlyNames = _.map(value, item => item.name)
        return { title: key, data: onlyNames }
      })
      .value()

    return itemsByCategoryDerived
  }

  render() {
    return (
      <Content>
        <AddItem onAddItem={this.onAddItem.bind(this)} />

        <SectionList
          sections={this.getItemsByCategory()}
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
