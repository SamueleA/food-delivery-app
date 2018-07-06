import React, { Component } from 'react'
import { connect } from 'react-redux';
import {  deleteOrderFromOrders, editOrder } from '../actions/actions';
import { Link } from 'react-router-dom';
import './css/OrderList.css';

class OrderList extends Component {
  constructor(props){
    super(props);
    this.totalDue = this.totalDue.bind(this);
    this.clickDelete = this.clickDelete.bind(this);
    this.clickEdit = this.clickEdit.bind(this);
  }

  totalDue() {
    let theTotal =0;
    this.props.order.forEach((item)=>{
      theTotal += item.quantity * item.price
    });
    return theTotal.toFixed(2);
  }

  clickDelete() {
    this.props.deleteOrderFromOrders(this.props.id);
  }
  clickEdit() {
    this.props.editOrder(this.props.id);
  }

  render() {
    const orderContent = this.props.order.map((item, index)=>{
      return (
        <li key={index}>{item.quantity} {item.name} from {item.restaurant} for {(item.quantity*item.price).toFixed(2)}$</li>
      )
    });

    return (
      <div className="orderBox">
        <h2>Order # {this.props.id + 1}</h2>

        <ul>
          {orderContent}
        </ul>
        <hr className="totalHr"/>
        <p>Total: {this.totalDue()}$</p>
        <div>
          <Link to="/" onClick={this.clickEdit}><button>Edit Order</button></Link>
          <button onClick={this.clickDelete}>Remove Order</button>
        </div>
      </div>
    )
  }
}

export default  connect(null, {  deleteOrderFromOrders, editOrder })(OrderList);

