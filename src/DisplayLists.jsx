/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */

import { useState, useEffect } from 'react';
import axios from 'axios';

const API = import.meta.env.VITE_BACKEND_URL;

const ListsDisplay = ({ userId }) => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    // Fetch lists 
    axios
      .get(`${API}/api/lists/${userId}`)
      .then((response) => {
        setLists(response.data); 
      })
      .catch((error) => console.error('Error fetching lists:', error));
  }, [userId]); 

  return (
    <div>
      <h3>Your Lists</h3>
      <ul>
      {lists.map((list) => (
          <li key={list._id}> {list.listname} </li>
        ))}
      </ul>
    </div>
  );
};

export default ListsDisplay;
