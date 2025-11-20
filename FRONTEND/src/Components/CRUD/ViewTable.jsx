
import { Card, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { URL_CLIENTES } from '../Constants/EndPoint.js';
import { useParams } from 'react-router-dom';


const ViewTable = () => {
  const { id } = useParams();
  const [cliente, setCliente] = useState({});

  useEffect(() => {
    const getCliente = async () => {
      try {
        const response = await axios.get(`${URL_CLIENTES}/${id}`);
        setCliente(response.data);
      } catch (error) {
        
      }
    };
    getCliente();
  }, [id]);

  return (
    <div className="p-4">
  
      <Card className="mt-5">
        <Card.Body>
          <Card.Title>Información del Cliente</Card.Title>
          <Card.Text>
            <strong>Nombre:</strong> {cliente.nombre} <br />
            <strong>DNI:</strong> {cliente.dni} <br />
            <strong>Email:</strong> {cliente.email} <br />
            <strong>Celular:</strong> {cliente.celular} <br />
            <strong>Adultos:</strong> {cliente.adults} <br />
            <strong>Niños:</strong> {cliente.children} <br />
            <strong>Total Personas:</strong> {(cliente.adults || 0) + (cliente.children || 0)} <br /> 
            <strong>Habitación:</strong> {cliente.room}
          </Card.Text>
        </Card.Body>
      </Card>

      <Button variant="primary" className="mt-3" href="/clients">
        Volver a la lista de clientes
      </Button>
    </div>
  );
};

export default ViewTable;
