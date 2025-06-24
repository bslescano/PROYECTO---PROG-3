import { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import axios from 'axios';
import { URL_CLIENTES } from '../../Constants/endpoints';
import { useNavigate } from 'react-router-dom';

const ClientsTable = () => {
  const navigate = useNavigate();

  const initialState = {
    nombre: '',
    dni: '',
    email: '',
    celular: '',
    persons: '',
    adults: '',
    children: '',
    room: '',
  };

  const [cliente, setCliente] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numberpersons = ['persons', 'adults', 'children'];
    setCliente({
      ...cliente,
      [name]: numberpersons.includes(name) ? parseInt(value) || 0 : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cliente.nombre || !cliente.dni || !cliente.room) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    try {
      const response = await axios.post(URL_CLIENTES, cliente);
      setCliente(initialState);
      if (response) {
        navigate('/home');
        console.log('Cliente creado exitosamente:', response.data);
      }
    } catch (error) {
      console.error('Error al crear el cliente:', error);
      alert('Error al crear el cliente. Intenta de nuevo.');
    }
  };

  return (
    <div>
      <br />
      <h2>Crear Cliente</h2>
      <Container className="mt-3">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" name="nombre" value={cliente.nombre} onChange={handleChange} placeholder="Ingresa tu nombre" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>DNI</Form.Label>
            <Form.Control type="text" name="dni" value={cliente.dni} onChange={handleChange} placeholder="Ingresa tu DNI" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={cliente.email} onChange={handleChange} placeholder="Ingresa tu email" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Celular</Form.Label>
            <Form.Control type="text" name="celular" value={cliente.celular} onChange={handleChange} placeholder="Ingresa tu celular" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Cantidad de Personas</Form.Label>
            <Form.Control type="number" name="persons" value={cliente.persons} onChange={handleChange} placeholder="Total personas" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Adultos</Form.Label>
            <Form.Control type="number" name="adults" value={cliente.adults} onChange={handleChange} placeholder="Cantidad de adultos" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Niños</Form.Label>
            <Form.Control type="number" name="children" value={cliente.children} onChange={handleChange} placeholder="Cantidad de niños" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Habitación Asignada</Form.Label>
            <Form.Control type="text" name="room" value={cliente.room} onChange={handleChange} placeholder="Nombre o número de habitación" />
          </Form.Group>

          <Button variant="primary" type="submit">Guardar</Button>
        </Form>
      </Container>
    </div>
  );
};

export default ClientsTable;