import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import { useNavigate } from 'react-router';
import App from './App';

const AppDepartments = () => {

    const [name,setName] = useState("");
    const [file,setFile] = useState("");
    const [description,setDescription] = useState("");
    const [category,setCategory] = useState("");
    const [error,setError] = useState("");
    const navigate = useNavigate();

    async function add_department(e)
    {
        e.preventDefault();
        let product = {name, file, description, category};

        console.warn(product)

        const formData = new FormData();
        formData.append('name',name);
        formData.append('file_path', file);
        formData.append('description',description);
        formData.append('category',category);

        let result = await fetch('http://localhost:8000/api/add_department',{
            method : "POST",
            body: formData
        }).then((res)=>{
            console.log(res);
                if(!res.ok)
                {
                    throw Error("Couldn't add the product");
                }else{
                    // result = result.json();
                    // localStorage.setItem('product_info',JSON.stringify(result));
                    navigate('/');
                }
            }).catch((err) =>{
                setError(err.message);
            });
            result = await result.json();
            console.log(result);
    }

    return ( 
        <div className="col-md-6 m-auto bg-secondary bg-opacity-10 p-5 my-5">
            <h3 className='text-center'>Add Department</h3>
                <Form>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Product Name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicFilePath">
                    <Form.Label>File Path</Form.Label>
                    <Form.Control type="file" onChange={(e) => setFile(e.target.files[0])} placeholder="File Path" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formCategory">
                    <Form.Label>Category</Form.Label>
                    <Form.Select  value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option>Category</option>
                        <option value="1" >Customize Store</option>
                        <option value="2" >Showrooms</option>
                        <option value="3" >Material Shop</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Product Description" />
                </Form.Group>
                {error && <div className='text-danger'>{error}</div>}

                <Button variant="primary" onClick={add_department} type="submit" className='mt-3'>
                    Add department
                </Button>
                </Form>
        </div>
     );
}
 
export default AppDepartments;