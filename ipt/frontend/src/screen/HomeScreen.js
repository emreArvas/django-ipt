import React from 'react';
import ProductList from '../component/ProductList';
import Slider from '../component/Slider';
import '../my.css';

function HomeScreen() {
  return (
    <div> 
     
       
      <div className='container'>
        <div className='row'>
          <div className='col-sm-3 m-top25'> 
            <div className="mb-20">
              <i className="fa-solid fa-truck-fast fa-2xl s1"></i>
            </div>
            <h6>ÜCRETSİZ KARGO</h6>
            <p>Dünya çapında ücretsiz teslimat</p>
          </div>
          <div className='col-sm-3 m-top25'> 
            <div className="mb-20">
              <i className="fa-solid fa-envelope fa-2xl s2"></i>
            </div>
            <h6>Çevrimiçi Sipariş</h6>
            <p>Dünya çapında ücretsiz teslimat</p>
          </div>
          <div className='col-sm-3 m-top25'> 
            <div className="mb-20">
              <i className="fa-solid fa-star fa-2xl s3"></i>
            </div>
            <h6>Alışveriş ve Tasarruf</h6>
            <p>Dünya çapında ücretsiz teslimat</p>
          </div>
          <div className='col-sm-3 m-top25'> 
            <div className="mb-20">
              <i className="fa-solid fa-phone fa-2xl s4"></i>
            </div>
            <h6>Güvenli Alışveriş</h6>
            <p>Dünya çapında ücretsiz teslimat</p>
          </div>
        </div>
      </div>
      <ProductList></ProductList>
    </div>
  );
}

export default HomeScreen;
