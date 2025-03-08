import React, { useState } from 'react';
import axios from "axios";
import '../styles/CreateProduct.css'

function CreateProduct() {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [userId, setUserId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [product, setProduct] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userFromSession = sessionStorage.getItem('userId');
        const userFromLocalStorage = localStorage.getItem('userId');
        const currentUserId = userFromSession || userFromLocalStorage;

        setUserId(currentUserId);

        if (!userId || !name || !category || !price || !description) {
            alert("All fields must be filled.");
            return;
        }

        const productData = {
            name: name,
            category: category,
            price: price,
            description: description,
            userId: userId,
        };

        setLoading(true);
        setError('');

        try {
            const response = await axios.post('http://localhost:8083/products', productData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            setProduct(response.data);

            const productId = response.data.id;
            sessionStorage.setItem('productId', productId);
            localStorage.setItem('productId', productId);

            console.log('Product created successfully:', response.data);
            alert("Product Created Successfully!");
        } catch (error) {
            console.error('Error creating product:', error.response ? error.response.data : error.message);
            setError("Error creating product");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="CreateProduct">
            <h1>Create New Product</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
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

                <div className="form-group">
                    <label htmlFor="category">Product Category:</label>
                    <input
                        type="text"
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="Enter Product category"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="price">Product Price:</label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Enter Product Price"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Product Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter Product Description"
                        required
                    />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'Creating Product...' : 'Create Product'}
                </button>
            </form>

            {product && (
                <div className="product-details">
                    <h2>Created Product:</h2>
                    <p><strong>Name:</strong> {product.name}</p>
                    <p><strong>Category:</strong> {product.category}</p>
                    <p><strong>Price:</strong> ${product.price}</p>
                    <p><strong>Description:</strong> {product.description}</p>
                </div>
            )}

            {error && <div className="error-message">{error}</div>}
        </div>
    );
}

export default CreateProduct;
