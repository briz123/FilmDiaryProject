// /* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react';
import FormLists from './FormLists';
import ListsDisplay from './DisplayLists'
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';
import ShowForm from './showForm';
import axios from 'axios';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import * as React from 'react';
import { CacheProvider } from '@emotion/react';

const API = import.meta.env.VITE_BACKEND_URL;
const App = () => {
  //hardcoded for now
  //later ill make a form for users to register an be added to the mongodb
  // const [username] = useState('bcb5360'); 
  // const [userId,setUserId] = useState('672d8ae51f54359e52aec2fd')
  //so I can show my components:
  const [userId,setUserId] = useState(null);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [reviews,setReviews]= useState([]);
  //
  const [listsUpdated, setListsUpdated] = useState(false);
  //console.log(username);

  const handleCreateList = () => {
    //create a new list and eventually pass the process to the form for adding one
    setListsUpdated(!listsUpdated);
  };
  //button to add new user
  // const handleLoginClick = () => {
   
  // };
  //had to use tools to figure out how do some of the things below especially setIsLoggedIn etc.
  const handleLogin = (userId) => {
    setUserId(userId); 
    setIsLoggedIn(true); 
    setShowLoginForm(false); 
  };
  const handleRegister = (userId) => {
    setUserId(userId); 
    setIsLoggedIn(true); 
    setShowLoginForm(false); 
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserId(null);
    
  };
  const handleLoginForm = () => {
    setShowLoginForm(!showLoginForm); 
  };
  const handleRegistrationForm = () => {
    setShowRegistrationForm(!showRegistrationForm);
  };
  // //button to register new account
  // const handleRegisterClick = () => {

  // };
  //for reviews to show up on home page:
  //need to fetch if user id changes
  useEffect(()=>{
    if(userId){
      fetchReviews()
    }
  },[userId]);

  const fetchReviews = async () => {
    //no user 
    if (!userId) return;  
    try {
      const response = await axios.get(`${API}/api/items/user/${userId}`);
      const data = response.data.map((item) => ({
        title: item.title,  
        id: item._id,
        reviewDescription: item.reviewDescription,
      }));
      setReviews(data);
    } catch (error) {
      console.error("error getting reviews:", error);
    }
  };
  //https://mui.com/x/react-data-grid/
  //used mui and their documentation to display a users reviews
  const columns = [
    {field:'id',headerName:'ID',width:90},
    {field: 'title',headerName: 'Title',width: 90},
    {field: 'reviewDescription',headerName: 'Reviews',width: 150},
  ];


  return (
    <div>
    <h1>Welcome to the Film Diary</h1>
    {/* landing page should have login/register buttons */}
    {/* only if user is not logged in so !isLoggedIn */}
    {!isLoggedIn && (
      <div>
        <button onClick={handleLoginForm}>
          {showLoginForm ? 'Close Login Form' : 'Login'}
        </button>
        <button onClick={handleRegistrationForm}>
          {showRegistrationForm ? 'Close Registration Form' : 'Registration'}
        </button>
        {showLoginForm && <LoginForm onLogin={handleLogin} />}
        {showRegistrationForm && <RegistrationForm onRegister={handleRegister} />}
      </div>
    )}
    {/* logged in should show lists and the option to create a new list */}
    {isLoggedIn && (
      <div>
        <button onClick={handleLogout}>Logout</button>
        <FormLists userId={userId} onCreate={handleCreateList} />
        <ListsDisplay userId={userId} listsUpdated={listsUpdated} />
        {/* https://mui.com/x/react-data-grid/
        using the free version and the DataGridDemo */}
        <Box sx={{ height: 400, width: '100%' }}>
        <div style={{ height: 400, width: '100%' }}>
          <h3>Reviews</h3>
          <DataGrid rows={reviews} columns={columns} pageSizeOptions={5} />
        </div>
        </Box>
      </div>
    )}
  </div>
  );
};

export default App;
