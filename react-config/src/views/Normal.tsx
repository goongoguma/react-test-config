import React, { useState, useEffect } from 'react';
import { getNormalProducts } from '../api/api';
import { Link } from 'react-router-dom';
import FruitItems from '../components/ProductItems';
import { Data, DataFunc } from '../type/type';
import {
  handleAddStock,
  handleAddQuantity,
  NavigationList,
  NavigationSelected
} from '../utils/utils';


type Props = {
  setCartProducts: DataFunc;
}

const Normal = ({ setCartProducts }: Props) => {
  const [products, setProducts] = useState<Data[] | []>([]);

  useEffect(() => {
    getNormalProducts().then(res => setProducts(res.data)).catch(err => alert(err))
  }, []);

  const onClickMinusQuantity = (data: Data) => {
    handleAddStock(data, setProducts, getNormalProducts, setCartProducts)
  };

  const onClickMinusStock = (data: Data) => {
    handleAddQuantity(data, setProducts, getNormalProducts, setCartProducts)
  };

  return (
    <>
      <nav className='navigation'>
        <NavigationList>
          <li>
            <Link to='/'>
              전체
            </Link>
          </li>
          <NavigationSelected>
            <Link to='/normal'>
              일반 상품
            </Link>
          </NavigationSelected>
          <li>
            <Link to='/vip'>
              VIP 상품
            </Link>
          </li>
        </NavigationList>
      </nav>
      <FruitItems
        data={products}
        onClickMinusQuantity={onClickMinusQuantity}
        onClickMinusStock={onClickMinusStock}
      />
    </>
  );
};

export default Normal
