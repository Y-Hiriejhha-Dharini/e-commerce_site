import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Login = () => {
    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error,setError] = useState("");

    async function login(e)
    {
        e.preventDefault();
        let user_data = {email,password};
        let result = await fetch("http://localhost:8000/api/login",{
            method : 'POST',
            headers : {
                "Content-Type" :"application/json",
                "Accept" : "application/json"
            },
            body: JSON.stringify(user_data)
        });
            let res = result;
            // console.log(result);

            result = await result.json();
            localStorage.setItem('user_info',JSON.stringify(result));
            // console.log(result);
            
            if(!res.ok)
            {
                throw Error("User Couldn't Login")
            }else{
                navigate('/')
            }
            res.catch((err) =>{
                setError(err.message);
            });
    }

    return ( 
        <div className="col-md-6 m-auto bg-secondary bg-opacity-10 p-5 my-5">
            <h3 className='text-center'>Login Form</h3>
                <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                </Form.Group>
                {error && <div className='text-danger'>{error}</div>}

                <Button variant="primary" onClick={login} type="submit" className='mt-3'>
                    Login
                </Button>
                </Form>
        </div>
     );
}
 
export default Login;