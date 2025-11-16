import React, { useState, useEffect } from 'react';
import '../CSS/HabitacionForm.css';

const formVacio = {
  numero_habitacion: '',
  tipo_habitacion: 'Simple',
  precio_noche: '',
  descripcion: '',
  estado: 'disponible',
  imagen_url: ''
};

const HabitacionForm = ({ isOpen, onClose, onSave, habitacion }) => {
  const [formData, setFormData] = useState(formVacio);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (habitacion) {
        // Modo Edición: Llenar con los datos de la habitación existente
        setFormData({
          numero_habitacion: habitacion.numero_habitacion || '',
          tipo_habitacion: habitacion.tipo_habitacion || 'Simple',
          precio_noche: habitacion.precio_noche || '',
          descripcion: habitacion.descripcion || '',
          estado: habitacion.estado || 'disponible',
          imagen_url: habitacion.imagen_url || ''
        });
      } else {
        // Modo Creación: Asegurarse de que el formulario esté vacío al abrir
        setFormData(formVacio);
      }
    }
  }, [habitacion, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation
    if (!formData.numero_habitacion || !formData.precio_noche) {
      setError('Número y Precio son campos obligatorios.');
      return;
    }
    setError('');
    // Generate the name automatically before saving
    const datosParaGuardar = {
      // Mapeo de campos para que coincidan con el backend
      nombre: `${formData.tipo_habitacion} ${formData.numero_habitacion}`,
      numero: formData.numero_habitacion,
      tipo: formData.tipo_habitacion,
      precio_noche: formData.precio_noche,
      estado: formData.estado,
      descripcion: formData.descripcion,
      imagen_url: formData.imagen_url,
    };

    onSave(datosParaGuardar);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{habitacion ? 'Editar Habitación' : 'Crear Nueva Habitación'}</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="form-error">{error}</p>}
          <div className="form-grid">
            <input name="numero_habitacion" type="number" value={formData.numero_habitacion} onChange={handleChange} placeholder="Número" />
            <input name="precio_noche" type="number" value={formData.precio_noche} onChange={handleChange} placeholder="Precio por noche" />
            <select name="tipo_habitacion" value={formData.tipo_habitacion} onChange={handleChange}>
              <option value="Simple">Simple</option>
              <option value="Doble">Doble</option>
              <option value="Suite">Suite</option>
            </select>
            <select name="estado" value={formData.estado} onChange={handleChange}>
              <option value="disponible">Disponible</option>
              <option value="ocupada">Ocupada</option>
              <option value="mantenimiento">Mantenimiento</option>
            </select>
          </div>
          <input name="imagen_url" value={formData.imagen_url} onChange={handleChange} placeholder="URL de la imagen" />
          <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} placeholder="Descripción de la habitación..."></textarea>
          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn-cancel">Cancelar</button>
            <button type="submit" className="btn-save">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HabitacionForm;
