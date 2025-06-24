import { useState } from 'react'
import { Button, Container, Form} from 'react-bootstrap'
import axios from 'axios'
import { URL_CLIENTES } from '../../Constants/endpoints'
import { useNavigate } from 'react-router-dom'



const clientsTable = () => {

const navigate = useNavigate()

const initialState = {

nombre: '',
dni:'',
email:'',
celular: '',
persons: '', // cantidad total de personas (adultos + niños)
adults: "",     // adultos
children: "",   // niños
room: "",       // habitación asignada 



}

const [cliente, setCliente] = useState(initialState);

const handleChange = (e) =>{
setCliente({ ... cliente, [e.target.name]: e.target.value});
}
const handleSubmit = async(e) =>{
e.preventDefault();
try {
const response = await axios.post(URL_CLIENTES, cliente);
setCliente(response.data);

setCliente(initialState); // aqui limpiamos los datos del formulario
if (response) {
navigate('/home' )
console.log("Cliente creado exitosamente:", response.data);
}
} catch (error) {
  console.error("Error al crear el cliente:", error);
}
}


return (
  <div>
    <br />
    <br />
    <h2>Crear Cliente</h2>
<div>
 <Container className="mt-5">
  <Form onSubmit={handleSubmit}>
    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" >
    <Form.Label>Nombre</Form.Label>
<Form.Control type="text" placeholder="ingresa tu nombre" value={cliente.nombre}  name="nombre" onChange={handleChange} />
</Form.Group>
  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
    <Form.Label>DNI</Form.Label>
    <Form.Control type="text" placeholder="ingresa tu dni" value={cliente.dni} name="dni" onChange={handleChange} />
  </Form.Group>
  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
    <Form.Label>Email</Form.Label>
    <Form.Control type="email" placeholder="ingresa tu email" value={cliente.email} name="email" onChange={handleChange} />
  </Form.Group>
  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
    <Form.Label>Celular</Form.Label>
    <Form.Control type="text" placeholder="ingresa tu celular" value={cliente.celular} name="celular" onChange={handleChange} />
  </Form.Group>
  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
    <Form.Label>Cantidad de Personas</Form.Label>
    <Form.Control type="number" placeholder="ingresa la cantidad total de personas" value={cliente.persons} name="persons" onChange={handleChange} />
  </Form.Group>
  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
    <Form.Label>Adultos</Form.Label>
    <Form.Control type="number" placeholder="ingresa la cantidad de adultos" value={cliente.adults} name="adults" onChange={handleChange} />
  </Form.Group>
  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
    <Form.Label>Niños</Form.Label>
    <Form.Control type="number" placeholder="ingresa la cantidad de niños" value={cliente.children} name="children" onChange={handleChange} />
  </Form.Group>
  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
    <Form.Label>Habitación Asignada</Form.Label>
    <Form.Control type="text" placeholder="ingresa la habitación asignada" value={cliente.room} name="room" onChange={handleChange} />
  </Form.Group>
  <br />
    <Button variant="primary" type="submit">
    Guardar
  </Button>
  </Form>
  <br />
  </Container>
  </div>
  </div>
  );
  };

  export default clientsTable;
  // clientsTable.jsx