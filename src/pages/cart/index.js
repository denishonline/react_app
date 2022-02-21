import { React } from "react";
import axiosClient from "../../helpers/client";
import { connect } from "react-redux"
import _ from "lodash";

import {
    removeFromCart,
    resetCart
} from "../../redux/actions/cart"

import {
    setTab,
} from "../../redux/actions/tab"


const Cart = (props) => {
    const { cart, setTab, resetCart } = props;

    let cartProducts = [];
    let totalQty = 0;
    let totalPrice = 0;
    _.forEach(cart, function (item) {

        const total = item.price * item.count;

        totalQty = totalQty + item.count;
        totalPrice = totalPrice + total;

        cartProducts.push({
            id: item.id,
            name: item.name,
            quantity: item.count,
            price: item.price,
            total_price: total,
        })
    });

    const _handleRemoveFromCart = (id) => {
        props.removeFromCart(id);
    }

    const _handleCompleteOrder = () => {

        const orderProducts = [];
        _.forEach(cartProducts, function (item) {
            orderProducts.push({
                item_id: item.id,
                quantity: item.quantity,
                price: item.price,
            })
        });

        const params = { order_items: JSON.stringify(orderProducts) };

        axiosClient.post(
            process.env.REACT_APP_API_URL + "/api/v1/order",
            params
        ).then((response) => {
            setTab("order");
            resetCart();
        });
    }

    const _renderListProduct = () => {

        return (
            <div className="w-50">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Price</th>
                            <th scope="col">Total</th>
                            <th scope="col"><div className="pl-3"></div></th>
                        </tr>
                    </thead>
                    <tbody>

                        {(!_.isEmpty(cartProducts)) && (
                            <>
                                {(cartProducts || []).map((product, i) => {

                                    return (
                                        <tr key={`id_${i}`}>
                                            <th scope="row">{i + 1}</th>
                                            <td>{product.name}</td>
                                            <td>{product.quantity}</td>
                                            <td>${product.price}</td>
                                            <td>${product.total_price}</td>
                                            <td>
                                                <span className="pl-2">
                                                    <button type="button" className="btn btn-danger" onClick={() => _handleRemoveFromCart(product.id)}>Delete</button>
                                                </span>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }

    return (
        <>
            {(_.size(cartProducts) > 0) ? (
                <>
                    <div className="d-flex align-items-end flex-column">
                        {_renderListProduct()}
                    </div >
                    <div className="d-flex align-items-end flex-column total_box">
                        <div>
                            <div>Total Quantity: {totalQty}</div>
                            <div>Total Price: ${totalPrice}</div>
                            <div className="pt-2">
                                <button type="button" className="btn btn-success py-2" onClick={() => _handleCompleteOrder()}>Complete Order</button>
                            </div>
                        </div>

                    </div>
                </>
            ) : (
                <div className="d-flex align-items-end flex-column jumbotron pt-3">
                    <h1 className="display-4">Empty cart!</h1>
                    <p className="lead">Please add few cartProducts.</p>
                </div>
            )}
        </>
    );
}

const mapStateToProps = state => {
    return {
        cart: state.cart,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        removeFromCart: (id) => dispatch(removeFromCart(id)),
        resetCart: () => dispatch(resetCart()),
        setTab: (tab) => dispatch(setTab(tab)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)