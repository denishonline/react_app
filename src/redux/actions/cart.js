export const ADD_ITEM = 'ADD_ITEM';

export const REMOVE_ITEM = 'REMOVE_ITEM';

export const RESET_CART = 'RESET_CART';

export const addToCart = (payload) => {
    return {
        type: ADD_ITEM,
        payload
    };

};
export const removeFromCart = (id) => {
    return {
        type: REMOVE_ITEM,
        id
    };
};

export const resetCart = () => {
    return {
        type: RESET_CART,
    };
};

