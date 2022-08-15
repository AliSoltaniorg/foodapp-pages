import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartValue = {
    items:[],
    totalAmount:0,
    addItem:()=>{},
    removeItem:()=>{}
}

const cartReducer = (state,action)=>{

    if(action.type === 'ADD'){

        const updatedTotalAmount = state.totalAmount + (action.item.price * action.item.amount);

        const existingItemIndex = state.items.findIndex(item=> item.id === action.item.id);

        const existingItem = state.items[existingItemIndex];
        
        let updatedItems = state.items;

        if(existingItem){

            const updatedItem = {
                ...existingItem,
                amount:existingItem.amount + action.item.amount
            };
            updatedItems = [...state.items]
            updatedItems[existingItemIndex] = updatedItem;

        }else{

            updatedItems = state.items.concat(action.item);

        }

        return {
            items:updatedItems,
            totalAmount:updatedTotalAmount
        }
    }else if(action.type === 'REMOVE'){

        const existingItemIndex = state.items.findIndex(item=> item.id === action.item);

        const existingItem = state.items[existingItemIndex];

        let updatedItems = state.items;

        if(existingItem){

            let updatedItem;
            
            if(existingItem.amount > 1){
                updatedItem = {
                    ...existingItem,
                    amount:existingItem.amount - 1
                }
                updatedItems = [...state.items]
                updatedItems[existingItemIndex] = updatedItem;

            }else{
                updatedItems = updatedItems.filter(item=> item.id !== action.item);
            }
        }else{
            return;
        }

        const updatedTotalAmount = updatedItems.reduce((amount,item) => amount+=(item.price * item.amount),0)

        return {
            items:updatedItems,
            totalAmount:updatedTotalAmount
        }
    }
    return defaultCartValue;
}

const CartContextProvider = props => {

    const [cartState,dispatchCart] = useReducer(cartReducer,defaultCartValue)

    const addItemHandler = (item) => {
        dispatchCart({type:'ADD',item:item})
    }

    const removeItemHandler = (id) => {
        dispatchCart({type:'REMOVE',item:id})
    }

    const cartData = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler
    }

    return <CartContext.Provider value={cartData}>{props.children}</CartContext.Provider>
}

export default CartContextProvider;