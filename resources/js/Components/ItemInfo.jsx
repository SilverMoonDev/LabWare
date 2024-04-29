import React from "react"
import '../../styles/components/info.css'
import { CloseIcon } from "@/Icons/CloseIcon";

export const ItemInfo = ({ product, onClose, handleDelete }) => {
  if (!product) return null;

  return (
    <>

      <div className="main-background" onClick={onClose}></div>
      <section className="popup-container">
        <div className="close" onClick={onClose}>
          <CloseIcon />
        </div>
        <div className="popup-content">
          <h2>Product Details</h2>
          <div className="popup-details">
            <p>Num Cas: <span>{product.numCas}</span></p>
            <p>Name: <span>{product.name}</span></p>
            <p>Quantitat: <span>{product.quantitat}</span></p>
            <p>Expire Date: <span>{product.expire_date}</span></p>
          </div>
          <div className="popup-buttons">
            <a href="/update"><button className="info-button">Update</button></a>
            <button className="info-button" onClick={() => { handleDelete(product.name); onClose(); }}>Delete</button>
          </div>
        </div>
      </section>
    </>
  );
};