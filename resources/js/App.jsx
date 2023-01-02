import React from 'react';
import { createRoot } from 'react-dom/client'
import Nav from './Component/Nav';

export default function App(){
    return(
        <Nav/>
    );
}

if(document.getElementById('root')){
    createRoot(document.getElementById('root')).render(<App />)
}
