import React from 'react';
import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa'; 
import './Header.css';



const Header = () => {
  return (
    
    <Navbar expand="lg" style={{ backgroundColor: 'black' }} variant="dark">
      <Container fluid>
        <Navbar.Brand href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1.2rem',
              fontFamily: '"Playfair Display", serif',
            }}
          >
            Hotel California
          </span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1" style={{ color: 'white' }}>Inicio
           </Nav.Link>






           {/* Menú desplegable: Menú */}
           <NavDropdown title="Menú" id="navbarScrollingDropdownMenu" menuVariant="dark">
           <NavDropdown.Item href="#action2">Reservas</NavDropdown.Item>
           <NavDropdown.Divider />
           <NavDropdown.Item href="#action3">Servicio</NavDropdown.Item>
           <NavDropdown.Divider />
           <NavDropdown.Item href="#action4">Dirección</NavDropdown.Item>
           <NavDropdown.Divider />
           <NavDropdown.Item href="#action5">Contacto</NavDropdown.Item>
           <NavDropdown.Item href="#action6">Mi perfil</NavDropdown.Item>
           </NavDropdown>

           {/* Menú desplegable: Servicios */}
            
          <NavDropdown title="Servicios" id="navbarScrollingDropdownServicios" menuVariant="dark">
          <NavDropdown.Item href="#suite">Estacionamiento</NavDropdown.Item>
          <NavDropdown.Item href="#habitacion1">Buffet</NavDropdown.Item>
          <NavDropdown.Item href="#habitacion2">Solarium</NavDropdown.Item>
          <NavDropdown.Item href="#habitacion3">Spa</NavDropdown.Item>
          </NavDropdown>

          </Nav>




          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Habitación/personas"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-light">
              <FaSearch />
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>

   

  );
};

export default Header;

