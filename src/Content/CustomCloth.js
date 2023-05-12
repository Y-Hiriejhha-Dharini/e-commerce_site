import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router";

const CustomCloth = () => {

    const {id} = useParams();
    const [customCloth, setCustomCloth] = useState("");
    const [materials, setMaterials] = useState("");
    const [single_materials, setSingleMaterials] = useState("");
    // const [size, setSize] = useState("");
    // const [price, setPrice] = useState("");
    const [tailor_store ,setTailorStore] = useState("");
    const [description ,setDescription] = useState("");
    const [cus_id ,setCusId] = useState("");
    const [mat_id ,setMatId] = useState("");
    const [data ,setData] = useState("");
    const [size ,setSize] = useState("");
    const [price ,setPrice] = useState("");
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        size : "",
        price : ""
    });

    useEffect(()=>{
        loadCustomCloth();
        materialStores();
    },[]);

    async function loadCustomCloth()
    {
        let result = await fetch("http://localhost:8000/api/custom_cloth/"+id);
        result = await result.json();
        setCustomCloth(result);
        setCusId(result.id);
    }

    async function materialStores()
    {
        let result = await fetch("http://localhost:8000/api/material_stores");
        result = await result.json();
        setMaterials(result);
    }

    async function getMaterial(id)
    {
    console.log(id);

        let result = await fetch("http://localhost:8000/api/material_stores/"+id);
        result = await result.json();
        setSingleMaterials(result);
        setMatId(result.id);
        console.log(result);
        materialStores();
    }

    // function handleChange(e)
    // {
    //     const {name, value} = e.target;

    //     setSize((pre)=>{
    //         return {...pre,[name]:value}
    //     });
    //     setPrice((pre)=>{
    //         return {...pre,[name]:value}
    //     })
    // }

    async function saveForm(e)
    {
        console.log(price);
        e.preventDefault();
        let data = {cus_id, size, price, mat_id};
        let result = await fetch("http://localhost:8000/api/cus_data_save",{
            method: 'POST',
            headers : {
                "Content-Type" :"application/json",
                "Accept" : "application/json"
            },
            body: JSON.stringify(data)
        });
        result = await result.json();
        navigate('/');
        console.log(result);
    }
    console.log(mat_id);

    return ( 
         <Container className='rounded pt-2 pb-5 my-4' style={{backgroundColor :"#f2f2f2"}}>
            <Form onSubmit={saveForm}>
                <Row style={{ width: '75rem', margin: 'auto', marginTop: 100 }}>
                <Col>
                    <Form.Control type="cus_id" name="cus_id"  onLoad={(e) => {setCusId(e.target.value)}} value={customCloth['id']}  />
                    <Card.Title className='pb-2 text-center'><h2 className='text-primary'>Customized Attire Store</h2></Card.Title>
                    <Card.Img variant="top" src={customCloth && 'http://localhost:8000/'+customCloth['file_path']} />
                </Col>
                <Col className='mx-5 my-5'>
                    <Card.Body className='pb-4'>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Custom Cloth Store</Form.Label>
                            <Form.Control type="tailor_store" name="tailor_name" disabled value={customCloth && customCloth['name']} onChange={(e) => setTailorStore(e.target.value)} placeholder="Enter Price" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} name="tailor_desc" disabled value={customCloth && customCloth['description']} onChange={(e) => setDescription(e.target.value)} placeholder="Custom store Description" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Size</Form.Label>
                            <Form.Select name="size" value={size} onChange={(e)=>setSize(e.target.value)}>
                                <option>Size</option>
                                <option value="xs" >md</option>
                                <option value="s" >s</option>
                                <option value="md" >md</option>
                                <option value="l" >md</option>
                                <option value="xl" >md</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Price</Form.Label>
                            <Form.Control name="price" type="name" onChange={(e)=>setPrice(e.target.value)} placeholder="Enter Price" />
                        </Form.Group>
                    </Card.Body>
                </Col>
                </Row>
                <Row className="pt-5" style={{borderTop: '2px solid black'}}>
                    <Row>
                        <Col sm={6}>
                            <Card.Title className='pb-2 text-center'><h2 className='text-primary'>Material Store</h2></Card.Title>
                            <Form.Group className="mb-3">
                                <Form.Label> Pick a Material Store</Form.Label>
                                <Form.Select value={materials} onChange={(e) => {setMaterials(e.target.value); getMaterial(e.target.value);}}>
                                <option>Material Store</option>
                                    {materials && Array.from(materials).map((item)=>(
                                        <option value={item.id}>{item.name}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Card.Img variant="top" src={single_materials && 'http://localhost:8000/'+single_materials['file_path']} />
                        </Col>
                        <Col>
                            <Card.Body className='pb-4'>
                                <input type="text" name="mat_id" value={single_materials && single_materials['id']} onLoad={(e)=>setMatId(e.target.value)}/>
                                <Form.Group className="mb-3" controlId="formBasicName">
                                    <Form.Label>Material Store Name</Form.Label>
                                    <Form.Control type="tailor_store" name="mat_name" disabled value={single_materials && single_materials['name']} onChange={(e) => setTailorStore(e.target.value)} placeholder="Enter Price" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formDescription">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as="textarea" rows={3} name="mat_desc" disabled value={single_materials && single_materials['description']} onChange={(e) => setDescription(e.target.value)} placeholder="Custom store Description" />
                                </Form.Group>
                            </Card.Body>
                        </Col>
                    </Row>
                </Row>
                <Row className="my-5">
                    <Col className="p-2">
                        <Button className="mx-2" type="submit">Book Now</Button>
                        <Button className="mx-2" type="reset">Cancel</Button>
                    </Col>
                </Row>
            </Form>
         
     </Container>
     );
}
 
export default CustomCloth;