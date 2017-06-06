import React from 'react';

export default function View({
  name,
  surname,
  products=[]
}) {
  return (
    <div>
      <h1>{ name }</h1>
      <h2>{ surname }</h2>
      { products && products.length &&
        <ul>
          {
            products.map( ({id, name}) => (
              <li key={ id }>{ name }</li>
            ))
          }
        </ul>
      }
      {  products && !products.length &&
        <span>Список продуктов пуст</span>
      }
    </div>
  )
}