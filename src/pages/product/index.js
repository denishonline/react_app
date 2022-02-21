import { React, useState, useEffect } from "react";
import { Modal } from 'react-bootstrap';
import axiosClient from "./../../helpers/client";
import { connect } from "react-redux"
import _ from "lodash";

import {
    addToCart,
} from "./../../redux/actions/cart"

const productState = {
    name: "",
    sku: "",
    price: "",
};

const Product = (props) => {
    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false);
    const [editId, setEditId] = useState(null);
    const [error, setError] = useState(true);

    const [product, setProduct] = useState(productState);
    const { name, sku, price } = product;


    const getProducts = () => {
        axiosClient.get(process.env.REACT_APP_API_URL + "/api/v1/product").then((response) => {
            setProducts(response.data.data);
        });
    };

    const save = async () => {

        const params = {
            name: product.name,
            sku: product.sku,
            price: product.price,
        }

        if (editId) {
            axiosClient.put(
                process.env.REACT_APP_API_URL + "/api/v1/product/" + editId,
                params
            ).then((response) => {
                setOpen(false);
                setEditId(null);
                getProducts();
            });
        } else {

            axiosClient.post(
                process.env.REACT_APP_API_URL + "/api/v1/product",
                params
            ).then((response) => {
                setOpen(false);
                setEditId(null);
                getProducts();
            });
        }
    }

    const remove = async (id) => {
        axiosClient.delete(process.env.REACT_APP_API_URL + "/api/v1/product/" + id, {
            id: id,
        }).then((response) => {
            getProducts();
        });
    }

    const onClose = () => {
        setOpen(false);
        setEditId(null);
    }

    const validateFields = () => {
        if (name && sku && price) {
            setError(false);
        } else {
            setError(true);
        }
    }


    const _handleOnChange = (field, value) => {

        setProduct((prevState) => ({
            ...prevState,
            [field]: value
        }));
    }

    const _handleAddToCart = (product) => {
        props.addToCart({
            id: product.id,
            name: product.name,
            price: product.price
        })
    }

    const _handleAddProduct = () => {
        setOpen(true);
    }

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        if (open === false) setProduct({});
        setError(true);
    }, [open]);

    useEffect(() => {
        validateFields();
    }, [product]);

    useEffect(() => {
        if (editId) {

            const editProduct = products.find((p) => p.id === editId);

            setProduct({
                name: editProduct.name,
                sku: editProduct.sku,
                price: editProduct.price,
            });

            setOpen(true);
        }
    }, [editId]);



    const _renderAddProduct = () => {

        return (
            <div className="pt-4">
                <button type="button" className="btn btn-primary float-right" onClick={() => _handleAddProduct()}>
                    Add Product
                </button>
                <Modal
                    show={open}
                    onHide={() => onClose()}
                >
                    <Modal.Header>
                        <h5 className="modal-title" id="exampleModalLongTitle">
                            {(editId) ? "Edit" : "New"} Product
                        </h5>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" value={name} className="form-control"
                                onChange={(e) => { _handleOnChange("name", e.target.value) }}
                            />
                        </div>
                        <div className="form-group pt-2">
                            <label>SKU</label>
                            <input type="text" value={sku} className="form-control"
                                onChange={(e) => { _handleOnChange("sku", e.target.value) }}
                            />
                        </div>
                        <div className="form-group pt-2">
                            <label>Price</label>
                            <input type="text" value={price} className="form-control"
                                onChange={(e) => { _handleOnChange("price", e.target.value) }}
                            />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" className="btn btn-secondary" onClick={() => onClose()}>Close</button>
                        {(error === false) && (
                            <button type="button" className="btn btn-primary" onClick={() => save()}>Save changes</button>
                        )}
                    </Modal.Footer>
                </Modal>

            </div>
        );
    }

    const _renderListProduct = () => {

        return (
            <>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Sku</th>
                            <th scope="col">Price</th>
                            <th scope="col"><div className="pl-3">Actions</div></th>
                        </tr>
                    </thead>
                    <tbody>

                        {(!_.isEmpty(products)) && (
                            <>
                                {(products || []).map((product, i) => {

                                    return (
                                        <tr key={`id_${i}`}>
                                            <th scope="row">{i + 1}</th>
                                            <td>{product.name}</td>
                                            <td>{product.sku}</td>
                                            <td>{product.price}</td>
                                            <td>
                                                <button type="button" className="btn btn-success" onClick={() => _handleAddToCart(product)}>Add to Cart</button>
                                                <span className="pl-2">
                                                    <button type="button" className="btn btn-primary" onClick={() => setEditId(product.id)}>Edit</button>
                                                </span>
                                                <span className="pl-2">
                                                    <button type="button" className="btn btn-danger" onClick={() => remove(product.id)}>Delete</button>
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
            {_renderAddProduct()}
            {_renderListProduct()}
        </div >
    );
}

const mapDispatchToProps = dispatch => {
    return {
        addToCart: (payload) => dispatch(addToCart(payload)),
    }
}

export default connect(null, mapDispatchToProps)(Product)