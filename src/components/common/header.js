import { React } from "react";
import { connect } from "react-redux";
import _ from "lodash";

import {
    setTab,
} from "./../../redux/actions/tab"

const Header = (props) => {

    const { cart, setTab, selectedTab } = props;

    const logout = () => {
        localStorage.removeItem("access-token");
        window.location.href = "/login";
    }

    let cartCount = 0;
    _.forEach(cart, function (item) {
        cartCount = item.count + cartCount;
    });

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a href="/#" className="navbar-brand" onClick={() => setTab("home")}>[ React Node Demo ]</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mr-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a href="/#" className={`nav-link cursor-pointer ${(selectedTab === "home") ? "text-primary" : ""}`} aria-current="page" onClick={() => setTab("home")}>Home</a>
                        </li>
                        <li className="nav-item">
                            <a href="/#" className={`nav-link cursor-pointer ${(selectedTab === "product") ? "text-primary" : ""}`} onClick={() => setTab("product")}>Products</a>
                        </li>
                        <li className="nav-item">
                            <a href="/#" className={`nav-link cursor-pointer ${(selectedTab === "order") ? "text-primary" : ""}`} onClick={() => setTab("order")}>Orders</a>
                        </li>
                    </ul>
                    <form className="d-flex">
                        <a href="/#" className={`nav-link text-success cursor-pointer pr-5 ${(selectedTab === "cart") ? "text-primary" : ""}`} onClick={() => setTab("cart")}>Cart {(cartCount > 0) ? `[${cartCount}]` : ""}</a>
                        <button className="btn btn-outline-success" onClick={() => logout()} >Logout</button>
                    </form>
                </div>
            </div>
        </nav>
    );
}

const mapStateToProps = state => {
    return {
        cart: state.cart,
        selectedTab: state.tab,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setTab: (tab) => dispatch(setTab(tab)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)