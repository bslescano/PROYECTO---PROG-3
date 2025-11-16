import { Button, Form, Container } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { URL_CLIENTES } from '../Constants/EndPoint.js';
import { useParams, useNavigate } from 'react-router-dom';
import { CLIENTS } from '../../Routers/router.js';

const EditTable = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [datos, setDatos] = useState({
    nombre: '',
    dni: '',
    email: '',
    celular: '',
    adults: 0,
    children: 0,
    persons: 0,
    room: ''
  });

  useEffect(() => {
    const getCliente = async () => {
      try {
        const response = await axios.get(`${URL_CLIENTES}/${id}`);
        setDatos(response.data);
      } catch (error) {
        
      }
    };
    getCliente();
  }, [id]);

  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.type === "number" ? parseInt(e.target.value) || 0 : e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${URL_CLIENTES}/${id}`, datos);
      if (response) {
        navigate(CLIENTS);
      }
    } catch (error) {
      
    }
  };

  return (
    <Container className="mt-4">
      <h2>Editar Cliente</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            name="nombre"
            value={datos.nombre || ''}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>DNI</Form.Label>
          <Form.Control
            type="text"
            name="dni"
            value={datos.dni || ''}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={datos.email || ''}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Celular</Form.Label>
          <Form.Control
            type="text"
            name="celular"
            value={datos.celular || ''}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Adultos</Form.Label>
          <Form.Control
            type="number"
            name="adults"
            value={datos.adults}
            onChange={handleChange}
            min={0}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Niños</Form.Label>
          <Form.Control
            type="number"
            name="children"
            value={datos.children}
            onChange={handleChange}
            min={0}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Total Personas</Form.Label>
          <Form.Control
            type="number"
            name="persons"
            value={(datos.adults || 0) + (datos.children || 0)}
            readOnly
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Habitación Asignada</Form.Label>
          <Form.Control
            type="text"
            name="room"
            value={datos.room || ''}
            onChange={handleChange}
          />
        </Form.Group>

        <Button type="submit" variant="primary">Guardar Cambios</Button>{' '}
        <Button variant="secondary" onClick={() => navigate(CLIENTS)}>Cancelar</Button>
      </Form>
    </Container>
  );
};

export default EditTable;
