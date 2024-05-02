import React, { useState } from "react";
import "../../styles/components/info.css";
import { CloseIcon } from "@/Icons/CloseIcon";
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import { useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export const ItemInfo = ({ user, product, onClose, handleDelete }) => {
  if (!product) return null;

  const { data, setData, put, processing, errors, reset } = useForm({
    ml: product.ml,
  });

  const [extractedMl, setExtractedMl] = useState(0);
  const [showMessage, setShowMessage] = useState(false);

  const submit = (e) => {
    e.preventDefault();

    setExtractedMl(data.ml);

    put(route('products.update', product.id), {
      data: data,
      onSuccess: () => {
        setShowMessage(true);
      },
    });
  };

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
            <p>
              Num Cas: <span>{product.cas_number}</span>
            </p>
            <p>
              Nom: <span>{product.name}</span>
            </p>
            <p>
              Quantitat: <span>{extractedMl !== 0 ? extractedMl : product.ml} ml</span>
            </p>
            <p>
              Concentració: <span>{product.concentration} %</span>
            </p>
            <p>
              Data d'Expiració: <span>{product.expire_date}</span>
            </p>
            <p>
              Armari: <span>{product.cabinet}</span>
            </p>
          </div>
          <div className="popup-buttons">
            <a href={`/products/${product.id}/edit`}>
              <button className="info-button">Editar</button>
            </a> 
            <button
              className="info-button"
              onClick={() => {
                handleDelete(product.id);
                onClose();
              }}
            >
              Eliminar
            </button>
            <form onSubmit={submit}>
              <div>
                <InputLabel htmlFor="ml" value="Agafar quantitat (ml)" children={undefined} />
                <TextInput
                  id="ml"
                  type="number"
                  name="ml"
                  value={data.ml}
                  onChange={(e) => setData('ml', e.target.value)}
                />
                <InputError message={errors.quantity} />

                <PrimaryButton disabled={processing} className="ms-4 bg-blue-600 hover:bg-blue-800 focus:bg-blue-800 active:bg-blue-900 !important">
                  Agafar
                </PrimaryButton>
              </div>
            </form>
          </div>
          {showMessage &&
          <div className="message">
             <p>{user.name} ha agafat: {extractedMl} ml</p>
          </div>}
        </div>
      </section>
    </>
  );
};
