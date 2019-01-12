import React, { Component } from "react"
import { Input, Row, Col, Grid, Picker, Button, Text, View } from "native-base"

export default class AddItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: "Produce"
    }
  }

  onValueChange(value) {
    this.setState({ selected: value })
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
        >
          <Text>Add Item</Text>
        </Button>
      </View>
    )
  }
}
