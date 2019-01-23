import _ from "lodash"

import initialState from "./initialState"
import {
  ADD_ITEM_TO_SHOPPING_LIST,
  REMOVE_ITEM_FROM_SHOPPING_LIST,
  TOGGLE_ITEM_IN_CART
} from "../actions/actionTypes"

export default function shoppingList(state = initialState, action) {
  switch (action.type) {
    case ADD_ITEM_TO_SHOPPING_LIST:
      console.log("ADD_ITEM_TO_SHOPPING_LIST Action")
      return Object.assign({}, state, {
        items: [...state.items, action.item]
      })
    case REMOVE_ITEM_FROM_SHOPPING_LIST:
      console.log("REMOVE_ITEM_FROM_SHOPPING_LIST Action")
      let items = state.items
      _.remove(items, { id: action.id })
      return Object.assign({}, state, {
        items
      })
    case TOGGLE_ITEM_IN_CART: {
      let items = state.items
      let itemIndex = _.findLastIndex(items, { id: action.id })
      items[itemIndex].inCart = !items[itemIndex].inCart
      return Object.assign({}, state, {
        items
      })
    }
    default:
      return state
  }
}
