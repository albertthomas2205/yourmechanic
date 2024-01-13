import logo from './logo.svg';

import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Userwarper from './Router/user/Userwarper';
import Adminwarper from './Router/admin/Adminwarper';
import Mechanicwarper from './Router/Mechanic/Mechanicwarper';
// import "./App.css"
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from "@stripe/stripe-js/pure";
const stripePromise = loadStripe("your_stripe_public_key");
function App() {
  function handleCallbackResponse(response) {
    // Handle the callback response
  }



  const [isAdmin, setIsAdmin] = useState(true);

  return (
    <>
    <div className="App">
      <div id="signInDiv"></div>
      
  
      <BrowserRouter>
      
        <Routes>
          
          <Route path="*" element={<Userwarper />} />
          <Route path="mechanic/*" element={<Mechanicwarper/>} />
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
