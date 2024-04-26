import React from "react"
import '../../styles/components/info.css'

export const ItemInfo = ({ product, onClose, handleDelete }) => {
    if (!product) return null;

    return (
        <>

          <div className="main-background" onClick={onClose}></div>
          <div className="popup-container">
            <div className="popup-content">
              <h2>Product Details</h2>
              <p>Num Cas: {product.numCas}</p>
              <p>Name: {product.name}</p>
              <p>Quantitat: {product.quantitat}</p>
              <p>Expire Date: {product.expire_date}</p>
              <a href="/update"><button >Update</button></a>
              <button onClick={() => { handleDelete(product.name); onClose(); }}>Delete</button>
            </div>
          </div>
        </>
      );
    };