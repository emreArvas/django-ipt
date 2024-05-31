import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, createCategory, updateCategory, deleteCategory } from '../actions/CategoryAction';
import { useNavigate } from 'react-router-dom';


const CategoryScreen = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.category);
  const [name, setName] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [categoryId, setCategoryId] = useState(null);

  const history = useNavigate()

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  

  useEffect(() => {

    if(userInfo && userInfo.is_superuser)
    {
        dispatch(fetchCategories());
    }
    else{
        history('/giris')
    }
    
  }, [dispatch]);

  const handleDelete = (categoryId) => {
    if (window.confirm('Bu kategoriyi silmek istediğinizden emin misiniz?')) {
      dispatch(deleteCategory(categoryId));
    }
  };

  const handleAddCategory = () => {
    dispatch(createCategory({ name }));
    setName('');
  };

  const handleUpdateCategory = () => {
    if (categoryId) {
      dispatch(updateCategory(categoryId, { name }));
      setName('');
      setEditMode(false);
      setCategoryId(null);
    }
  };

  const handleEdit = (categoryId, categoryName) => {
    setName(categoryName);
    setEditMode(true);
    setCategoryId(categoryId);
  };

  return (
    <div className='loginPage'>
      <h1>Kategori Listesi</h1>
      {loading ? (
        <p>Yükleniyor...</p>
      ) : error ? (
        <p>Hata: {error}</p>
      ) : (
        <div>
          <ul>
            {categories.map((category) => (
              <li key={category.id}>
                {category.name}{' '}
                <button onClick={() => handleEdit(category.id, category.name)}>Düzenle</button>{' '}
                <button onClick={() => handleDelete(category.id)}>Sil</button>
              </li>
            ))}
          </ul>
          <div>
            {editMode ? (
              <div>
                <h2>Kategoriyi Düzenle</h2>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <button onClick={handleUpdateCategory}>Güncelle</button>
                <button onClick={() => setEditMode(false)}>İptal</button>
              </div>
            ) : (
              <div>
                <h2>Kategori Ekle</h2>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <button onClick={handleAddCategory}>Ekle</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryScreen;
