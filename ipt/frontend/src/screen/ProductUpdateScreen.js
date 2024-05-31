import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails, updateProduct } from '../actions/ProductActions';
import { useParams } from 'react-router-dom';
import { fetchCategories } from '../actions/CategoryAction';


const ProductUpdateScreen = ({ match, history }) => {
  const { id } = useParams();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  let category=5

  const dispatch = useDispatch();

  const productUpdate = useSelector((state) => state.productUpdate);
  const { loading, error, success } = productUpdate;

  const productDetails = useSelector((state) => state.productDetails);
  const {  product : fetchProduct } = productDetails;

  const {categories} = useSelector((state) => state.category);

  function handleCategoryChange(event){
    category = event.target.value
  }


  useEffect(() => {
    dispatch(fetchCategories());

    dispatch(getProductDetails(id));
   

    const product = {
      _id: id,
      name: fetchProduct.name,
      price: fetchProduct.price,
      description: fetchProduct.description,
    };

    if (product) {
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
    }
  }, [id]);

  const submitHandler = (e) => {
    e.preventDefault();

    // Update the product with the new data
   

    dispatch(updateProduct({id, name, price, category}));
  };

  return (
    <div>
      <h1>Edit Product</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {success && <p>Product updated successfully</p>}
      <form onSubmit={submitHandler}>

      <div>
      <label htmlFor="name">Kategori</label>
        <select onChange={handleCategoryChange} id="categorySelect">
      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
      </select>
        </div>

        <div>
          <label htmlFor="name">İsim</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="price">Fiyat</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Açıklama</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">Ürünü güncelle</button>
      </form>
    </div>
  );
};

export default ProductUpdateScreen;
