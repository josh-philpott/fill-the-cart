import initialState from "./initialState"
import {
  FETCH_SHOPPING_LIST,
  RECEIVE_SHOPPING_LIST,
  ADD_ITEM_TO_SHOPPING_LIST
} from "../actions/actionTypes"

export default function shoppingList(state = initialState, action) {
  let newState
  switch (action.type) {
    case FETCH_SHOPPING_LIST:
      console.log("FETCH_SHOPPING_LIST Action")
      return action
    case RECEIVE_SHOPPING_LIST:
      newState = action.stuff
      console.log("RECEIVE_SHOPPING_LIST Action")
      return newState
    case ADD_ITEM_TO_SHOPPING_LIST:
      console.log("ADD_ITEM_TO_SHOPPING_LIST Action")
      return Object.assign({}, state, {
        items: [...state.items, action.item]
      })
    default:
      return state
  }
}
