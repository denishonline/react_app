import { React, useState, useEffect } from "react";
import axiosClient from "./../../helpers/client";
import Payment from "../../components/payment";
import { connect } from "react-redux"
import moment from "moment";
import _ from "lodash";

import {
    addToCart,
} from "./../../redux/actions/cart"

const initialPaymentState = {
    orderId: null,
    amount: null
}

const Order = (props) => {
    const [orders, setOrders] = useState([]);
    const [payment, setPayment] = useState(initialPaymentState);

    const getOrders = () => {
        axiosClient.get(process.env.REACT_APP_API_URL + "/api/v1/order").then((response) => {
            setOrders(response.data.data);
        });
    };

    const remove = async (id) => {
        axiosClient.delete(process.env.REACT_APP_API_URL + "/api/v1/order/" + id, {
            id: id,
        }).then((response) => {
            getOrders();
        });
    }

    const _handlePayment = (orderId, amount) => {
        setPayment({
            orderId,
            amount
        })
    }

    const _handleBack = () => {
        setPayment(initialPaymentState);
        getOrders();
    }

    useEffect(() => {
        getOrders();
    }, []);

    const _renderListOrder = () => {
        return (
            <>
                <table className="table table-striped w-75">
                    <thead>
                        <tr>
                            <th scope="col">Created At</th>
                            <th scope="col">Order Number</th>
                            <th scope="col">Products</th>
                            <th scope="col">Total Price</th>
                            <th scope="col">Status</th>
                            <th scope="col"><div className="pl-3">Actions</div></th>
                        </tr>
                    </thead>
                    <tbody>
                        {(!_.isEmpty(orders)) && (
                            <>
                                {(orders || []).map((order, i) => {

                                    const orderItems = (order.OrderItems || []).map((item) => item.Product.name);

                                    return (
                                        <tr key={`id_${i}`}>
                                            <th scope="row">{moment(order.createdAt).format("YYYY-MM-DD hh:mm:ss A")}</th>
                                            <td>{order.order_number}</td>
                                            <td>{orderItems.join(", ")}</td>
                                            <td>${order.total}</td>
                                            <td className="text-capitalize">{order.status}</td>
                                            <td>
                                                <span className="pl-2">
                                                    {(order.status === "pending") && (
                                                        <>
                                                            <button type="button" className="btn btn-success" onClick={() => _handlePayment(order.id, order.total)}>Pay</button>
                                                            <span className="pl-2">
                                                                <button type="button" className="btn btn-danger" onClick={() => remove(order.id)}>Cancel</button>
                                                            </span>
                                                        </>
                                                    )}
                                                </span>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </>
                        )}
                    </tbody>
                </table>
            </>
        );
    }

    return (
        <div>
            {(payment.orderId) ? (
                <div className="d-flex justify-content-center align-items-center payment-box">
                    <Payment
                        paymentDetail={payment}
                        onBack={() => _handleBack()}
                    />
                </div >
            ) : (
                <div className="d-flex justify-content-center align-self-center">
                    {_renderListOrder()}
                </div >
            )}
        </div >
    );
}

const mapDispatchToProps = dispatch => {
    return {
        addToCart: (payload) => dispatch(addToCart(payload)),
    }
}

export default connect(null, mapDispatchToProps)(Order)