import * as types from "./actionTypes"
import { GroceryItem } from "../interfaces/ShoppingList/types"

function url() {
  return "www.url.com"
}

export function receiveShoppingList(json) {
  return { type: types.RECEIVE_SHOPPING_LIST, stuff: json.stuff }
}

export function fetchShoppingList() {
  return dispatch => {
    return fetch(url(), {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: {
        "x-api-key": apiKey,
        Accept: "application/json"
      }
    })
      .then(response => response.json())
      .then(json => dispatch(receiveShoppingList(json)))
  }
}

export function addShoppingListItem(item: GroceryItem) {
  return { type: types.ADD_ITEM_TO_SHOPPING_LIST, item: item }
}
