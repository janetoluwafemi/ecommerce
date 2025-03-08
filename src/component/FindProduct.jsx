import React, { useState } from 'react';
import axios from 'axios';

function FindProduct() {
    const [name, setName] = useState('');
    const [product, setProduct] = useState(null);
    const [userId, setUserId] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userFromSession = sessionStorage.getItem('userId');
        const userFromLocalStorage = localStorage.getItem('userId');
        const currentUserId = userFromSession || userFromLocalStorage;

        setUserId(currentUserId);

        if (!currentUserId) {
            setError('User is not logged in. Please log in first.');
            setLoading(false);
            return;
        }

        if (!name) {
            alert("Please enter a Product name.");
            return;
        }

        setLoading(true);
        setError('');
        setMessage('');
        setProduct(null);

        try {
            const url = `http://localhost:8083/api/products?name=${name}`;
            console.log('Making API request to:', url);

            const response = await axios.get(url);
            console.log('API Response:', response);

            if (response.data && response.data.length > 0) {
                const product = response.data[0];
                setProduct(product);
                setMessage(`Product found: ${product.name} (ID: ${product.id})`);

                localStorage.setItem('productId', product.id);
                console.log('Product found successfully:', product);

                window.location.href = "/delete_product";
            } else {
                setError('Product not found.');
            }
        } catch (error) {
            console.error('There was an error finding the product!', error);
            setError(`Failed to find the product. ${error.message || 'Please try again.'}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Find Product</h1>
            <form onSubmit={handleSubmit}>
                <div className="find">
                    <label htmlFor="name">Product Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter Product name"
                        required
                    />
                </div>
                {error && <div className="error-message">{error}</div>}
                {message && <div className="success-message">{message}</div>}
                <button type="submit" disabled={loading}>
                    {loading ? 'Finding Product...' : 'Find Product'}
                </button>
            </form>

            {product && (
                <div className="product-details">
                    <h2>Found Product:</h2>
                    <p><strong>Name:</strong> {product.name}</p>
                    <p><strong>Category:</strong> {product.category}</p>
                    <p><strong>Price:</strong> ${product.price}</p>
                    <p><strong>Description:</strong> {product.description}</p>
                </div>
            )}
        </div>
    );
}

export default FindProduct;
