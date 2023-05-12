import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router';
import { useParams } from 'react-router';
import App from './App';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';

const EditProduct = () => {

    const {id} = useParams();
    const [data,setData] = useState({
        name : "",
        file_path : "",
        description : "",
        product_price: [size : "", price : ""],
    }); 

    function onChange(e)
    {
        // const {name, value} = e.target;
        // // const name = e.target.name;
        // // const value = e.target.value;
        // setData((pre)=>{
        //     return {...pre, [name]:value}
        // })
        // console.log(name, value);

        const onChange = (e, type=false) => {
            if(type){
                data.product_price[e.target.name] = e.target.value
                setData({...data})
            }else{
                setData({
                    ...data,
                    [e.target.name]: e.target.value,
                });
            }
        };
    }
    // const [name,setName] = useState("");
    // const [file_path,setFile] = useState("");
    // const [description,setDescription] = useState("");
    // const [size,setSize] = useState("");
    // const [price,setPrice] = useState("");
    const [error,setError] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        getProduct();
       },[]);

       async function getProduct()
        {
            let result = await fetch("http://localhost:8000/api/edit/"+id);
            result = await result.json();
            setData(result);
        }

        
        async function handleSubmit(e)
        {
            e.preventDefault();
            let result = await fetch('http://localhost:8000/api/update/'+id,{
                method : 'POST',
                headers : {
                    "Content-Type" :"application/json",
                    "Accept" : "application/json"
                },
                body: JSON.stringify(data)
                });
                result = await result.json();
                console.log(data);
                console.log(data['product_price'][1]);
                // .then((res)=>{
                //     if(!res.ok)
                //     {
                //         console.log(res);
                //         throw Error("Couldn't edit the product");
                //     }else{
                //         console.log(res);
                //         // navigate('/');
                //     }
                // }).catch((err) =>{
                //     setError(err.message);
                // });
        }
        // console.log(data);

        // async function edit_product(e)
        // {
        // e.preventDefault();
        // let product = {name, description, size, price, file_path};

        // const formData = new FormData();
        // formData.append('name',name);
        // formData.append('file_path', file_path);
        // formData.append('description',description);
        // formData.append('size',size);
        // formData.append('price',price);

        // console.log(product);

        // let result = await fetch('http://localhost:8000/api/update/'+id,{
        //     method : "PUT",
        //     body: formData
        //     });
        //     // result = await result.json();
        //     console.log(result);
            // .then((res)=>{
            //     if(!res.ok)
            //     {
            //         console.log(res);
            //         throw Error("Couldn't edit the product");
            //     }else{
            //         console.log(res);
            //         // navigate('/');
            //     }
            // }).catch((err) =>{
            //     setError(err.message);
            // });

        // }
        // data.entries(([item,i]) => {
        //    console.log(item);
        // });

        // console.log(data['product_price']);

    return ( 
        <div className="col-md-6 m-auto bg-secondary bg-opacity-10 p-5 my-5">
            <h3 className='text-center'>Edit Products</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="name" name="name" value={data['name']} onChange={(e)=>onChange(e)} placeholder="Product Name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicFilePath">
                    <Form.Label>File Path</Form.Label>
                    <Form.Control type="file" name="file_path" className='mb-2' onChange={(e)=>onChange(e)} placeholder="File Path" />
                    <img src={"http://localhost:8000/"+data['file_path']} className='ms-2'  style={{width:"20%", height:"20%"}} alt="" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" name="description" value={data['description']} rows={3} onChange={(e)=>onChange(e)} placeholder="Product Description" />
                </Form.Group>
                <ListGroup className="list-group-flush">
                    <Container>
                            <Row>
                                <Col>Size</Col>
                                <Col>Price</Col>
                            </Row>
                            {data && data['product_price']?.map((pro,i)=>(
                            <Row key={i}>
                              <Col>
                                <Form.Control type="text" name={pro['id']} Value={pro['size']} rows={3} onChange={(e)=>onChange(e, true)} placeholder="Product Size" />
                              </Col>
                              <Col>
                                <Form.Control type="text" name={pro['id']}  Value={pro['price']} rows={3} onChange={(e)=>onChange(e, true)} placeholder="Product Price" />
                              </Col>
                            </Row>
                            ))}
                    </Container>
                </ListGroup>
                {error && <div className='text-danger'>{error}</div>}
                <Button variant="primary" type="submit" className='mt-3'>
                    Edit Product
                </Button>
            </Form>
        </div>
     );
}
 
export default EditProduct;