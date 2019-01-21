import React from "react"
import { SectionList } from "react-native"
import { Content, Text, Separator } from "native-base"

import AddItem from "./AddItem"
import ShoppingListItem from "./ShoppingListItem"
import { quantityType } from "../../interfaces/ShoppingList/enums"
import {
  GroceryItem,
  SectionListData
} from "../../interfaces/ShoppingList/types"

import _ from "lodash"
import uuidv1 from "uuid/v1"

export interface Props {
  onItemClick: (item: GroceryItem) => void
}

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
          name: "Shallot",
          quantity: 1,
          inCart: false
        },
        {
          id: uuidv1(),
          category: "Produce",
          name: "Carrots",
          quantity: 2,
          inCart: false
        },
        {
          id: uuidv1(),
          category: "Meat",
          name: "Ground Turkey",
          quantity: 1,
          quantityType: quantityType.lbs,
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
          quantity: 2,
          quantityType: quantityType.cups,
          inCart: false
        },
        {
          id: uuidv1(),
          category: "Pantry",
          name: "Jasmine Rice",
          quantity: 1,
          quantityType: quantityType.cups,
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

  /*
   * Toggle inCart for checked/unchecked item
   */
  private addRemoveFromCart(itemKey: string): void {
    let items = this.state.items
    let itemIndex = _.findLastIndex(items, { id: itemKey })
    items[itemIndex].inCart = !items[itemIndex].inCart
    this.setState({ items })
  }

  private deleteItem(itemKey: string): void {
    let items = this.state.items
    _.remove(items, { id: itemKey })
    this.setState({ items })
  }

  render() {
    return (
      <Content style={{ borderTopWidth: 2 }}>
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
              onDelete={this.deleteItem.bind(this)}
              onPress={this.props.onItemClick}
            />
          )}
          keyExtractor={item => {
            return item.id
          }}
        />
      </Content>
    )
  }
}
