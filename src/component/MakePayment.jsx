import React, { useState } from 'react';
import axios from "axios";

function MakePayment() {
    const [email, setEmail] = useState('');
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !amount) {
            alert("Please fill in both email and amount.");
            return;
        }

        setLoading(true);
        setError('');
        console.log("Form is being submitted!");


        try {
            const token = localStorage.getItem('authToken');
            localStorage.setItem('authToken', token);

            console.log('Token from localStorage:', token);
            if (!token) {
                alert('Token is missing!');
                return;
            }

            const response = await axios.post('http://localhost:8083/payment', {
                email: email,
                amount: parseFloat(amount) * 100,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            console.log('Payment made successfully:', response.data);
            alert("Payment made successfully!");
        } catch (error) {
            console.error('Error making payment:', error);
            setError("Error making payment");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="MakePayment">
            <h1>Make Payment</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="amount">Amount:</label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount"
                        required
                    />
                </div>

                {error && <div className="error-message">{error}</div>}
                <button type="submit" disabled={loading}>
                    {loading ? 'Processing Payment...' : 'Make Payment'}
                </button>
            </form>
        </div>
    );
}

export default MakePayment;