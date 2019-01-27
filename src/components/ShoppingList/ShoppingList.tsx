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
  toggleItemInCart,
  fetchShoppingList
} from "../../actions/shoppingListActions"

export interface Props extends StateFromProps, DispatchFromProps {
  onItemClick: (item: GroceryItem) => void
}

class ShoppingList extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchShoppingList("shopping-list-one")
  }

  render(): JSX.Element {
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
          renderItem={({ item }) => (
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

interface StateFromProps {
  itemsByCategory: SectionListData[]
}

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

const mapStateToProps = (state: any): StateFromProps => {
  return {
    itemsByCategory: getItemsByCategory(
      state.shoppingList.items,
      state.shoppingList.categorySortOrder
    )
  }
}

interface DispatchFromProps {
  addItem: (item: GroceryItem) => void
  deleteItem: (id: string) => void
  toggleItemInCart: (id: string) => void
  fetchShoppingList: (id: string) => void
}

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchFromProps => {
  return {
    addItem: (item: GroceryItem) => dispatch(addShoppingListItem(item)),
    deleteItem: (id: string) => dispatch(removeShoppingListItem(id)),
    toggleItemInCart: (id: string) => dispatch(toggleItemInCart(id)),
    fetchShoppingList: (id: string) => dispatch(fetchShoppingList(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingList)
