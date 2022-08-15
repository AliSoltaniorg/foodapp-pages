import { useState } from 'react';
import './App.css';
import Cart from './components/Cart/Cart';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import CartContextProvider from './context/CartContextProvider';

function App() {

  const [cartIsShown,setCartIsShown] = useState(false)

  const shownCartHandler = ()=>{
    setCartIsShown(true)
  }

  const hideCartHandler = ()=>{
    setCartIsShown(false)
  }

  return (
    <CartContextProvider>
      {cartIsShown && <Cart onHideCart={hideCartHandler}/>}
      <Header onShowCart={shownCartHandler}/>
      <Meals/>
    </CartContextProvider>
  );
}

export default App;
