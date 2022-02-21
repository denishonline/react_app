import { ADD_ITEM, REMOVE_ITEM, RESET_CART } from './../actions/cart';
import _ from "lodash";


const cart = (state = {}, action) => {
    switch (action.type) {

        case ADD_ITEM:

            const productId = action.payload.id;
            const tmpCartItems = _.cloneDeep(state);

            if ((_.keys(tmpCartItems)).includes((action.payload.id).toString())) {
                _.set(tmpCartItems, `${productId}.count`, _.get(tmpCartItems, `${productId}.count`, 0) + 1);
            } else {
                _.set(tmpCartItems, `${productId}.count`, 1);
            }

            _.set(tmpCartItems, `${productId}.name`, action.payload.name);
            _.set(tmpCartItems, `${productId}.price`, action.payload.price);
            _.set(tmpCartItems, `${productId}.id`, action.payload.id);

            return _.cloneDeep(tmpCartItems);

        case REMOVE_ITEM:
            const tmpCart = _.cloneDeep(state);

            if (action.id) {
                delete tmpCart[action.id];
            }

            return tmpCart;

        case RESET_CART:
            return {};

        default:
            return state;
    }
};
export default cart;