import React, { useState } from 'react';
import axios from 'axios';

function DeleteFromCart() {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [userId, setUserId] = useState('');
    const [productId, setProductId] = useState('');
    const [message, setMessage] = useState('');

    const handleDelete = async (e) => {
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
        console.log(`Deleting product with ID: ${productId}`);

        try {
            const cartData = await axios.get('http://localhost:8083/cart');
            const productExists = cartData.data.some(item => item.id === productId);

            if (!productExists) {
                setError(`Product with ID ${productId} does not exist in the cart.`);
                return;
            }
            const response = await axios.delete(`http://localhost:8083/cart/${productId}`);
            setMessage("Product successfully deleted from cart!");
            console.log(response.data);
        } catch (error) {
            console.error('There was an error!', error);
            setError('Error deleting product from cart. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Delete Product From Cart</h1>
            <form onSubmit={handleDelete}>
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
                    {loading ? 'Deleting Product...' : 'Delete Product'}
                </button>
            </form>
        </div>
    );
}

export default DeleteFromCart;
