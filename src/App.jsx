import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './component/Index.jsx';
import AboutUs from './component/AboutUs/AboutUs.jsx';
import SignUp from './component/registration/SignUp.jsx';
import CreateProduct from './component/CreateProduct.jsx';
import DeleteProduct from './component/DeleteProduct.jsx';
import FindProduct from './component/FindProduct.jsx';
import AddToCart from "./component/AddToCart.jsx";
import DeleteFromCart from "./component/DeleteFromCart.jsx";
import MakePayment from "./component/MakePayment.jsx";
import { StrictMode } from 'react';

function App() {
    return (
        <Router>
            <StrictMode>
                <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/about-us" element={<AboutUs />} />
                    <Route path="/sign-up" element={<SignUp />} />

                    <Route path="/" element={<AboutUs />} />
                    <Route path="/create_product" element={<CreateProduct />} />
                    <Route path="/delete_product" element={<DeleteProduct />} />
                    <Route path="/find_product" element={<FindProduct />} />
                    <Route path="/add_to_cart" element={<AddToCart />} />
                    <Route path="delete_from_cart" element={<DeleteFromCart />} />
                    <Route path="make_payment" element={<MakePayment />} />
                </Routes>

            </StrictMode>
        </Router>
    );
}

export default App;