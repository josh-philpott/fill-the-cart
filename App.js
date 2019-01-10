import React, { Component } from "react"
import { FlatList, View, SafeAreaView, Text } from "react-native"

export default class AwkwardScrollingImageWithText extends Component {
  render() {
    return (
      <SafeAreaView>
        <FlatList
          data={[{ key: "a" }, { key: "b" }]}
          renderItem={({ item }) => <Text>{item.key}</Text>}
        />
      </SafeAreaView>
    )
  }
}
