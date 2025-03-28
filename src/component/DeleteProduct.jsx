import React, { useState } from 'react';
import axios from 'axios';

function DeleteProduct() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [productId, setProductId] = useState('');
    const handleDelete = async (e) => {
        e.preventDefault();

        const savedProductId = sessionStorage.getItem('productId');
        const productId = localStorage.getItem('productId');
        const currentProductId = savedProductId || productId;

        setProductId(currentProductId);
        console.log(currentProductId, 'productId in handleDelete');

        if (!currentProductId) {
            alert("Please enter a product ID.");
            return;
        }

        setLoading(true);
        setError('');
        setMessage('');

        try {
            const response = await axios.delete(`http://localhost:8083/products/${currentProductId}`);
            setMessage(response.data.message);
            console.log('Product Deleted Successfully:', response.data);
        } catch (error) {
            console.error('There was an error deleting the product!', error);
            setError('Failed to delete the product. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="delete-product-container">
            <h1>Delete Product</h1>
            <form onSubmit={handleDelete} className="delete-product-form">
                {error && <div className="error-message">{error}</div>}
                {message && <div className="success-message">{message}</div>}
                <button type="submit" disabled={loading}>
                    {loading ? 'Deleting...' : 'Delete Product'}
                </button>
            </form>
        </div>
    );
}

export default DeleteProduct;
