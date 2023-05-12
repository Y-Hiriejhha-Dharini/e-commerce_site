import logoColor from './logoColor.png';
import Search from './Search';
import { Navbar, Nav, Container, Button, Form, NavDropdown} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import cart from './cart.png';
import { useState } from 'react';

const Navbars = () => {
  const [data, setData] = useState({ search:"" });
  const user = JSON.parse(localStorage.getItem('user_info'));
  const navigate = useNavigate();
  function logout()
  {
    localStorage.clear();
    navigate('/');
  }

  function handleChange(e)
    {
        const {name, value} = e.target;
        setData((pre)=>{
            return {...pre, [name]:value}
        })
        console.log(name, value);
    }
    
    async function handleSubmit(e)
    {
        e.preventDefault();
        console.log(data);
        let result = await fetch('http://localhost:8000/api/search',{
            method : 'POST',
            headers : {
                "Content-Type" :"application/json",
                "Accept" : "application/json"
            },
            body: JSON.stringify(data)
          });
          result = await result.json();
          setData(result);
          console.log(data);
          navigate('/search',{state:data});    
    }

    return ( 
            <>
            {/* <Search data={data}/> */}
              <Navbar bg="dark" expand="lg">
                <Container fluid>
                  <Link to="/" className="logo"><img src={logoColor} alt="" className="logo"/></Link>
                  <Navbar.Toggle aria-controls="navbarScroll" />
                  <Navbar.Collapse id="navbarScroll">
                    <Nav
                      className="me-auto my-2 my-lg-0"
                      style={{ maxHeight: '100px' }}
                      navbarScroll
                    >
                      <NavDropdown title="Country" id="navbarScrollingDropdown">
                        <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                      </NavDropdown>
                      <Form className="d-flex" onSubmit={handleSubmit}>
                      <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2 w-70"
                        aria-label="Search"
                        name="search"
                        onChange={handleChange}
                      />
                      <Button variant="outline-success" type='submit'>Search</Button>
                    </Form>
                    </Nav>
                    {
                       localStorage.getItem('user_info') ?
                      <>
                        { user.user_type == 'admin' ?
                          <>
                            <Link to="/add_product" >Add Product</Link>
                            <Link to="/add_department" >Add Department</Link>
                          </>
                            :
                          <>
                            <Link to="/customized/1" >Custom Cloth</Link>
                            <Link to="/order" >Order</Link>
                            <Link to="/cart" ><img src={cart} alt="" height={40} width={40} /></Link>
                          </>
                        }
                      </> :
                      <>
                        <Link to="/register">Register</Link>
                        <Link to="/login">Login</Link>
                      </> 
                    }
                    {
                      localStorage.getItem('user_info') ?
                      <NavDropdown title={user && user.name} id="navbarScrollingDropdown">
                        <NavDropdown.Item onClick={logout}>Log out</NavDropdown.Item>
                      </NavDropdown>
                      :
                      null
                    }
                    
                    
                  </Navbar.Collapse>
                </Container>
              </Navbar>
            </>
          );
        }
export default Navbars;