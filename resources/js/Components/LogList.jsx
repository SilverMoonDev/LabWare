import "../../styles/components/log.css";
import React, { useState } from "react";
import { CloseIcon } from "@/Icons/CloseIcon";

export const LogList = ({ messages, onClose }) => {
    // Check if messages exist
    if (!messages || !messages.length) {
        return (
            <section className="popup-log">
                <div className="close" onClick={onClose}>
                    <CloseIcon />
                </div>
                <div className="message">
                    <p>No hi ha historial d'aquest producte</p>
                </div>
            </section>
        );
    }

    return (
        <>
        <section className="popup-log">
            <div className="close" onClick={onClose}>
                <CloseIcon />
            </div>
            {messages.split(':').slice(0, -1).map((message, index) => (
                <div key={index} className="message">
                        <p>{message}</p>
                </div>
            ))}
        </section>
        </>
    );
};
