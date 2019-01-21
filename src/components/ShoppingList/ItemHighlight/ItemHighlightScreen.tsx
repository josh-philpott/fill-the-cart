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
  Content
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
        <Content style={{ borderTopWidth: 2 }}>
          <Text>{this.props.navigation.getParam("item").name}</Text>
        </Content>
      </Container>
    )
  }
}
