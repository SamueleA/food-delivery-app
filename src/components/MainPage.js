import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchRestaurants, updateOrders } from '../actions/actions';
import RestaurantMenu from './RestaurantMenu';
import { Link } from 'react-router-dom';
import './css/MainPage.css';

class MainPage extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.fetchRestaurants();
    }

    render() {
        let restaurantList = [];
        if (this.props.restaurants !== undefined){
            const restaurants = this.props.restaurants.entities.restaurants;
            restaurantList = Object.keys(restaurants).map((id)=>{
                return(
                    <li key={id}>
                        <RestaurantMenu name={restaurants[id].name} menu={restaurants[id].menu}/>
                    </li>
                ) 
            })
        }
        return (
            <div className="MainPageContainer">
                <h1 className="MainPageTitle">Make an Order</h1>
                <ul>
                    {restaurantList}
                </ul>
                <Link to="/MyOrders" onClick={this.props.updateOrders}><button>Submit Order</button></Link>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    restaurants: state.data.restaurants
});

export default  connect(mapStateToProps, { fetchRestaurants, updateOrders })(MainPage);
