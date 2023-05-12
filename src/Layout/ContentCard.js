import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';

function ContentCard() {

  const [data,setData] = useState([]);

  useEffect(()=>{
    getData();
    
      },[]);
      console.log(data);

    async function getData()
    {
        let result = await fetch("http://localhost:8000/api/list");
        result = await result.json();
        setData(result)
    }
  
  const Loadproduct = () => {
    console.log('send to product');
  }
  return (
    <div className='mb-5'> 
        <Row xs={1} md={4} className="g-2">
          {data && data.map((item, i) => (
            <Link to={"list/"+item.id} className='mb-4'>
              <Col>
                <Card key={i}>
                  <Card.Img variant="top" src={"http://localhost:8000/"+item.file_path} />
                  <Card.Body className='text-center' style={{height:"150px", overflowY: 'scroll'}}>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>
                      {item.description}
                    </Card.Text>
                    <Button variant="primary">Book Now</Button>
                  </Card.Body>
                </Card>
              </Col>
            </Link>
          ))}
        </Row>
    </div>
  );
}

export default ContentCard;