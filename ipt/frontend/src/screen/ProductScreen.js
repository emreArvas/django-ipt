import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails } from '../actions/ProductActions';
import { addToCart } from '../actions/Cartactions';
import { useParams } from 'react-router-dom';

const ProductScreen = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  // Get product details from the Redux store
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    // Dispatch the getProductDetails action with the product ID when the component mounts
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  const handleAddToCart = () => {
    // Dispatch the addToCart action with the product details to add it to the cart
    dispatch(addToCart(product, 1)); // Assuming you want to add one item to the cart
  };

  return (
    <div>
      {loading ? (
        <h2>Yükleniyor...</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <div className='container'>
          <div className='row'>
            <div className='col-xs-6 col-sm-6'>
              <img src={product.image} alt={product.name} />
            </div>
            <div className='col-xs-6 col-sm-6'>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p className='price-product'>$ {product.price}</p>
              <button onClick={handleAddToCart}>Sepete ekle</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductScreen;
