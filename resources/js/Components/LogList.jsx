import "../../styles/components/log.css";
import React, { useState } from "react";
import { CloseIcon } from "@/Icons/CloseIcon";

export const LogList = ({ messages, onClose }) => {
    return (
        <section className="popup-log">
            <div className="close" onClick={onClose}>
                    <CloseIcon />
                </div>
            {messages.map((message, index) => (
                <div key={index} className="message">
                    {message.split(':').map((part, i) => (
                        <p key={i}>{part}</p>
                    ))}
                </div>
            ))}
        </section>
    );
};
