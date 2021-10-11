import React, { useState, useEffect } from 'react';
import { getVipProducts } from '../api/api';
import { Link } from 'react-router-dom';
import FruitItems from '@components/ProductItems';
import { Data, DataFunc } from '@type/type';
import {
  handleAddStock,
  handleAddQuantity,
  NavigationList,
  NavigationSelected
} from '../utils/utils';

type Props = {
  setCartProducts: DataFunc
}

const Vip = ({ setCartProducts }: Props) => {
  const [products, setProducts] = useState<Data[] | []>([]);

  useEffect(() => {
    getVipProducts().then(res => setProducts(res.data)).catch(err => alert(err))
  }, []);

  const onClickMinusQuantity = (data: Data) => {
    handleAddStock(data, setProducts, getVipProducts, setCartProducts)
  };

  const onClickMinusStock = (data: Data) => {
    handleAddQuantity(data, setProducts, getVipProducts, setCartProducts)
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
          <li>
            <Link to='/normal'>
              일반 상품
            </Link>
          </li>
          <NavigationSelected>
            <Link to='/prime'>
              VIP 상품
            </Link>
          </NavigationSelected>
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

export default Vip
