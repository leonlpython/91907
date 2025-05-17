import { GoogleLogin } from '@react-oauth/google';
import React, { useState } from 'react';  
import { jwtDecode } from "jwt-decode"; 



function App() {
  return (
    <>
        <GoogleLogin
            onSuccess={(credentialResponse) => {
              const decoded = jwtDecode(credentialResponse?.credential);
              console.log(decoded);
              console.log(decoded?.name)
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
    </>
  )
}

export default App


//db password : byTFkEQ3UTyExaN