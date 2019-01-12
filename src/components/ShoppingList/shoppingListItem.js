import React, { Component } from "react"
import { ListItem, CheckBox, Text, Body } from "native-base"

export default class ShoppingListItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: false
    }
  }

  handleCheckClick() {
    console.log("clicked check box", this.state)
    this.setState({ checked: !this.state.checked })
  }

  render() {
    return (
      <ListItem onPress={this.handleCheckClick.bind(this)}>
        <CheckBox checked={this.state.checked} />
        <Body>
          <Text>{this.props.item}</Text>
        </Body>
      </ListItem>
    )
  }
}
