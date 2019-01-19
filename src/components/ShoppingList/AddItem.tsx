import React from "react"
import { Input, Picker, Button, Text, View } from "native-base"

export interface Props {
  onAddItem: (name: string, category: string) => void
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
    console.log(`Add ${this.state.text} to ${this.state.selected}`)
    this.props.onAddItem(this.state.text, this.state.selected)
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: "row" }}>
        <Input
          style={{
            flex: 1,
            borderRightWidth: 1,
            borderRightColor: "#555555"
          }}
          placeholder="Add Item..."
          onChangeText={text => this.setState({ text })}
        />

        <Picker
          note
          mode="dropdown"
          style={{
            flex: 3
          }}
          selectedValue={this.state.selected}
          onValueChange={this.onValueChange.bind(this)}
        >
          <Picker.Item label="Produce" value="Produce" />
          <Picker.Item label="Meat" value="Meat" />
          <Picker.Item label="Pantry" value="Pantry" />
        </Picker>

        <Button
          style={{
            flex: 1,
            borderRadius: 0
          }}
          onPress={this.submitItem.bind(this)}
        >
          <Text>Add Item</Text>
        </Button>
      </View>
    )
  }
}
