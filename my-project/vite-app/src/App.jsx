// /* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';
import FormLists from './FormLists';
import ListsDisplay from './DisplayLists'

const App = () => {
  //hardcoded for now
  //later ill make a form for users to register an be added to the mongodb
  const [username] = useState('bcb5360'); 
  const [userId] = useState('672d8ae51f54359e52aec2fd')
  //
  const [listsUpdated, setListsUpdated] = useState(false);

  const handleCreateList = () => {
    //create a new list and eventually pass the process to the form for adding one
    setListsUpdated(!listsUpdated); 
  };
  //button to add new user
  // const handleLoginClick = () => {
   
  // };

  // //button to register new account
  // const handleRegisterClick = () => {

  // };

  return (
    <div>
      <h1> Welcome to the Film Diary </h1>
      {/* <div>
        <button onClick={handleLoginClick}>Login</button>
        <button onClick={handleRegisterClick}>Register</button>
      </div> */}
      {/* //takes user id as well as function above */}
      <FormLists userId={userId} onCreate={handleCreateList} />
      {/* //just userid since its only being used to display */}
      <ListsDisplay userId={userId} />
    </div>
  );
};

export default App;
