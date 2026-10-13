import React, { useState } from 'react';
import axios from 'axios';

const PaymentForm = () => {
    // Use the sandbox test number by default
    const [phone, setPhone] = useState('254708374149');
    const [amount, setAmount] = useState('1');
    const [status, setStatus] = useState('');

    const handlePayment = async (e) => {
        e.preventDefault();
        setStatus('Initiating STK Push...');
        
        let formattedPhone = phone;
        if (formattedPhone.startsWith('0')) {
            formattedPhone = `254${formattedPhone.substring(1)}`;
        }
        
        try {
            const response = await axios.post('http://localhost:5000/api/mpesa/stkpush', {
                phone: formattedPhone,
                amount: amount
            });
            setStatus(response.data.message);
            console.log("CheckoutRequestID:", response.data.data.CheckoutRequestID);
        } catch (error) {
            setStatus('Failed to initiate payment.');
            console.error(error);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Sandbox M-Pesa Payment</h2>
            <form onSubmit={handlePayment}>
                <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="254708374149"
                    required
                />
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Amount"
                    required
                />
                <button type="submit">Pay Now</button>
            </form>
            {status && <p>{status}</p>}
        </div>
    );
};

export default PaymentForm;