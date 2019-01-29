import * as types from "./actionTypes"
import { GroceryItem } from "../interfaces/ShoppingList/types"
import { apiUrl } from "../../constants"

export function addShoppingListItem(item: GroceryItem) {
  return { type: types.ADD_ITEM_TO_SHOPPING_LIST, item: item }
}

export function removeShoppingListItem(id: string) {
  return { type: types.REMOVE_ITEM_FROM_SHOPPING_LIST, id }
}

export function toggleItemInCart(id: string) {
  return { type: types.TOGGLE_ITEM_IN_CART, id }
}

export const requestShoppingList = (id: string) => ({
  type: types.REQUEST_SHOPPING_LIST,
  id
})

export function receiveShoppingList(list: GroceryItem[]) {
  return { type: types.RECEIVE_SHOPPING_LIST, list }
}

export const fetchShoppingList = (id: string) => (dispatch: Dispatch<any>) => {
  dispatch(requestShoppingList(id))
  return fetch(`${apiUrl}/lists/${id}`)
    .then(response => response.json())
    .then(json => dispatch(receiveShoppingList(json)))
    .catch(error => console.log(error))
}

export function updateItem(id: string, name: string, quantity: number) {
  return { type: types.UPDATE_ITEM, id, name, quantity }
}
//TODO: Not handling errors yet
export function errorFetchingShoppingList(error: string) {
  return { type: types.ERROR_FETCH_SHOPPING_LIST, error }
}
