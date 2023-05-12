import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logoColor from './logoColor.png';

const Footer = () => {
        return ( 
            <footer className="footer mt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 d-flex justify-content-center">
                            <div className="footer__text">
                                <div className="footer__logo my-5">
                                    <img src={logoColor} width="200" height="150" alt="" className='mb-4'/>
                                    <p>Pick your favourite attire with your own desire. Customized cloths make you brave and unique.
                                        <br /> Be a idol in real life via choosing your fovourite idols outfits.
                                        <br /> Choose your attires in your favourite showroom allover the world.
                                    </p>
                                </div>
                                <div className="footer__social">
                                    <a href="#"><i className="fa fa-facebook"></i></a>
                                    <a href="#"><i className="fa fa-twitter"></i></a>
                                    <a href="#"><i className="fa fa-instagram"></i></a>
                                    <a href="#"><i className="fa fa-youtube-play"></i></a>
                                    <a href="#"><i className="fa fa-envelope-o"></i></a>
                                </div>
                            
                                <div className="footer__copyright d-flex justify-content-center">
                                    <p style={{fontFamily:'serif' }}>
                                        Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i className ="fa fa-heart" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Dress Zone</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
 
export default Footer;