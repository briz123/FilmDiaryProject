/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';
import FormLists from './FormLists';
import ListsDisplay from './ListsDisplay';

const App = () => {
  const [userId] = useState('bcb5360'); 
  const [listsUpdated, setListsUpdated] = useState(false);

  const handleCreateList = () => {
    setListsUpdated(!listsUpdated); 
  };

  return (
    <div>
      <h1>Welcome to the Film Diary</h1>
      <FormLists userId={userId} onCreate={handleCreateList} />
      <ListsDisplay userId={userId} />
    </div>
  );
};

export default App;
