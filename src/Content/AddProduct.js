import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import { useNavigate } from 'react-router';
import App from './App';

const AppProduct = () => {

    const [name,setName] = useState("");
    const [file,setFile] = useState("");
    const [description,setDescription] = useState("");
    const [size,setSize] = useState("");
    const [price,setPrice] = useState("");
    const [error,setError] = useState("");
    const navigate = useNavigate();

    async function add_product(e)
    {
        e.preventDefault();
        let product = {name, file, description, size, price};

        console.warn(product)

        const formData = new FormData();
        formData.append('name',name);
        formData.append('file_path', file);
        formData.append('description',description);
        formData.append('size',size);
        formData.append('price',price);

        let result = await fetch('http://localhost:8000/api/add_product',{
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
        // {
        //     method : "POST",
        //     mode: 'no-cors',
        //     headers: {
        //         "Content-type": "application/json",
        //         "Accept": "application/json"
        //     },
        //     body: 
        //     //  JSON.stringify(product),
        //             formData 
        // }
        // ).then((res)=>{
        //     if(!res.ok)
        //     {
        //         throw Error("Couldn't add the product");
        //     }else{
        //         result = result.json();
        //         localStorage.setItem('user_info',JSON.stringify(result));
        //         navigate('/');
        //     }
        // }).catch((err) =>{
        //     setError(err.message);
        // });
        result = await result.json();

        console.log(result);
        // if(!result.ok)
        // {
        //     throw Error("Couldn't add the product");
        //     result.catch((err) =>{
        //         setError(err.message);
        //     });
        // }else{
        //     result = await result.json();
        //     localStorage.setItem('user_info',JSON.stringify(result));
        //     navigate('/');
        //     // console.log(result);
        // }
    }

    return ( 
        <div className="col-md-6 m-auto bg-secondary bg-opacity-10 p-5 my-5">
            <h3 className='text-center'>Add Products</h3>
                <Form>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Product Name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicFilePath">
                    <Form.Label>File Path</Form.Label>
                    <Form.Control type="file" onChange={(e) => setFile(e.target.files[0])} placeholder="File Path" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Product Description" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formSize">
                    <Form.Label>Product Size</Form.Label>
                    <Form.Control type="size" value={size} onChange={(e) => setSize(e.target.value)} placeholder="Product Size" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPrice">
                    <Form.Label>Priduct Price</Form.Label>
                    <Form.Control type="price" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Product Price" />
                </Form.Group>
                {error && <div className='text-danger'>{error}</div>}

                <Button variant="primary" onClick={add_product} type="submit" className='mt-3'>
                    Add Product
                </Button>
                </Form>
        </div>
     );
}
 
export default AppProduct;