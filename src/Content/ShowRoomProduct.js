import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';


const ShowRoomProduct = () => {

    const {id} = useParams();
    const [product, setProduct] = useState("");
    const navigate = useNavigate();
    useEffect(()=>{

        getProductDetails();
    },[]); 

    async function getProductDetails()
    {
        let result = await fetch("http://localhost:8000/api/showroom_product/"+id);
        result = await result.json();
        console.log(result);
        setProduct(result);
    }
console.log(product);
    async function deleteProduct(id)
    {
        let result = await fetch("http://localhost:8000/api/delete/"+id,{
            method : 'DELETE'
        });
        result = await result.json();
        getProductDetails();
        // console.log(result);
        navigate('/');
    }

        var user = JSON.parse(localStorage.getItem('user_info'));
        // console.log(user['user_type']); 
        // console.log(product);

    async function toCart()
    {
        let user = localStorage.getItem('user_info');
        let product_user = {product, user};
        // console.log(user1);
        let result = await fetch("http://localhost:8000/api/to_cart",{
            method : 'POST',
            headers : {
                "Content-Type" :"application/json",
                "Accept" : "application/json"
            },
            body: JSON.stringify(product_user)
        })
        result = await result.json();
    console.log(result);
    }
    console.log(product.pro_name);

    return ( 
        <Container className='rounded pt-2 pb-5 my-4' style={{backgroundColor :"#f2f2f2"}}>
            <Row style={{ width: '75rem', margin: 'auto', marginTop: 100 }}>
                <Col>
                    <Card.Title className='pb-2 text-center'><h2 className='text-primary'>{product && product['pro_name']}</h2></Card.Title>
                    <Card.Img variant="top" src={product && 'http://localhost:8000/'+product['file_path']} />
                </Col>
                <Col className='mx-5 my-5'>
                    <Card.Body className='pb-4'>
                        <Card.Title className='pb-2'><h1>{product && product['pro_name']}</h1></Card.Title>
                        <Card.Text>
                        <h4>{product && product['pro_desc']}</h4>
                        </Card.Text>
                    </Card.Body>
                    <Card.Body className='py-4 px-2'>
                        {
                                user && user['user_type'] ==='admin'?
                                <div className='mt-2'>
                                    <Link onClick={()=> deleteProduct(id)} className='btn btn-danger py-2 px-3 mx-2'>Delete</Link>
                                    <Link to={"/edit/"+id} className='btn btn-success py-2 px-3 mx-2'>Edit</Link>
                                </div>
                                :
                              <div>
                                    <Link onClick={toCart} className='btn btn-primary py-2 px-3 mx-2'>Add to Cart</Link>
                                    <Link to="#" className='btn btn-success py-2 px-3 mx-2'>Buy Now</Link>
                              </div>
                        }
                    </Card.Body>
                </Col>
            </Row>
        </Container>
     );
}
 
export default ShowRoomProduct;