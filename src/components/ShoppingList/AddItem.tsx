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
  categories: string[]
}

export default class AddItem extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      selected: "Uncategorized",
      text: "",
      categories: [
        "Uncategorized",
        "Baking",
        "Cereal",
        "Condiments & Oils",
        "Dairy",
        "Frozen",
        "Herbs & Spices",
        "Household",
        "Meat",
        "Produce"
      ]
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
            borderColor: "#555555",
            borderWidth: 1
          }}>
          <Picker
            mode='dropdown'
            style={{
              flex: 1
            }}
            selectedValue={this.state.selected}
            onValueChange={this.onValueChange.bind(this)}>
            {this.state.categories.map(category => (
              <Picker.Item key={category} label={category} value={category} />
            ))}
          </Picker>
          <Input
            style={{
              height: 48,
              flex: 1,
              borderLeftWidth: 1,
              borderLeftColor: "#555555"
            }}
            placeholder='Add item'
            placeholderTextColor='#888888'
            autoFocus
            returnKeyType='go'
            onChangeText={text => this.setState({ text })}
            onSubmitEditing={this.submitItem.bind(this)}
            value={this.state.text}
          />
          <Button
            transparent
            style={{ height: 50 }}
            onPress={this.submitItem.bind(this)}>
            <Icon name='checkmark' />
          </Button>
        </View>
      </View>
    )
  }
}
