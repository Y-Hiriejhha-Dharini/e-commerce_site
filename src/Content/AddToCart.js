import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';

const AddToCart = () => {
    const [cart, setCart] = useState();
    useEffect(()=>{
        if(localStorage.getItem('user_info'))
        {
            cartData();
            deleteCart();
        }else{
            const cart = 'No Items to show';
        }
    },[]);

        async function cartData()
            {
                const user = JSON.parse(localStorage.getItem('user_info'));
                let result = await fetch("http://localhost:8000/api/to_cart/"+user['id']);
                result = await result.json();
                setCart(result);
            }
            console.log(cart);

        async function deleteCart(id)
        {
            let user = JSON.parse(localStorage.getItem('user_info'));
            let user_id = user['id'];
            let deleteCart = {id, user_id}; 
            let result = await fetch("http://localhost:8000/api/to_cart/delete",{
                method : 'DELETE',
                headers : {
                    "Content-Type" :"application/json",
                    "Accept" : "application/json"
                },
                body: JSON.stringify(deleteCart)
            });
            result = await result.json();
            console.log(result);
        }

    return ( 
        <div className='mb-5 mx-5 mt-5'> 
            <Container className="g-2">
                {cart && cart[0].map((item, i) => (
                    <Row key={i} className='border border-sm-black mb-2'>
                        <Col className='col-md-2 my-5'>
                            <img src={"http://localhost:8000/"+item.file_path} alt="" className="" height={100} width={120}/>
                        </Col>
                        <Col className='col-md-8 my-4'>
                            <h4>{item.name}</h4>
                            <h5>{item.description}</h5>
                            <h6>Qty: {item.count}</h6>
                            <Button onClick={()=>deleteCart(item.product_id)} className='btn btn-danger mx-2'>Delete</Button>
                            <Button className='btn btn-success mx-2'>Buy Now</Button>
                        </Col>
                        <Col className='col-md-2 my-4'>
                                <h5>{"Rs. "+item.amount}</h5>
                        </Col>
                    </Row>
                ))}
            </Container>
        </div>
     );
}
 
export default AddToCart;