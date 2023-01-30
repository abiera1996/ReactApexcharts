import HomePage from 'pages/Home';
import React from 'react';
import { 
    BrowserRouter, 
    Route, 
    Routes
} from 'react-router-dom'; 


function AppRouter() {
    return (
        <BrowserRouter> 
            <Routes>
                <Route exact path="/" element={<HomePage />}/>
            </Routes>
        </BrowserRouter> 
    );
}

export default AppRouter;