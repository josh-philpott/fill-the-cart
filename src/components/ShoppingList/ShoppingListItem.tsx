import React from "react"
import { ListItem, CheckBox, Text, Body, Right, Icon } from "native-base"
import { quantityType } from "../../interfaces/ShoppingList/enums"
import { GroceryItem } from "../../interfaces/ShoppingList/types"

export interface Props {
  item: GroceryItem
  checked: boolean
  onCheck: (itemKey: string) => void
  onDelete: (itemKey: string) => void
  onPress: (item: GroceryItem) => void
}

interface State {
  checked: boolean
}

export default class ShoppingListItem extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      checked: props.checked
    }
  }

  /**
   * This is probably an anti-pattern in redux. I'll
   * come back to this when I have a little more experience
   */
  handleCheckClick() {
    this.setState({ checked: !this.state.checked })
    //give a little bit for the check animation to start
    setTimeout(() => {
      this.props.onCheck(this.props.item.id)
    }, 10)
  }

  buildQuantityString(): string {
    let quantity: string = ""
    if (this.props.item.quantity) {
      quantity += " - " + this.props.item.quantity
    }

    if (this.props.item.quantityType) {
      quantity += " " + quantityType[this.props.item.quantityType]
    }

    return quantity
  }

  render() {
    let quantityString: string = this.buildQuantityString()

    return (
      <ListItem
        onPress={() => {
          this.props.onPress(this.props.item)
        }}>
        <CheckBox
          onPress={this.handleCheckClick.bind(this)}
          checked={this.state.checked}
          hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
        />
        <Body style={{ flexDirection: "row" }}>
          <Text style={{ marginRight: 0 }}>{this.props.item.name}</Text>
          <Text
            style={{ fontStyle: "italic", color: "dimgray", marginLeft: 0 }}>
            {quantityString}
          </Text>
        </Body>
        <Right>
          <Icon
            name='trash'
            style={{ fontSize: 30, color: "red" }}
            onPress={() => {
              this.props.onDelete(this.props.item.id)
            }}
          />
        </Right>
      </ListItem>
    )
  }
}
