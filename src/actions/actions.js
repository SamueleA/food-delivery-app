import { FETCH_RESTAURANTS, ADD_ONE_MENU_ITEM,
         REMOVE_ONE_MENU_ITEM, UPDATE_ORDERS,
         DELETE_ORDER_FROM_ORDERS, EDIT_ORDER,
         NEW_ORDER } from './types';
import Axios from 'axios';
import { schema, normalize  } from 'normalizr';


const restaurant = new schema.Entity('restaurants');
const dataSchema = [ restaurant ];

export const fetchRestaurants = () => dispatch => {
    Axios.get('https://huddolapi-next.herokuapp.com/v1/challenge')
        .then(res => res.data)
        .then(data => 
          dispatch({
                type: FETCH_RESTAURANTS,
                payload: normalize(data, dataSchema)
            })
        )
}

export const addOneMenuItem = (item) => dispatch => {
    dispatch({
        type: ADD_ONE_MENU_ITEM,
        payload: item
    })
}

export const removeOneMenuItem = (item) => dispatch => {
    dispatch({
        type: REMOVE_ONE_MENU_ITEM,
        payload: item
    })
}

export const updateOrders = () => dispatch => {
    dispatch({
        type: UPDATE_ORDERS,
    })
}

export const deleteOrderFromOrders = (item) => dispatch => {
    dispatch({
        type: DELETE_ORDER_FROM_ORDERS,
        payload: item
    })
}

export const editOrder = (item) => dispatch => {
    dispatch({
        type: EDIT_ORDER,
        payload: item
    })
}

export const newOrder = (item) => dispatch => {
    dispatch({
        type: NEW_ORDER,
        payload: item
    })
}