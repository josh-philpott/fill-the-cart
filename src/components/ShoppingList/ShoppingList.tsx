import React, { Dispatch } from "react"
import { SectionList } from "react-native"
import { Content, Text, Separator } from "native-base"

import AddItem from "./AddItem"
import ShoppingListItem from "./ShoppingListItem"
import {
  GroceryItem,
  SectionListData
} from "../../interfaces/ShoppingList/types"

import _ from "lodash"
import { connect } from "react-redux"
import {
  addShoppingListItem,
  removeShoppingListItem,
  toggleItemInCart
} from "../../actions/shoppingListActions"

export interface Props {
  itemsByCategory: SectionListData[]
  onItemClick: (item: GroceryItem) => void
  addItem: (item: GroceryItem) => void
  deleteItem: (id: string) => void
  toggleItemInCart: (id: string) => void
}

class ShoppingList extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
  }

  render() {
    return (
      <Content style={{ borderTopWidth: 2 }}>
        <AddItem onAddItem={this.props.addItem} />

        <SectionList
          sections={this.props.itemsByCategory}
          renderSectionHeader={({ section: { title } }) => (
            <Separator bordered>
              <Text style={{ fontSize: 16 }}>{title}</Text>
            </Separator>
          )}
          renderItem={({ item, index }) => (
            <ShoppingListItem
              item={item}
              checked={item.inCart}
              onCheck={this.props.toggleItemInCart}
              onDelete={this.props.deleteItem}
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

const mapStateToProps = (state: any) => {
  const getItemsByCategory = function(
    items: GroceryItem[],
    categorySortOrder: string[]
  ): SectionListData[] {
    let sortOrder = categorySortOrder
    let itemsByCategoryDerived = _(items)
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

  return {
    itemsByCategory: getItemsByCategory(
      state.shoppingList.items,
      state.shoppingList.categorySortOrder
    )
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    addItem: (item: GroceryItem) => dispatch(addShoppingListItem(item)),
    deleteItem: (id: string) => dispatch(removeShoppingListItem(id)),
    toggleItemInCart: (id: string) => dispatch(toggleItemInCart(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingList)
