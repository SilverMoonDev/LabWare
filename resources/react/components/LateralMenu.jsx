import React from 'react';
import '../styles/components/lateralMenu.css'


export const LateralMenu = () => {
    return (
        <div className="lateral-menu">
            <ul>
                <li>
                    <a href="/create">Create</a>
                </li>
                <li>
                    <a href="/update">Update</a>
                </li>
            </ul>
        </div>
    );
};
