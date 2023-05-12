import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { Button, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useLocation } from "react-router-dom";


const Search = () => {

    const { state } = useLocation();
    // console.log(state[0]['id']);

    return ( 
        <Container className='rounded pt-2 pb-5 my-4' style={{backgroundColor :"#f2f2f2"}}>
                <h1 className='text-center'>Products</h1>
                <Row xs={1} md={4} className="g-2">
                {state? Array.from(state).map((item, i) => {
                    return (
                    <Link to={"list/"+item.id} className='mb-4'>
                    <Col>
                        <Card key={i}>
                        <Card.Body className='text-center'>
                        <Card.Img variant="top" src={"http://localhost:8000/"+item.file_path} />
                            <Card.Title>{item.name}</Card.Title>
                            <Card.Text>
                             {item.description}
                             </Card.Text>
                             <Button variant="primary">Book Now</Button>
                         </Card.Body>
                         </Card>
                     </Col>
                     </Link>
                    );
                    }) : <h1 className='text-center'>No Matching Products</h1>}
                </Row>
        </Container>
     );
}
 
export default Search;