import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { Button, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";


const Search = () => {

    const { id } = useParams();
    const [category, setCategory] = useState("");
    const navigate = useNavigate();

    // console.log(id);

    useEffect(()=>{
       categoryLoad();
    },[]);

    async function categoryLoad()
    {
        let result = await fetch("http://localhost:8000/api/category/"+id);
        result = await result.json();
        setCategory(result);
        console.log(result);
    }

    function prebooking (product_id){

        if(id == 1)
        {
            navigate("/custom_cloth/"+product_id);
        }
        if(id == 2)
        {
            navigate('/list/'+product_id);
        }
        if(id == 3)
        {
            console.log(3);
            navigate('/showroom/'+product_id);
        }
    }

    return ( 
        <Container className='rounded pt-2 pb-5 my-4' style={{backgroundColor :"#f2f2f2"}}>
                <h1 className='text-center'>Products</h1>
                <Row xs={1} md={4} className="g-2">
                {category? Array.from(category).map((item, i) => {
                    return (
                    <a style={{cursor:'pointer'}} onClick={()=> prebooking(item.id)} className='mb-4'>
                    <Col>
                        <Card key={i}>
                        <Card.Body className='text-center'>
                        <Card.Img variant="top" src={'http://localhost:8000/'+item.file_path} />
                            <Card.Title>{item.name}</Card.Title>
                            <Card.Text>
                             {item.description}
                             </Card.Text>
                             <Button variant="primary">Book Now</Button>
                         </Card.Body>
                         </Card>
                     </Col>
                     </a>
                    );
                    }) : <h5 className='text-center'>No Matching Products</h5>}
                </Row>
        </Container>
     );
}
 
export default Search;