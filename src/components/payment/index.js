import { React, useState } from "react";
import axiosClient from "./../../helpers/client";

const Payment = (props) => {
    const [amount, setAmount] = useState(null);
    const { paymentDetail } = props;

    const _handleSubmit = () => {

        const params = {
            "order_id": paymentDetail.orderId,
            "amount": paymentDetail.amount,
            "payment_type": "cash",
        }

        axiosClient.post(
            process.env.REACT_APP_API_URL + "/api/v1/transaction",
            params
        ).then((response) => {
            props.onBack();
        });
    }

    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
                <div>
                    <h3>Payment</h3>

                    <div className="form-group">
                        <label>Amount to be paid: ${paymentDetail.amount}</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter amount"
                            value={amount}
                            onChange={(e) => {
                                if (!isNaN(e.target.value)) {
                                    setAmount(e.target.value);
                                }
                            }}
                        />
                    </div>

                    <div className="form-group d-flex flex-row align-items-center py-2">
                    </div>

                    <div className="d-flex justify-content-between">
                        <button
                            className="btn btn-light btn-lg btn-block"
                            onClick={() => props.onBack()}
                        >
                            Back
                        </button>
                        {(amount > 0 && parseInt(amount) === parseInt(paymentDetail.amount)) && (
                            <button
                                className="btn btn-dark btn-lg btn-block"
                                onClick={() => _handleSubmit()}
                            >
                                Submit
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Payment;