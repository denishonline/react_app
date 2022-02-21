import { React } from "react";
import { connect } from "react-redux"

import {
    Switch,
    Route,
} from "react-router-dom";
import Dashboard from "../../pages/dashboard";
import Product from "../../pages/product";
import Order from "../../pages/order";
import Cart from "../cart";
import Header from "../../components/common/header";

const Application = (props) => {

    const { selectedTab } = props;

    let component = Dashboard;
    if (selectedTab === "product") {
        component = Product;
    } else if (selectedTab === "cart") {
        component = Cart;
    } else if (selectedTab === "order") {
        component = Order;
    }

    return (
        <div className="container">
            <Header
            //setTab={(tab) => setTab(tab)}
            />
            <Switch>
                <Route path="/" component={component} />
            </Switch>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        selectedTab: state.tab,
    }
}

export default connect(mapStateToProps, null)(Application)