import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.css';

function Carousels() {
      return (
        <Carousel slide={false} indicators={false}>
          <Carousel.Item>
            <img
              className="img d-block w-100"
              src="stores.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              <h1 className='fs-1 fw-bold text-white'>Pick best one in our branded showromms</h1>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="img d-block w-100"
              src="custom-apparel.jpeg"
              alt="Second slide"
            />
    
            <Carousel.Caption>
              <h1 className='fs-1 fw-bold text-white'>Customized cloths make you unique</h1>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="img d-block w-100"
              src="girl_product.jpg"
              alt="Third slide"
            />
    
            <Carousel.Caption>
              <h1 className='fs-1 fw-bold text-white'>Your choice is in your finger tips</h1>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      );
    }

export default Carousels;