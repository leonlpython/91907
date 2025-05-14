
import { GoogleLogin } from '@react-oauth/google';
import React, { useState ,useEffect} from 'react';  
import { jwtDecode } from "jwt-decode"; 



function App() {

	return (
		<div>
			<>
                <GoogleLogin
                    onSuccess={(credentialResponse) => {
                        const decoded = jwtDecode(credentialResponse?.credential);
                        console.log(decoded);
                        console.log(decoded?.name);
                        location.replace("calender.html");
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
				/>
			</>
		</div>
	);
};




export default App
