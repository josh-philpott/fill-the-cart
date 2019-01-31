import React, { Dispatch } from "react"
import { SectionList, ScrollView } from "react-native"
import { Content, Text, Separator, View } from "native-base"

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
    let mainContent
    if (this.props.itemsByCategory.length > 0) {
      mainContent = (
        <View style={{ flex: 1 }}>
          <SectionList
            style={{ flex: 1 }}
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
                onPress={this.props.onItemClick}
              />
            )}
            keyExtractor={item => {
              return item.id
            }}
          />
        </View>
      )
    } else {
      mainContent = (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>There are no items in your list...</Text>
        </View>
      )
    }

    return (
      <Content contentContainerStyle={{ flex: 1 }}>
        <View style={{ backgroundColor: "#3F51B5" }}>
          <AddItem
            style={{
              height: 50,
              margin: 10,
              backgroundColor: "white",
              borderColor: "white"
            }}
            onAddItem={this.props.addItem}
          />
        </View>
        {mainContent}
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
  toggleItemInCart: (id: string) => void
  fetchShoppingList: (id: string) => void
}

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchFromProps => {
  return {
    addItem: (item: GroceryItem) => dispatch(addShoppingListItem(item)),
    toggleItemInCart: (id: string) => dispatch(toggleItemInCart(id)),
    fetchShoppingList: (id: string) => dispatch(fetchShoppingList(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingList)
