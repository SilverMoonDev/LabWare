import React, { useState } from "react";
import "../../styles/components/info.css";
import { CloseIcon } from "@/Icons/CloseIcon";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import { LogList } from "./LogList";

export const ItemInfo = ({ user, product, onClose, handleDelete }) => {
    if (!product) return null;

    const { data, put, processing, errors } = useForm({
        ml: product.ml,
        history: product.history,
    });

    const [extractedMl, setExtractedMl] = useState(product.ml);
    const [showMessage, setShowMessage] = useState(false);
    const [popupOpen, setPopupOpen] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        if (data.ml >= extractedMl) {
            data.ml = product.ml - extractedMl;
            if (!data.history) //Filtrar el valor per defecte
                data.history = `${user.name} ha agafat ${extractedMl} ml` + ":"; //Separarat per dos punts
            else
                data.history += `${user.name} ha agafat ${extractedMl} ml` + ":"; //Separarat per dos punts

            put(route("products.update", product.id), {
                onSuccess: () => {
                    setShowMessage(true);
                },
            });
        }
    };

    const openPopup = () => {
      setPopupOpen(true);
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
                            Quantitat: <span>{data.ml} ml</span>
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
                        <button
                            className="info-button"
                            onClick={() => openPopup(product)}
                        >
                            Historial del Producte
                        </button>
                        <form onSubmit={submit}>
                            <div>
                                <InputLabel
                                    htmlFor="ml"
                                    value="Agafar quantitat (ml)"
                                    children={undefined}
                                />
                                <TextInput
                                    id="ml"
                                    type="number"
                                    name="ml"
                                    value={extractedMl}
                                    onChange={(e) =>
                                        setExtractedMl(e.target.value)
                                    }
                                />
                                <InputError message={errors.quantity} />

                                <PrimaryButton
                                    disabled={processing}
                                    className="ms-4 bg-blue-600 hover:bg-blue-800 focus:bg-blue-800 active:bg-blue-900 !important"
                                >
                                    Agafar
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                    {showMessage && (
                        <div className="message">
                            <p>
                                Has agafat {extractedMl} ml
                            </p>
                        </div>
                    )}
                </div>
                {popupOpen && <LogList messages={data.history} onClose={() => setPopupOpen()} />}
            </section>
        </>
    );
};
