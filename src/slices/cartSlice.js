import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
        loading: false,
        shippingInfo: localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')) : {}
    },
    reducers: {
        addcartItemRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        addcartItemSucsess(state, action) {
            const item = action.payload
            const isItemExist = state.items.find(i => i.product == item.product)
            if (isItemExist) {
                state = {
                    ...state,
                    loading: false,
                }
            }
            else {
                state = {
                    items: [...state.items, item],
                    loading: false
                }
                localStorage.setItem('cartItems', JSON.stringify(state.items))
            }
            return state
        },

        increaseItemQnty(state, action) {
            state.items = state.items.map(item => {
                if (item.product == action.payload) {
                    item.quantity = item.quantity + 1;
                }
                return item;
            })
            localStorage.setItem('cartItems', JSON.stringify(state.items))
        },

        dcreaseItemQnty(state, action) {
            state.items = state.items.map(item => {
                if (item.product == action.payload) {
                    item.quantity = item.quantity - 1;
                }
                return item;
            })
            localStorage.setItem('cartItems', JSON.stringify(state.items))
        },
        removeItemfromCart(state, action) {
            const filterItem = state.items.filter(item => {
                return item.product !== action.payload
            })
            localStorage.setItem('cartItems', JSON.stringify(filterItem));

            return {
                ...state,
                items: filterItem
            }
        },
        saveshippingInfo(state, action) {
            localStorage.setItem('shippingInfo', JSON.stringify(action.payload));
            return {
                ...state,
                shippingInfo: action.payload
            }
        },
        orderCompleted(state, action) {
            localStorage.removeItem('shippingInfo');
            localStorage.removeItem('cartItems');
            sessionStorage.removeItem('orderInfo');
            return {
                items:[],
                loading:false,
                shippingInfo:{}
            }
        }


        // addcartItemFail(state, action) {
        //     return {
        //         loading: false,
        //         error: action.payload
        //     }
        // }
    }
});

const { actions, reducer } = cartSlice;

export const { addcartItemRequest, addcartItemSucsess, increaseItemQnty, dcreaseItemQnty, removeItemfromCart,saveshippingInfo,orderCompleted } = actions

export default reducer;
