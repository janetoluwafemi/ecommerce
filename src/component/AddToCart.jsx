import React, { useState } from 'react';
import axios from "axios";

function AddToCart() {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [userId, setUserId] = useState('');
    const [productId, setProductId] = useState('');
    const [cart, setCart] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userFromSession = sessionStorage.getItem('userId');
        const userFromLocalStorage = localStorage.getItem('userId');
        const storedProductId = localStorage.getItem('productId');

        const currentUserId = userFromSession || userFromLocalStorage;
        const currentProduct = storedProductId;
        setUserId(currentUserId);
        setProductId(currentProduct);

        if (!currentUserId) {
            alert("Please log in to add a product to your cart.");
            return;
        }

        if (!storedProductId) {
            alert("Please select a product first.");
            return;
        }

        if (!name) {
            alert("Please enter a product name.");
            return;
        }

        setLoading(true);
        setError('');
        setMessage('');
        console.log("Form is being submitted!");

        try {
            const response = await axios.post(
                `http://localhost:8083/cart`,
                { name: name, userId: currentUserId, productId: currentProduct }
            );
            setCart(prevCart => [...prevCart, response.data]);

            setMessage("Product successfully added to cart!");
            console.log(response.data);
        } catch (error) {
            console.error('There was an error!', error);
            setError('Error adding product to cart. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Add Product To Cart</h1>
            <form onSubmit={handleSubmit}>
                <div className="find">
                    <label htmlFor="name">Product Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter Product Name"
                        required
                    />
                </div>

                {error && <div className="error-message">{error}</div>}
                {message && <div className="success-message">{message}</div>}

                <button type="submit" disabled={loading}>
                    {loading ? 'Adding Product...' : 'Add Product'}
                </button>
            </form>

            {cart && cart.length > 0 ? (
                <div className="cart-details">
                    <h2>Cart Details:</h2>
                    <ul>
                        {cart.map((cartItem) => (
                            <li key={cartItem.id}>
                                <p><strong>Cart Item ID:</strong> {cartItem.id}</p>
                                <p><strong>Cart Item Name:</strong> {cartItem.name}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div>No items in the cart.</div>
            )}
        </div>
    );
}

export default AddToCart;
