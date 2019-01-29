import React from "react"
import { Input, Picker, Button, Text, View, Icon } from "native-base"
import uuidv1 from "uuid/v1"
import { GroceryItem } from "../../interfaces/ShoppingList/types"
import { StyleProp, ViewStyle } from "react-native"

export interface Props {
  onAddItem: (item: GroceryItem) => void
  style: StyleProp<ViewStyle>
}

interface State {
  selected: string
  text: string
}

export default class AddItem extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      selected: "Produce",
      text: ""
    }
  }

  onValueChange(value: string) {
    this.setState({ selected: value })
  }

  submitItem() {
    let item: GroceryItem = {
      id: uuidv1(),
      name: this.state.text,
      category: this.state.selected,
      inCart: false
    }
    this.setState({ text: "" })
    this.props.onAddItem(item)
  }

  render() {
    return (
      <View style={{ ...this.props.style }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            borderTopWidth: 1,
            borderTopColor: "#555555"
          }}>
          <Input
            style={{
              flex: 1,
              borderRightWidth: 1,
              borderRightColor: "#555555"
            }}
            placeholder='Add item'
            placeholderTextColor='#888888'
            autoFocus
            returnKeyType='go'
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
          />

          <Picker
            mode='dropdown'
            style={{
              flex: 3
            }}
            selectedValue={this.state.selected}
            onValueChange={this.onValueChange.bind(this)}>
            <Picker.Item label='Produce' value='Produce' />
            <Picker.Item label='Meat' value='Meat' />
            <Picker.Item label='Pantry' value='Pantry' />
          </Picker>
        </View>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <Button
            style={{
              flex: 1,
              justifyContent: "center",
              borderRadius: 0
            }}
            onPress={this.submitItem.bind(this)}>
            <Icon name='add' style={{ marginRight: 0 }} />
            <Text>Add Item</Text>
          </Button>
        </View>
      </View>
    )
  }
}
