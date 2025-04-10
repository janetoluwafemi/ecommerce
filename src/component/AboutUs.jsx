import React from 'react';
import {Link} from "react-router-dom";
import image1 from '../images/ecommerce-mcommerce-featured-image-5fd09a3a5ff2a-1-1.png'
import '../styles/AboutUs.css'

function AboutUs() {
    return (
        <div className="AboutUscontainer">
            <div className="links">
                <nav>
                    <ul>
                        <li><Link to="/create_product">Create Product</Link></li>
                        <li><Link to="/delete_product">Delete Product</Link></li>
                        <li><Link to="/find_product">Find Product</Link></li>
                        <li><Link to="/add_to_cart">Add To Cart</Link></li>
                        <li><Link to="/delete_from_cart">Delete From Cart</Link></li>
                        <li><Link to="/make_payment">Make Payment</Link></li>
                    </ul>
                </nav>
            </div>
            <div className="about_image">
            <img src={image1} alt={image1}/>
            </div>
            <div>
                <h1>An Ecommerce App</h1>
            </div>
            <div>
                <h3>
                    A app for saving product in a cart, when the user is already registered,
                </h3>
                <h3>
                    and the user can also deleted product from a cart, and also find product by name.
                </h3>
            </div>
        </div>
    )
}

export default AboutUs
