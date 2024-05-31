import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../actions/AdminActions';
import { getProductDetails } from '../actions/ProductActions';
import { Link } from 'react-router-dom';
import '../my.css';

const OrderScreen = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  useEffect(() => {
    orders.forEach((order) => {
      order.items.forEach((item) => {
        dispatch(getProductDetails(item.product.id));
      });
    });
  }, [orders, dispatch]);

  return (
    <div>
      <h1>Sipariş Listesi</h1>
      {loading ? (
        <p>Yükleniyor...</p>
      ) : error ? (
        <p>Hata: {error}</p>
      ) : (
        <ul>
          <div className="product-order-sc"></div>
          {orders.map((order) => (
            <div className='product-order-sc' key={order.id}>
              <div className="row">
                <div className="col">
                  Sipariş ID: {order.id}
                </div>
                <div className="col">
                  Toplam: {order.total}
                </div>
                <div className="col">
                  Oluşturma Tarihi: {new Date(order.created).toLocaleString()}
                </div>
                <div className="col">
                  Güncellenme Tarihi: {new Date(order.updated).toLocaleString()}
                </div>
                <div className="col">
                  Kullanıcı ID: {order.user}
                </div>
              </div>
              <ul>
                <div className='container'>
                  <div className='row'>
                    <div className='col-xs-12 col-sm-12'>
                      <div className="product-list">
                        {order.items.map((item) => (
                          <div className="product" key={item.product.id}>
                            <img className='img-product-class' src={item.product.image} alt={item.product.name} />
                            <h3>{item.product.name}</h3>
                            <p>{item.product.description}</p>
                            <p className='price-product'>$ {item.product.price}</p>
                            <Link to={`/products/${item.product.id}`}>Görüntüle</Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </ul>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderScreen;