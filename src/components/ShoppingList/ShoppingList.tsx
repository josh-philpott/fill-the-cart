import React from "react"
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
  onItemClick: (item: GroceryItem) => void
  addItem: (item: GroceryItem) => void
  removeItem: (id: string) => void
  toggleItemInCart: (id: string) => void
}

interface State {}

class ShoppingList extends React.Component<Props, State> {
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

const mapStateToProps = state => {
  const getItemsByCategory = function(
    items,
    categorySortOrder
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

const mapDispatchToProps = dispatch => {
  return {
    addItem: item => dispatch(addShoppingListItem(item)),
    deleteItem: id => dispatch(removeShoppingListItem(id)),
    toggleItemInCart: id => dispatch(toggleItemInCart(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingList)
