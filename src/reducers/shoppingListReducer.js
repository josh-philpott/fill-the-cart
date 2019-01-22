import initialState from "./initialState"
import {
  FETCH_SHOPPING_LIST,
  RECEIVE_SHOPPING_LIST
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
    default:
      return state
  }
}
