import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../actions/Cartactions';
import '../my.css';
import { useLocation, useNavigate } from 'react-router-dom';

const CartScreen = ({ cartItems, removeFromCart, updateQuantity, clearCart }) => {
  const history = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const location = useLocation();
  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (!userInfo) {
      history(redirect);
    }
  }, [userInfo, redirect, history]);

  const placeSubmit = () => {
    history('/SiparisVer');
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  return (
    <div className='loginPage'>
      <h1>Sepetiniz</h1>
      {cartItems.length === 0 ? (
        <p>Sepetiniz boş</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item.product.id}>
                <span className='mleft-20'>
                  <img className='img-product-class' src={item.product.image} alt={item.product.name} />
                </span>
                <span className='mleft-20'>{item.product.name}</span>
                <span className='mleft-20'>{item.product.price}</span>
                <span>
                  <button
                    className='mleft-20'
                    onClick={() =>
                      updateQuantity(
                        item.quantity > 1 ? item.product.id : null,
                        item.quantity > 1 ? item.quantity - 1 : item.quantity
                      )
                    }
                  >
                    -
                  </button>
                  {item.quantity}
                  <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>+</button>
                </span>
                <span>
                  <button className='mleft-20' onClick={() => removeFromCart(item.product.id)}>
                    Temizle
                  </button>
                </span>
              </li>
            ))}
          </ul>
          <p className='totalprice'>Toplam Fiyat: ${calculateTotalPrice().toFixed(2)}</p>
        </div>
      )}
      <button onClick={() => clearCart()}>Sepeti Temizle</button>
      <button className='button-bg' onClick={placeSubmit}>Sonraki</button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cart.cartItems,
  };
};

export default connect(mapStateToProps, { removeFromCart, updateQuantity, clearCart })(
  CartScreen
);
