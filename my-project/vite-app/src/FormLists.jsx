/* eslint-disable react/prop-types */
// /* eslint-disable react/react-in-jsx-scope */

//https://www.freecodecamp.org/news/how-to-create-forms-in-react-using-react-hook-form/
import { useState } from 'react';
import axios from 'axios';
// const API = 'http://localhost:23399';
//const API = import.meta.env.VITE_BACKEND_URL;
// const response = await fetch(`${API}/products`);
const API = import.meta.env.VITE_BACKEND_URL;
//console.log(API);
const FormLists = ({ userId, onCreate }) => {
  const [listName, setListName] = useState('');
  //e.prevent
  //this was my first form and i did recieve a little help from tools to get this to work
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // console.log({ userId, listName }); 
      await axios.post(`${API}/api/lists`, { userId, listName });
      onCreate(); 
      setListName('');
    } catch (error) {
      console.log('error creating list:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>List Name: </label>
        <input
          type="text"
          value={listName}
          //source in md
          onChange={(e) => setListName(e.target.value)}
        />
      </div>
      <button type="submit"> Create List </button>
    </form>
  );
};

export default FormLists;