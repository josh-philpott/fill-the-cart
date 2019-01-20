import React from "react"
import { ListItem, CheckBox, Text, Body, Right, Icon } from "native-base"

export interface Props {
  item: GroceryItem
  checked: boolean
  onCheck: (itemKey: string) => void
  onDelete: (itemKey: string) => void
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

  handleCheckClick() {
    this.setState({ checked: !this.state.checked })
    //give a little bit for the check animation to start
    setTimeout(() => {
      this.props.onCheck(this.props.item.id)
    }, 10)
  }

  render() {
    return (
      <ListItem>
        <CheckBox
          onPress={this.handleCheckClick.bind(this)}
          checked={this.state.checked}
        />
        <Body>
          <Text>{this.props.item.name}</Text>
        </Body>
        <Right>
          <Icon
            name="trash"
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
