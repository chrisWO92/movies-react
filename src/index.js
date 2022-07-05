import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Componente({ title, children }) {
  
  return (
    <div className='container'>
      <h1>{title}</h1>
      <div>{children}</div>
    </div>
  );

}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Componente title="Title">Hola Desde React</Componente>
);

