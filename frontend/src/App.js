import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Userwarper from './Router/user/Userwarper';
import Adminwarper from './Router/admin/Adminwarper';
import PrivateRoute from './Router/admin/PrivateRoute.js';

function App() {
  function handleCallbackResponse(response) {
    // Handle the callback response
  }

  useEffect(() => {
    // Uncomment and correct the initialization code for Google Sign-In if needed
    // google.accounts.id.initialize({
    //   client_id: 'your_client_id',
    //   callback: handleCallbackResponse
    // });

    // Uncomment the code for rendering Google Sign-In button if needed
    // google.accounts.id.renderButton(
    //   document.getElementById('signInDiv'),
    //   { theme: 'outline', size: 'large' }
    // );
  }, []);

  const [isAdmin, setIsAdmin] = useState(true);

  return (
    <>
    <div className="App">
      <div id="signInDiv"></div>
      <BrowserRouter>

        <Routes>
          <Route path="*" element={<Userwarper />} />
     <Route
            path="admin/*"
            element={<Adminwarper />}/>
       
        </Routes>
    
      </BrowserRouter>
    </div>
    </>
  );
}

export default App;
