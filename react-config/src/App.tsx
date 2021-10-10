import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './views/Header';
import All from './views/All';
import Normal from './views/Normal';
import Vip from './views/Vip';
import Cart from './views/Cart';
import { getAllProducts } from './api/api';
import { Data } from './type/type';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './test.scss';

function App() {
  const [products, setProducts] = useState<Data[] | []>([]);

  useEffect(() => {
    getAllProducts().then(res => {
      setProducts(res.data)
    }).catch(err => alert(err))
  }, []);

  const setCartProducts = (data: Data[]) => setProducts(data)

  return (
    <div className="App">
      <Router>
        <Header products={products} />
        <div className="container">
          <Switch>
            <Route path="/normal">
              <Normal setCartProducts={setCartProducts} />
            </Route>
            <Route path='/vip'>
              <Vip setCartProducts={setCartProducts} />
            </Route>
            <Route path='/cart'>
              <Cart products={products} setProducts={setProducts} />
            </Route>
            <Route path="/">
              <All products={products} setProducts={setProducts} />
            </Route>
          </Switch>
        </div>
      </Router>
      <div className="scss-test">
        SCSS
        <div className="scss-test-child">
          SCSS CHILD
        </div>
      </div>
    </div>
  );
}

export default App;
