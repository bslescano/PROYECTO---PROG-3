import React, { useState, useEffect } from 'react';
import '../CSS/GuestPicker.css';

const GuestPicker = ({ initialAdults, initialChildren, onConfirm, onCancel }) => {
  const [adults, setAdults] = useState(initialAdults);
  const [children, setChildren] = useState(initialChildren);

  useEffect(() => {
    setAdults(initialAdults);
    setChildren(initialChildren);
  }, [initialAdults, initialChildren]);

  const handleAdultsChange = (delta) => {
    setAdults(prev => Math.max(1, prev + delta)); // Mínimo 1 adulto
  };

  const handleChildrenChange = (delta) => {
    setChildren(prev => Math.max(0, prev + delta)); // Mínimo 0 niños
  };

  return (
    <div className="guest-picker-dropdown">
      <div className="guest-picker-row">
        <p>Adultos:</p>
        <div className="guest-picker-controls">
          <button onClick={() => handleAdultsChange(-1)} disabled={adults === 1}>-</button>
          <span>{adults}</span>
          <button onClick={() => handleAdultsChange(1)}>+</button>
        </div>
      </div>
      <div className="guest-picker-row">
        <p>Niños:</p>
        <div className="guest-picker-controls">
          <button onClick={() => handleChildrenChange(-1)} disabled={children === 0}>-</button>
          <span>{children}</span>
          <button onClick={() => handleChildrenChange(1)}>+</button>
        </div>
      </div>
      <div className="guest-picker-actions">
        <button className="cancel-button" onClick={onCancel}>Cancelar</button>
        <button className="accept-button" onClick={() => onConfirm(adults, children)}>Aceptar</button>
      </div>
    </div>
  );
};

export default GuestPicker;
