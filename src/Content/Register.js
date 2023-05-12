
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

const Register = () => {

    const [name, SetName] = useState("");
    const [email, SetEmail] = useState("");
    const [password, SetPassword] = useState("");
    const [user_type, SetUserType] = useState("");
    const [address, SetAddress] = useState("");
    const [telephone, SetTelephone] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    useEffect(()=>{
        if(localStorage.getItem('user_info'))
        {
            navigate('/');
        }
    },[]);

    async function signUp(e)
    {
        e.preventDefault();
        let user_data = {name, email, password, user_type, address, telephone};
        console.log(user_data);
        let result = await fetch("http://localhost:8000/api/register",{
            method : 'POST',
            headers : {
                "Content-Type" :"application/json",
                "Accept" : "application/json"
            },
            body: JSON.stringify(user_data)
        });
            let res = result;
            result = await result.json();
            localStorage.setItem('user_info',JSON.stringify(result));

                if(!res.ok)
                {
                    throw Error("User Couldn't Register")
                }else{
                    navigate('/');
                }
            res.catch((err) =>{
            setError(err.message);
            });
    }


    return ( 
        <div className="col-md-6 m-auto bg-secondary bg-opacity-10 p-5 my-5">
            <h3 className='text-center'>Register Form</h3>
                <Form>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="name" value={name} onChange={(e) => SetName(e.target.value)} placeholder="Enter Name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={email} onChange={(e) => SetEmail(e.target.value)} placeholder="Email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>formBasicPassword</Form.Label>
                    <Form.Control type="password" value={password} onChange={(e) => SetPassword(e.target.value)} placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>User Type</Form.Label>
                    <Form.Select  value={user_type} onChange={(e) => SetUserType(e.target.value)}>
                        <option>User Type</option>
                        <option value="admin" >Admin</option>
                        <option value="user" >User</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="address" value={address} onChange={(e) => SetAddress(e.target.value)} placeholder="Address" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicTelephone">
                    <Form.Label>Telephone</Form.Label>
                    <Form.Control type="telephone" value={telephone} onChange={(e) => SetTelephone(e.target.value)} placeholder="Telephone" />
                </Form.Group>
                {error && <div className='text-danger'>{error}</div>}

                <Button variant="primary" onClick={signUp} type="submit" className='mt-3'>
                    Submit
                </Button>
                </Form>
        </div>
     );
}
 
export default Register;