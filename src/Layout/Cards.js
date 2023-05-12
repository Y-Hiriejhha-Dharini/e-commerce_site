import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
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

function Cards() {
  return (
    <CardGroup className='mx-auto'>
      <Link to={"/category/"+1} name="customized" className='card_anchor'>
        <Card className='border rounded'>
          <Card.Img variant="top" src="n_stores.jpg"/>
          <Card.Footer>
            <small className="text-muted">Customized Cloths</small>
          </Card.Footer>
        </Card>
      </Link>
      <Link to={"/category/"+2} name="attries" className='card_anchor'>
        <Card className='border rounded'>
          <Card.Img variant="top" src="c_apparel.jpg" />
          <Card.Footer>
            <small className="text-muted">Attires</small>
          </Card.Footer>
        </Card>
      </Link>
      <Link to={"/category/"+3} name="showrooms" className='card_anchor'>
        <Card className='border rounded'>
          <Card.Img variant="top" src="g_products.jpg" />
          <Card.Footer>
            <small className="text-muted">Showrooms</small>
          </Card.Footer>
        </Card>
      </Link>
    </CardGroup>
  );
}

export default Cards;