import _ from "lodash"

import initialState from "./initialState"
import {
  ADD_ITEM_TO_SHOPPING_LIST,
  REMOVE_ITEM_FROM_SHOPPING_LIST,
  TOGGLE_ITEM_IN_CART,
  FETCH_SHOPPING_LIST,
  RECEIVE_SHOPPING_LIST,
  UPDATE_ITEM,
  ERROR_FETCH_SHOPPING_LIST,
  REQUEST_SHOPPING_LIST
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
      let itemIndex = _.findLastIndex(items, {
        id: action.id
      })
      items[itemIndex].inCart = !items[itemIndex].inCart
      return Object.assign({}, state, {
        items
      })
    }
    case REQUEST_SHOPPING_LIST: {
      return {
        ...state,
        isFetching: true
      }
    }
    case RECEIVE_SHOPPING_LIST: {
      return {
        ...state,
        items: action.list,
        isFetching: false
      }
    }
    case UPDATE_ITEM: {
      let items = state.items
      let itemIndex = _.findLastIndex(items, {
        id: action.id
      })
      items[itemIndex].name = action.name
      items[itemIndex].quantity = action.quantity
      return Object.assign({}, state, {
        items
      })
    }
    case ERROR_FETCH_SHOPPING_LIST: {
    }
    default:
      return state
  }
}
