import React, { Component } from 'react'
import { connect } from 'react-redux';
import { addOneMenuItem, removeOneMenuItem } from '../actions/actions';
import './css/RestaurantMenu.css';

class RestaurantMenu extends Component {
  constructor(props) {
    super(props)

    this.addOne = this.addOne.bind(this);
    this.removeOne = this.removeOne.bind(this);
    this.showTotal = this.showTotal.bind(this);
  }

  addOne(e){
    const buttonData =  e.target.getAttribute('data-item');
    this.props.addOneMenuItem(buttonData);
  }

  removeOne(e) {
    const buttonData =  e.target.getAttribute('data-item');
    this.props.removeOneMenuItem(buttonData);
  }


  showTotal(item) {
    let amount = 0;
    
    if (this.props.myOrder !== undefined) {
      for(var i=0; i<this.props.myOrder.length; i++){
        if ( this.props.myOrder[i].name === item.name ) {
          amount = this.props.myOrder[i].quantity;
        }
      }
    }
    return amount;
  }

  render() {
    const menuList = this.props.menu.map((menuItem, index)=>{
      return (
        <tr key={index}>
          <td>{menuItem.name}</td>
          <td>{menuItem.price.toFixed(2)}$</td>
          <td>{this.showTotal(menuItem)}</td>
          <td><button className="addButton" onClick={this.addOne} data-item={JSON.stringify(Object.assign(menuItem, {restaurant: this.props.name}))}>+</button></td>
          <td><button className="removeButton"onClick={this.removeOne} data-item={JSON.stringify(Object.assign(menuItem, {restaurant: this.props.name}))}>-</button></td>
        </tr>
      )
    })
    return (
        <div className="menuBox">
          <h2 className="restaurantName">{this.props.name}</h2>
          <table>
            <tbody>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Amount</th>
                <th>Add</th>
                <th>Remove</th>
              </tr>
              {menuList}
            </tbody>
          </table>
          </div>
      )
    }
}

const mapStateToProps = state => ({
  myOrder: state.data.myOrder
});

export default  connect(mapStateToProps, { addOneMenuItem, removeOneMenuItem })(RestaurantMenu);
