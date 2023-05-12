import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useParams } from "react-router";

const ShowRoom = () => {

    const {id} =useParams();
    const [showroom, setShowRoom] = useState("");
    // const [showroom_products, setShowroomProducts] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        getshowroom();
        // getShowroomproducts();
    },[]);

    async function getshowroom()
    {
        let result = await fetch("http://localhost:8000/api/showroom_cloth/"+id,{
                method : 'POST',
                headers : {
                    "Content-Type" :"application/json",
                    "Accept" : "application/json"
                    }            
                });

            result = await result.json();
            setShowRoom(result);
            console.log(result);
    }
    console.log(showroom[0].name);

    async function deleteShowroom(id)
    {
        // console.log("http://localhost:8000/api/delete/"+id);
        let result = await fetch("http://localhost:8000/api/delete_showroom/"+id,{
            method : 'DELETE'
        });
        result = await result.json();
        // getShowroomDetails();
        // console.log(result);
        navigate('/');
    }

        var user = JSON.parse(localStorage.getItem('user_info'));
        // console.log(user['user_type']); 
        // console.log(product);

    async function toCart()
    {
        let user = localStorage.getItem('user_info');
        let product_user = {showroom, user};
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

    // async function showSingleShowroom(id)
    // {
    //     console.log(id);
    //     let result = await fetch("http://localhost:8000/api/showroom_cloth"+id,{
    //         method : 'POST',
    //         headers : {
    //             "Content-Type" :"application/json",
    //             "Accept" : "application/json"
    //         }            
    //     });
    //         result = await result.json();
    //         // navigate('/single_showroom',{showroom_data:{result}});
    //         console.log(id);
    // }
    
    return ( 
        <Container className='rounded pt-2 pb-5 my-4' style={{backgroundColor :"#f2f2f2"}}>
            <Row style={{ width: '75rem', margin: 'auto', marginTop: 100 }}>
                <Col>
                    <Card.Title className='pb-2 text-center'><h2 className='text-primary'>{showroom && showroom[0]['name']}</h2></Card.Title>
                    <Card.Img variant="top" src={showroom && 'http://localhost:8000/'+showroom[0]['file_path']} />
                </Col>
                <Col className='mx-5 my-5'>
                    <Card.Body className='pb-4'>
                        <Card.Title className='pb-2'><h1>{showroom && showroom[0]['name']}</h1></Card.Title>
                        <Card.Text>
                        <h4>{showroom && showroom[0]['description']}</h4>
                        </Card.Text>
                    </Card.Body>
                    <Card.Body className='py-4 px-2'>
                        {
                                user && user['user_type'] ==='admin'?
                                <div className='mt-2'>
                                    <Link onClick={()=> deleteShowroom(id)} className='btn btn-danger py-2 px-3 mx-2'>Delete</Link>
                                </div>
                                :
                                null
                        }
                    </Card.Body>
                </Col>
            </Row>
            <Row>
                <Container className='rounded pt-2 pb-5 my-4' style={{backgroundColor :"#f2f2f2"}}>
                    <h1 className='text-center'>Showroom Products</h1>
                    <Row xs={1} md={4} className="g-2">
                    {showroom[0]? showroom[0]['showroom_cloth'].map((item,i) => {
                        return (
                            <Link style={{cursor:'pointer'}} to={"/showroom_product/"+item.id} className='mb-4'>
                                <Col key={i}>
                                    <Card>
                                    <Card.Body className='text-center'>
                                    <Card.Img variant="top" src={'http://localhost:8000/'+item.file_path} />
                                        <Card.Title>{item.pro_name}</Card.Title>
                                        <Card.Text>
                                        {item.pro_des}
                                        </Card.Text>
                                        <Button variant="primary">Book Now</Button>
                                    </Card.Body>
                                    </Card>
                                </Col>
                            </Link>
                        );
                        }): <h3>Noting to show</h3>} 
                    </Row>
                </Container>
            </Row>
        </Container>
     );

}
 
export default ShowRoom;