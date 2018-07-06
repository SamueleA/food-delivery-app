import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {  editOrder, newOrder } from '../actions/actions';
import OrderList from './OrderList';
import './css/MyOrders.css';

class MyOrders extends Component {

  render() {
    let orders=[];
    if (this.props.orders !== undefined) {
        orders = this.props.orders.map((order, index)=>{
            return <OrderList key={index} id={index} order={order} />
        }) 
    }
    return (
      <div className="MyOrdersContainer">
        <h1 className="OrderPageTitle">Your Orders</h1>
        {orders}
        <Link to="/" onClick={this.props.newOrder}><button>New Order</button></Link>
      </div>
    )
  }
}
const mapStateToProps = state => ({
    orders: state.data.orders,
    myOrderID: state.data.myOrderID,
    myOrder: state.data.myOrder
});

export default  connect(mapStateToProps, {  editOrder, newOrder })(MyOrders);
