import { React, useState } from 'react';
import '../styles/components/lateralMenu.css'


export const LateralMenu = () => {
    const [showArmaris, setShowArmaris] = useState(false);
    const armaris = ['armari1', 'armari2', 'armari3', 'armari4'];

    return (
        <div className="lateral-menu">
            <ul>
                <li>
                    <a href="/create">Create</a>
                </li>
                <li
                    onMouseEnter={() => setShowArmaris(true)}
                    onMouseLeave={() => setShowArmaris(false)}
                >
                    <a>Armaris</a>
                    {showArmaris && (
                        <ul>
                            {armaris.map((armari, index) => (
                                <li key={index}>
                                    <a>{armari}</a>
                                </li>
                            ))}
                        </ul>
                    )}
                </li>
            </ul>
        </div>
    );
};
