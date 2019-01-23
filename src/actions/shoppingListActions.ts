import * as types from "./actionTypes"
import { GroceryItem } from "../interfaces/ShoppingList/types"

export function addShoppingListItem(item: GroceryItem) {
  return { type: types.ADD_ITEM_TO_SHOPPING_LIST, item: item }
}

export function removeShoppingListItem(id: string) {
  return { type: types.REMOVE_ITEM_FROM_SHOPPING_LIST, id }
}

export function toggleItemInCart(id: string) {
  return { type: types.TOGGLE_ITEM_IN_CART, id }
}
