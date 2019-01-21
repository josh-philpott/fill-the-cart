import React from "react"
import { NavigationScreenProp } from "react-navigation"
import {
  Container,
  Header,
  Icon,
  Body,
  Title,
  Left,
  Button,
  Text,
  Content,
  View,
  Input
} from "native-base"

export interface Props {
  navigation: NavigationScreenProp<any, any>
}

interface State {}

export default class ItemHighlightScreen extends React.Component<Props, State> {
  static navigationOptions = {
    header: null
  }

  constructor(props: Props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.goBack()
              }}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Item Highlight</Title>
          </Body>
        </Header>
        <Content style={{ marginHorizontal: 10 }}>
          <Input
            style={{
              borderBottomWidth: 2,
              borderColor: "#334393"
            }}
            onChangeText={text => this.setState({ text })}
            value={this.props.navigation.getParam("item").name}
          />
        </Content>
        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            flexDirection: "row",
            justifyContent: "space-around",
            fontSize: 20,
            color: "red"
          }}>
          <Button transparent>
            <Icon name='trash' />
            <Text style={{ paddingLeft: 0 }}>Delete</Text>
          </Button>
        </View>
      </Container>
    )
  }
}
