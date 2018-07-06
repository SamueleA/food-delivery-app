import { FETCH_RESTAURANTS, ADD_ONE_MENU_ITEM,
         REMOVE_ONE_MENU_ITEM, UPDATE_ORDERS,
         DELETE_ORDER_FROM_ORDERS, EDIT_ORDER,
         NEW_ORDER } from '../actions/types';
import dotProp from 'dot-prop-immutable';
        

const initialState = {
    myOrder:[],
    myOrderID:0,
    orders:[]
};

export default function(state = initialState, action) {
    switch(action.type) {
        case FETCH_RESTAURANTS:
        {
            return {
                ...state,
                restaurants: action.payload
            };
        }

        case ADD_ONE_MENU_ITEM:
        {
            let newState = {};
            let payload = JSON.parse(action.payload)
            // If first item in order
            if (state.myOrder.length === 0){
                payload.quantity=1;
                newState = dotProp.merge(state, `myOrder.0`, payload);
            } else {
                //Updating quantity of already existing item
                let found = false;
                for(var i=0; i<state.myOrder.length; i++) {
                    if (state.myOrder[i].name === payload.name && state.myOrder[i].restaurant === payload.restaurant) {
                        let newQuantity = state.myOrder[i].quantity + 1;
                        newState = dotProp.set(state, `myOrder.${i}.quantity`, newQuantity);
                        found = true;
                    }
                }
                //new item added to order
                if (found === false) {
                    payload.quantity=1;
                    newState = dotProp.merge(state, `myOrder`, payload);
                }
            }
            console.log('Added one item to the menu', newState.myOrder)
            return newState;
            
        }

        case REMOVE_ONE_MENU_ITEM:
        {
            let payload = JSON.parse(action.payload)
            let newState = {};
            for(var i=0; i<state.myOrder.length; i++) {
                if (state.myOrder[i].name === payload.name && state.myOrder[i].restaurant === payload.restaurant) {
                    if (state.myOrder[i].quantity <= 1) {
                        newState = dotProp.delete(state, `myOrder.${i}`);
                    } else {
                        let newQuantity = state.myOrder[i].quantity - 1;
                        newState = dotProp.set(state, `myOrder.${i}.quantity`, newQuantity);
                    }
                } 
            }
            console.log(newState);
            //Verification in the case nothing was updated
            if (!Object.keys(newState).length) {
                newState = state;
            }
            return newState;
        }

        case UPDATE_ORDERS:
        {
            // If it is the first order or if it is a new order
            if (state.orders.length === 0 || state.myOrderID > state.orders.length) {

                state.orders.push(state.myOrder);
            // If we are editing an existing order
            } else {
                state.orders[state.myOrderID] = state.myOrder;
            }
            return state;

            
        }

        case DELETE_ORDER_FROM_ORDERS:
        {
            let newState = Object.assign({}, state);
            let toDelete = action.payload;

            //newState.orders.splice(toDelete, 1)
            console.log('Deleted order #', toDelete);

            return dotProp.delete(state, `orders.${toDelete}`);
        
        }

        case EDIT_ORDER:
        {
            return {
                ...state,
                myOrderID: action.payload,
                myOrder: state.orders[action.payload]
            }
        }

        case NEW_ORDER:
        {   
            return {
                ...state,
                myOrder: [],
                myOrderID: state.orders.length
            }
        }

        default:
        {
            return state
        }
    }
}