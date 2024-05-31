import './App.css';
import './bootstrap.min.css';
import Header from './component/Header';
import Footer from './component/Footer';
import HomeScreen from './screen/HomeScreen';
import AboutScreen from './screen/AboutScreen';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductScreen from './screen/ProductScreen';
import CategoryWithProduct from './screen/CategoryWithProduct';
import LoginScreen from './screen/LoginScreen';
import ProductListScreen from './screen/ProductListScreen';
import ContactScreen from './screen/ContactScreen';
import RegisterScreen from './screen/RegisterScreen';
import ProfileScreen from './screen/ProfileScreen';
import UpdateUserProfileScreen from './screen/UpdateUserProfileScreen';
import CartScreen from './screen/CartScreen';
import PlaceOrderScreen from './screen/PlaceOrderScreen';
import CategoryScreen from './screen/CategoryScreen';
import OrderScreen from './screen/OrderScreen';
import Success from './screen/Success';
import ProductControlScreen from './screen/ProductControlScreen';
import ProductUpdateScreen from './screen/ProductUpdateScreen';
import ProductCreateScreen from './screen/ProductCreateScreen';
import UserAdminScreen from './screen/userAdminScreen';

function App() {
  
  return (
    <Router>
      <div className="App">
        <Header />

        <Routes>
          
          <Route path="/" element={<HomeScreen />} />
          <Route path="/about" element={<AboutScreen />} />
          <Route path="/products/:id" element={<ProductScreen />} />
          <Route path="/category/:id" element={<CategoryWithProduct />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/product" element={<ProductListScreen />} />
          <Route path="/contact" element={<ContactScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/Profile/:username" element={<ProfileScreen />} />
          <Route path="/UpdateProfile" element={<UpdateUserProfileScreen />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/PlaceOrder" element={<PlaceOrderScreen />} />
          <Route path="/Category" element={<CategoryScreen />} />
          <Route path="/Order" element={<OrderScreen />} />
          <Route path="/Success" element={<Success />} />
          <Route path="/ProductControl" element={<ProductControlScreen />} />
          <Route path="/products/update/:id" element={<ProductUpdateScreen />} />
          <Route path="/products/create" element={<ProductCreateScreen />} />
          <Route path="/userAdmin" element={<UserAdminScreen />} />
          

   
          
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;