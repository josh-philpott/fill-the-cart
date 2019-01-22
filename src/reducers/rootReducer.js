import { combineReducers } from "redux"
import shoppingList from "./shoppingListReducer"

const rootReducer = combineReducers({
  shoppingList
})

export default rootReducer
