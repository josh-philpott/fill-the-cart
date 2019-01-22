import * as types from "./actionTypes"

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
