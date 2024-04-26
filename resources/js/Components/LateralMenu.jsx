import { React, useState } from "react";
import "../../styles/components/lateralMenu.css";
import { PlusIcon } from "./PlusIcon";
import { MinusIcon } from "./MinusIcon";

export const LateralMenu = () => {
    const [showArmaris, setShowArmaris] = useState(false);
    const armaris = ["armari1", "armari2", "armari3", "armari4"];

    return (
        <div className="lateral-menu">
            <ul>
                <li>
                    <div
                        className="armari"
                        onClick={() => setShowArmaris(!showArmaris)}
                    >
                        {showArmaris ? <MinusIcon /> : <PlusIcon />}
                        <a
                            style={{
                                marginLeft: "10px",
                                color: showArmaris ? "#48bb78" : "#ffffff",
                            }}
                        >
                            Armaris
                        </a>
                    </div>
                    {showArmaris && (
                        <ul>
                            {armaris.map((armari, index) => (
                                <li key={index}>
                                    <a className="armaris">{armari}</a>
                                </li>
                            ))}
                        </ul>
                    )}
                </li>
            </ul>
        </div>
    );
};
