import React from "react"
import { SectionList } from "react-native"
import { Content, Text, Separator } from "native-base"

import AddItem from "./AddItem"
import ShoppingListItem from "./ShoppingListItem"

import _ from "lodash"
import uuidv1 from "uuid/v1"

export interface Props {}

interface State {
  items: GroceryItem[]
  categorySortOrder: string[]
}

export default class ShoppingList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      categorySortOrder: ["Produce", "Meat", "Pantry", "Other", "In Cart"],
      items: [
        {
          id: uuidv1(),
          category: "Produce",
          name: "1 Shallot",
          inCart: false
        },
        {
          id: uuidv1(),
          category: "Produce",
          name: "2 Carrots",
          inCart: false
        },
        {
          id: uuidv1(),
          category: "Meat",
          name: "Ground Turkey (1 lb)",
          inCart: false
        },
        { id: uuidv1(), category: "Pantry", name: "Soy Sauce", inCart: false },
        {
          id: uuidv1(),
          category: "Pantry",
          name: "Rice Vinegar",
          inCart: false
        },
        {
          id: uuidv1(),
          category: "Pantry",
          name: "Brown Sugar",
          inCart: false
        },
        {
          id: uuidv1(),
          category: "Pantry",
          name: "Jasmine Rice",
          inCart: false
        }
      ]
    }
  }

  private onAddItem(item: GroceryItem): void {
    let items = this.state.items
    items.push(item)
    this.setState({ items })
  }

  private getItemsByCategory(): SectionListData[] {
    let sortOrder = this.state.categorySortOrder
    let itemsByCategoryDerived = _(this.state.items)
      .groupBy(item => (item.inCart ? "In Cart" : item.category))
      .map((value, key) => {
        return { title: key, data: value }
      })
      .sortBy(section => {
        return sortOrder.indexOf(section.title)
      })
      .value()

    return itemsByCategoryDerived
  }

  //toggle inCart on check
  private addRemoveFromCart(itemKey: string): void {
    //wait a bit for the check animation, grab the correct item and update inCart
    let items = this.state.items
    let foundItem = _.remove(items, { id: itemKey })[0]
    foundItem.inCart = !foundItem.inCart
    console.log(`found item -> ${foundItem}`)
    items.push(foundItem)
    this.setState({ items })
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
            <ShoppingListItem
              item={item}
              checked={item.inCart}
              onCheck={this.addRemoveFromCart.bind(this)}
            />
          )}
          keyExtractor={item => {
            console.log(item.id)
            return item.id
          }}
        />
      </Content>
    )
  }
}
