import { useState, useEffect } from 'react';
import axios from 'axios';
const API = import.meta.env.VITE_BACKEND_URL;
console.log(API)
// eslint-disable-next-line react/prop-types
const ListsDisplay = ({ userId ,listsUpdated}) => {
  const [lists, setLists] = useState([]);
  
  useEffect(() => {
    // if (!userId) {
    //   console.error("No userId to fetch lists.");
    //   return;
    // }
    const fetchLists = () => {
      axios
        .get(`${API}/api/lists/${userId}`)
        //.get(`http://localhost:12153/api/lists/${userId}`)
        .then((res) => {
          setLists(res.data);
        })
        .catch((error) => console.log('Error getting your lists:', error));
    };
    //we should be getting the lists over and over so we can display them all
    fetchLists();
    //had to use AI tool to get this function right because I ddint quite understand how to achieve this
  }, [userId,listsUpdated]);

  return (
    <div>
      <h3> Your Lists </h3>
        <ul>
          {/* //get lists by id but print out names not id */}
          {/* console.log(lists); */}
          {lists.map((list) => (
            <li key={list._id}>{list.listname}</li>
          ))}
        </ul>
    </div>
  );
};

export default ListsDisplay;