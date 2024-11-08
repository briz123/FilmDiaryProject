/* eslint-disable react/prop-types */
// /* eslint-disable react/react-in-jsx-scope */

//https://www.freecodecamp.org/news/how-to-create-forms-in-react-using-react-hook-form/
import { useState } from 'react';
import axios from 'axios';
const API = 'http://localhost:23399';
//const API = import.meta.env.VITE_BACKEND_URL;
// const response = await fetch(`${API}/products`);

const FormLists = ({ userId, onCreate }) => {
  const [listName, setListName] = useState('');

  const handleSubmit = async (event) => {
      axios.post('http://localhost:23399/api/lists', { userId, listname: listName })
      .then(response => {
      onCreate(response.data); 
      setListName(''); 
    }) .catch (error => {
      console.log('Error creating list', error);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>List Name: </label>
        <input
          type="text"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
        />
      </div>
      <button type="submit"> Create List </button>
    </form>
  );
};

export default FormLists;