import React from 'react';
import { connect, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../actions/Cartactions';
import '../my.css';
import axios from 'axios';

const PlaceOrderScreen = ({ cartItems, removeFromCart, updateQuantity, clearCart }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userId = useSelector((state) => state.userLogin.userInfo.id);

  const total = cartItems.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);

  const handleComplete = async () => {
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const cartData = {
        user: userId
      };

      const cartResponse = await axios.post('http://127.0.0.1:8000/api/orders/carts/', cartData, config);
      const cartItemId = cartResponse.data.id;

      const cartItemData = cartItems.map((item) => {
        const { product, quantity } = item;
        return {
          cart: cartItemId,
          product: product.id,
          quantity: quantity
        };
      });

      const cartItemResponse = await axios.post('http://127.0.0.1:8000/api/orders/cart-items/bulk/', cartItemData, config);
      const cartProductIds = cartItemResponse.data.map((item) => item.id);

      const orderData = {
        user: userId,
        total: total.toFixed(2),
        items: cartProductIds
      };

      const OrderResponse = await axios.post('http://127.0.0.1:8000/api/orders/orders/', orderData, config);
      window.location.href = '/Success';

    } catch (error) {
      console.error('Error : ', error);
    }
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  return (
    <div className='loginPage'>
      <h1>SİPARİŞİ TAMAMLA</h1>
      {cartItems.length === 0 ? (
        <p>Sepetiniz boş.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item.product.id}>
                <span className='mleft-20'><img className='img-product-class' src={item.product.image}></img></span>
                <span className='mleft-20'>{item.product.name}</span>
                <span className='mleft-20'>{item.product.price}</span>
                <span className='mleft-20'>
                  {item.quantity}
                </span>
                <span>
                </span>
              </li>
            ))}
          </ul>
          <p className='totalprice'>Toplam Fiyat: ${calculateTotalPrice().toFixed(2)}</p>
        </div>
      )}
      <button onClick={handleComplete} >Siparişi Tamamla</button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cart.cartItems,
  };
};

export default connect(mapStateToProps, { removeFromCart, updateQuantity, clearCart })(
  PlaceOrderScreen
);
