
import React, { useState } from 'react';
import '../styles/components/update.css'

export const Update = () => {
    const [casNumber, setCasNumber] = useState('');
    const [productName, setProductName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [expiryDate, setExpiryDate] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Here you can handle form submission, for example, send data to your backend or database
        console.log({
            casNumber,
            productName,
            quantity,
            expiryDate
        });
        // You can also reset the form fields after submission
        setCasNumber('');
        setProductName('');
        setQuantity('');
        setExpiryDate('');
    };

    return (
        <section>
            <div className='update-container'>
                <h2>Update</h2>
                <div className='form-container'>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="casNumber">Cas Number:</label>
                            <input
                                type="text"
                                id="casNumber"
                                value={casNumber}
                                onChange={(e) => setCasNumber(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="productName">Product:</label>
                            <input
                                type="text"
                                id="productName"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="quantity">Quantity:</label>
                            <input
                                type="number"
                                id="quantity"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="expiryDate">Expiry Date:</label>
                            <input
                                type="date"
                                id="expiryDate"
                                value={expiryDate}
                                onChange={(e) => setExpiryDate(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">Update</button>
                    </form>
                </div>
            </div>
        </section>
    );
};