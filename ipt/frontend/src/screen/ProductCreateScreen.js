import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../actions/ProductActions';
import { fetchCategories } from '../actions/CategoryAction';
import { useNavigate } from 'react-router-dom';

const ProductCreateScreen = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('5');

  const dispatch = useDispatch();
  const history = useNavigate()

  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    // Create the product with the new data
    dispatch(createProduct({ name, price, description, category}));

    // Redirect to the product list page or any other desired page after creation
    history('/ProductControl');
  };

  return (
    <div>
      <h1>Ürün ekle</h1>
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
        <button type="submit">Ürünü ekle</button>
      </form>
    </div>
  );
};

export default ProductCreateScreen;