// /* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';
import FormLists from './FormLists';
import ListsDisplay from './DisplayLists'
import LoginForm from './loginForm';

const App = () => {
  //hardcoded for now
  //later ill make a form for users to register an be added to the mongodb
  // const [username] = useState('bcb5360'); 
  // const [userId,setUserId] = useState('672d8ae51f54359e52aec2fd')
  const [userId,setUserId] = useState(null);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
  const handleLogin = () => {
    setUserId(userId); 
    setIsLoggedIn(true); 
    setShowLoginForm(false); 
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserId(null);
  };
  const handleLoginForm = () => {
    setShowLoginForm(!showLoginForm); // Toggle the form visibility
  };
  // //button to register new account
  // const handleRegisterClick = () => {

  // };

  return (
    <div>
      <h1>Welcome to the Film Diary</h1>
      {!isLoggedIn && (
        <div>
          <button onClick={handleLoginForm}>
            {showLoginForm ? 'Close Login Form' : 'Login'}
          </button>
          {showLoginForm && <LoginForm onLogin={handleLogin} />}
        </div>
      )}

      {/* show logout button and lists if logged in */}
      {isLoggedIn && (
        <div>
          <button onClick={handleLogout}>Logout</button>
          <FormLists userId={userId} onCreate={handleCreateList} />
          <ListsDisplay userId={userId} />
        </div>
      )}
    </div>
  );
};

export default App;
