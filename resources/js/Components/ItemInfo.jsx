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
          <h2>Producte</h2>
          <div className="popup-details">
            <p>Num Cas: <span>{product.cas_number}</span></p>
            <p>Nom: <span>{product.name}</span></p>
            <p>Quantitat: <span>{product.ml} ml</span></p>
            <p>Concentració: <span>{product.concentration} %</span></p>
            <p>Data d'Expiració: <span>{product.expire_date}</span></p>
            <p>Armari: <span>{product.cabinet}</span></p>
          </div>
          <div className="popup-buttons">
            <a href={`/products/${product.id}/edit`}><button className="info-button">Update</button></a>
            <button className="info-button" onClick={() => { handleDelete(product.id); onClose(); }}>Delete</button>
          </div>
        </div>
      </section>
    </>
  );
};
