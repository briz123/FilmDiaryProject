import { useState, useEffect } from 'react';
import axios from 'axios';
import ShowForm from './showForm';
const API = import.meta.env.VITE_BACKEND_URL;
console.log(API)
// eslint-disable-next-line react/prop-types
const ListsDisplay = ({ userId ,listsUpdated}) => {
  const [lists, setLists] = useState([]);
  const [selectedListId, setSelectedListId] = useState(null);
  const [shows, setShows] = useState([]);
  
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
  //for viewing:
  useEffect(() => {
    console.log('Fetching shows for list ID:', selectedListId);
    if (selectedListId) {
      axios
        .get(`${API}/api/items/${selectedListId}`)
        .then((res) => {
          setShows(res.data);
        })
        .catch((error) => console.log('error with the shows:', error));
    }
  }, [selectedListId]);
  const handleShowAdded = (newShow) => {
    setShows((prevShows) => [...prevShows, newShow]);
  };

  return (
    <div>
      <h3> Your Lists </h3>
        <ul>
          {/* //get lists by id but print out names not id */}
          {/* console.log(lists); */}
          {lists.map((list) => (
            <li key={list._id}>
              {list.listname}
              <button onClick={() => setSelectedListId(list._id)}>View</button>
            </li>
          ))}
        </ul>
        {selectedListId && (
        <div>
          <h3> Shows and Movies in List</h3>
          <ul>
            {shows.map((show) => (
              <li key={show._id}>{show.title} ({show.year}) ({show.rating}) ({show.description}) ({show.genre}) </li>
            ))}
          </ul>
          <ShowForm listId={selectedListId} onShowAdded={handleShowAdded} />
        </div>
      )}
    </div>
  );
};

export default ListsDisplay;