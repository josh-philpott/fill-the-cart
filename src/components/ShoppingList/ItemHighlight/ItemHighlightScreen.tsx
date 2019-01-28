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
import { connect } from "react-redux"
import { removeShoppingListItem } from "../../../actions/shoppingListActions"

export interface Props extends DispatchFromProps {
  navigation: NavigationScreenProp<any, any>
}

class ItemHighlightScreen extends React.Component<Props, State> {
  static navigationOptions = {
    header: null
  }

  constructor(props: Props) {
    super(props)
    this.state = {}
  }

  render() {
    const item = this.props.navigation.getParam("item")
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
            value={item.name}
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
              {item.quantity}
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
          <Button
            transparent
            onPress={() => {
              this.props.deleteItem(item.id)
              this.props.navigation.goBack()
            }}>
            <Icon name='trash' />
            <Text style={{ paddingLeft: 0 }}>Delete</Text>
          </Button>
        </View>
      </Container>
    )
  }
}

interface StateFromProps {}

const mapStateToProps = (state: any): StateFromProps => {
  return {}
}

interface DispatchFromProps {
  deleteItem: (id: string) => void
}

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchFromProps => {
  return {
    deleteItem: (id: string) => {
      dispatch(removeShoppingListItem(id))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemHighlightScreen)
