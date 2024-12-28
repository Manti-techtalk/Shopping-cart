import React, { useReducer, useEffect, useState } from 'react';

const initialState = { sum: 0, cart: [] };

const reducer = (state, action) => {
  switch (action.type) {
    case 'addToCart':
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
          sum: state.sum + action.payload.price
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, quantity: 1 }],
          sum: state.sum + action.payload.price
        };
      }
    case 'removeFromCart':
      const itemToRemove = state.cart.find(item => item.id === action.payload.id);
      if (itemToRemove.quantity > 1) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity - 1 } : item
          ),
          sum: state.sum - action.payload.price
        };
      } else {
        return {
          ...state,
          cart: state.cart.filter(item => item.id !== action.payload.id),
          sum: state.sum - action.payload.price
        };
      }
    default:
      throw new Error('UNKNOWN ACTION TYPE');
  }
};

function Shoppingcart() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products?limit=5');
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddToCart = (product) => {
    dispatch({ type: 'addToCart', payload: product });
  };

  const handleRemoveFromCart = (product) => {
    dispatch({ type: 'removeFromCart', payload: product });
  };

  return (
    <div className="bg-light container vh-100">
      <div className="container">
        <div className="row bg-secondary">
          <div className="col-11">
            <h1>Shop X</h1>
          </div>
          <div className="col-1">
            <h1><i className="fa-solid fa-cart-shopping"></i> ${state.sum.toFixed(2)}</h1>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-12">
            <p className='h1 text-center'>Shopping Cart</p>
          </div>
        </div>
        <div className="row">
          {products.map(product => (
            <div key={product.id} className="col-12 mb-3">
              <div className="row">
                <div className="col-2 border border-black">
                  <img src={product.image} alt={product.title} className="img-fluid" />
                </div>
                <div className="col-8 justify-content-start border border-dark">
                  <h4>{product.title}</h4>
                  <p>${product.price}</p>
                  <span
                    className='bg-secondary p-1'
                    style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                    onClick={() => handleAddToCart(product)}
                  >
                    <i className="fa-solid fa-plus"></i>
                  </span>
                  <span className='m-3'>
                    {state.cart.find(item => item.id === product.id)?.quantity || 0}
                  </span>
                  <span
                    className='bg-secondary p-1'
                    style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                    onClick={() => handleRemoveFromCart(product)}
                  >
                    <i className="fa-solid fa-minus"></i>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Shoppingcart;
