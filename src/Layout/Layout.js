import Navbars from '../Layout/Navbars';
import '../Layout/index.css';
import Footer from './Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../Content/Login';
import Register from '../Content/Register';
import Order from '../Content/Order';
import Home from '../Content/Home';
import AddProduct from '../Content/AddProduct';
import Protected from '../Content/Protected';
import Product from '../Content/Product';
import EditProduct from '../Content/EditProduct';
import AddToCart from '../Content/AddToCart';
import Search from '../Content/Search';
import Category from '../Content/Category';
import CustomCloth from '../Content/CustomCloth';
import ShowRoom from '../Content/ShowRoom';
import ShowRoomProduct from '../Content/ShowRoomProduct';
import AddDepartments from '../Content/AddDepartments';

const Layout =({children}) =>{
    return(
        <>
        <div>
            <section>
                <Router>
                    <Navbars />
                        <Routes>
                            <Route path="/" exact element={<Home/>}></Route>
                            <Route path="/login" element={<Login/>}></Route>
                            <Route path="/register" element={<Register/>}></Route>
                            <Route path="/add_product" element={<Protected Page={AddProduct}/>}></Route>
                            <Route path="/order" element={<Protected Page={Order}/>}></Route>
                            <Route path="/list/:id" element={<Protected Page={Product}/>}></Route>
                            <Route path="/edit/:id" element={<Protected Page={EditProduct}/>}></Route>
                            <Route path="/cart" element={<Protected Page={AddToCart}/>}></Route>
                            <Route path="/search" element={<Protected Page={Search}/>}></Route>
                            <Route path="/category/:id" element={<Protected Page={Category}/>}></Route>
                            <Route path="/custom_cloth/:id" element={<Protected Page={CustomCloth}/>}></Route>
                            <Route path="/showroom/:id" element={<Protected Page={ShowRoom}/>}></Route>
                            <Route path="/showroom_product/:id" element={<Protected Page={ShowRoomProduct}/>}></Route>
                            <Route path="/add_department" element={<Protected Page={AddDepartments}/>}></Route>
                            <Route path="/customized/:id" element={<Protected Page={Category}/>}></Route>
                        </Routes>
                </Router>
            </section>
        </div>
        <main className='content'>
            {children}
        </main>
        <div>
            <section>
                <Footer />
            </section>
        </div>
        </>
    )
}

export default Layout;