import React from 'react'
import { NavigationScreenProp } from 'react-navigation'
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
} from 'native-base'
import { connect } from 'react-redux'
import {
  removeShoppingListItem,
  updateItem
} from '../../../actions/shoppingListActions'

export interface Props extends DispatchFromProps {
  navigation: NavigationScreenProp<any, any>
  onSave: (id: string, name: string, quantity: string) => void
}

class ItemHighlightScreen extends React.Component<Props, State> {
  static navigationOptions = {
    header: null
  }

  constructor(props: Props) {
    super(props)
    const item = this.props.navigation.getParam('item')
    this.state = {
      newName: item.name,
      newQuantity: item.quantity,
      newQuantityType: item.quantityType
    }
  }

  render() {
    const item = this.props.navigation.getParam('item')
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
            <Button
              onPress={() => {
                this.props.updateItem(
                  item.id,
                  this.state.newName,
                  this.state.newQuantity,
                  this.state.newQuantityType
                )
                this.props.navigation.goBack()
              }}>
              <Icon name='save' />
              <Text style={{ paddingLeft: 0 }}>SAVE</Text>
            </Button>
          </Right>
        </Header>
        <Content style={{ marginHorizontal: 10 }}>
          <Input
            style={{
              borderBottomWidth: 2,
              borderColor: '#334393'
            }}
            onChangeText={newName => this.setState({ newName })}
            value={this.state.newName}
          />
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              marginVertical: 10
            }}>
            <Text style={{ alignSelf: 'center' }}>Quantity</Text>
            <Input
              style={{
                borderBottomWidth: 2,
                borderColor: '#334393',
                width: 50,
                textAlign: 'center'
              }}
              keyboardType='numeric'
              onChangeText={newQuantity => this.setState({ newQuantity })}
              value={this.state.newQuantity}
            />

            <Picker
              style={{ flex: 2 }}
              selectedValue={this.state.newQuantityType}
              onValueChange={value => {
                this.setState({ newQuantityType: value })
              }}>
              <Picker.Item label='none' value='' />
              <Picker.Item label='cups' value='cups' />
              <Picker.Item label='pieces' value='pieces' />
              <Picker.Item label='tbsp' value='tbsp' />
              <Picker.Item label='tsp' value='tsp' />
            </Picker>
          </View>
        </Content>
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            flexDirection: 'row',
            justifyContent: 'space-around',
            fontSize: 20,
            color: 'red'
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
  updateItem: (
    id: string,
    name: string,
    quantity: number,
    quantityType: string
  ) => void
}

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchFromProps => {
  return {
    deleteItem: (id: string) => {
      dispatch(removeShoppingListItem(id))
    },
    updateItem: (
      id: string,
      name: string,
      quantity: number,
      quantityType: string
    ) => {
      dispatch(updateItem(id, name, quantity, quantityType))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemHighlightScreen)
