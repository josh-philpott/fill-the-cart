import React from "react"
import { NavigationScreenProp } from "react-navigation"
import {
  Container,
  Header,
  Icon,
  Body,
  Title,
  Left,
  Right,
  Button,
  Text,
  Content,
  View,
  Input,
  Picker
} from "native-base"
import { getEnumNames } from "../../../utils/EnumUtils"
import { PickerItem } from "react-native"

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
              onPress={() => {
                this.props.navigation.goBack()
              }}>
              <Icon name='close' />
              <Text style={{ paddingLeft: 0 }}>CANCEL</Text>
            </Button>
          </Left>
          <Right>
            <Button>
              <Icon name='save' />
              <Text style={{ paddingLeft: 0 }}>SAVE</Text>
            </Button>
          </Right>
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
          <View
            style={{
              flexDirection: "row",
              marginVertical: 10,
              width: 300
            }}>
            <Text style={{ alignSelf: "center", flex: 1 }}>Quantity</Text>
            <Input
              style={{
                borderBottomWidth: 2,
                borderColor: "#334393",
                width: 5,
                flex: 1,
                textAlign: "center"
              }}
              keyboardType='numeric'>
              {this.props.navigation.getParam("item").quantity}
            </Input>

            <Picker>
              <Picker.Item label='none' />
              <Picker.Item label='cups' />
              <Picker.Item label='pieces' />
              <Picker.Item label='tbsp' />
              <Picker.Item label='tsp' />
            </Picker>
          </View>
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
