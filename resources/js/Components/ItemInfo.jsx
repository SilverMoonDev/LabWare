import React, { useState } from "react";
import "../../styles/components/info.css";
import { CloseIcon } from "@/Icons/CloseIcon";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import { LogList } from "./LogList";

export const ItemInfo = ({
    user,
    product: products,
    onClose,
    handleDelete,
}) => {
    if (!products) return null;

    const [displayedProduct, setDisplayedProduct] = useState(
        products.products[0]
    );

    const { data, put, processing, errors } = useForm({
        ml: displayedProduct.ml,
        history: displayedProduct.history,
    });

    const [extractedMl, setExtractedMl] = useState(products.ml);
    const [showMessage, setShowMessage] = useState(false);
    const [popupOpen, setPopupOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const submit = (e) => {
        e.preventDefault();
        if (data.ml >= extractedMl) {
            data.ml = displayedProduct.ml - extractedMl;
            if (!data.history)
                data.history = `${user.name} ha agafat ${extractedMl} ml` + ":";
            else
                data.history +=
                    `${user.name} ha agafat ${extractedMl} ml` + ":";

            put(route("products.update", displayedProduct.id), {
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
                    <div className="details">
                        <div className="left-details">
                            <p>
                                Num Cas:{" "}
                                <span>{displayedProduct.cas_number}</span>
                            </p>
                            <p>
                                Nom: <span>{displayedProduct.name}</span>
                            </p>
                            <p>
                                Quantitat: <span>{data.ml} ml</span>
                            </p>
                            <p>
                                Concentració:{" "}
                                <span>{displayedProduct.concentration} %</span>
                            </p>
                            <p>
                                Data d'Expiració:{" "}
                                <span>{displayedProduct.expire_date}</span>
                            </p>
                            <p>
                                Armari: <span>{displayedProduct.cabinet}</span>
                            </p>
                        </div>
                        <div className="details-button">
                            {products.products.map((product, index) => (
                                <div key={index}>
                                    <button
                                        style={{
                                            color:
                                                index === selectedIndex
                                                    ? "#48bb78"
                                                    : "#ffffff",
                                        }}
                                        className="info-button"
                                        onClick={() => {
                                            setSelectedIndex(index);
                                            setDisplayedProduct(product);
                                            setData("ml", product.ml);
                                            setData("history", product.history);
                                        }}
                                    >
                                        <span>
                                            {`${product.ml}ml`}
                                            <br />
                                            {`${product.expire_date}`}
                                        </span>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="popup-buttons">
                        {user.admin === 1 && (
                            <a href={`/products/${products.id}/edit`}>
                                <button className="info-button">Editar</button>
                            </a>
                        )}
                        {user.admin === 1 && (
                            <button
                                className="info-button"
                                onClick={() => {
                                    handleDelete(products.id);
                                    onClose();
                                }}
                            >
                                Eliminar
                            </button>
                        )}
                        <button
                            className="info-button"
                            onClick={() => openPopup(products)}
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
                            <p>Has agafat {extractedMl} ml</p>
                        </div>
                    )}
                </div>
                {popupOpen && (
                    <LogList
                        messages={data.history}
                        onClose={() => setPopupOpen()}
                    />
                )}
            </section>
        </>
    );
};
