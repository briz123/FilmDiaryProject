import { useState} from "react";
import axios from 'axios';
const API = import.meta.env.VITE_BACKEND_URL;
const ShowForm = ({listId, onShowAdded}) =>{
    //details should be defaulted at first to nothing
    const [showDetails,setShowDetails] = useState({
        title:'',
        year:'',
        description:'',
        genre:'',
        rating: 0,
        reviewDescription:''
    });
    //once user changes something it needs to overwite
    //https://stackoverflow.com/questions/67265409/how-to-handle-input-change-in-react
    const handleInputChange=(evt)=>{
        const {name,value}=evt.target;
        setShowDetails((prevDetails)=>({
            ...prevDetails,
            [name]:value,
        }))
    }
    //https://legacy.reactjs.org/docs/forms.html
    //https://stackoverflow.com/questions/69856257/using-async-await-in-a-handle-submit
    const handleSubmit = async (evt)=>{
        evt.preventDefault();
        const response = await axios.post(`${API}/api/items`, {
            listId,
            ...showDetails,
          });
          onShowAdded(response.data); 
          setShowDetails({
            title: '',
            year: '',
            description: '',
            genre: '',
            rating: 0,
            reviewDescription:''
          });
    }
    return (
        //return details:
        <form onSubmit={handleSubmit}>
          <h3>Add a Show or Movie to the List</h3>
          <div>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={showDetails.title}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Year:</label>
            <input
              type="number"
              name="year"
              value={showDetails.year}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Description:</label>
            <input
              type="text"
              name="description"
              value={showDetails.description}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Genre:</label>
            <input
              type="text"
              name="genre"
              value={showDetails.genre}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Rating:</label>
            <input
              type="number"
              name="rating"
              value={showDetails.rating}
              onChange={handleInputChange}
              min="0"
              max="1"
            />
          </div>
          <div>
            <label>Review:</label>
            <input
              type="text"
              name="reviewDescription"
              value={showDetails.reviewDescription}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Add Show/Movie</button>
        </form>
      );
}
export default ShowForm;