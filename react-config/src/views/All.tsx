import React from 'react';
import { getAllProducts, updateStock } from '../api/api';
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
  products: Data[]
  setProducts: DataFunc;
}

const All = ({ products, setProducts }: Props) => {

  const onClickMinusQuantity = (data: Data) => {
    handleAddStock(data, setProducts, getAllProducts)
  };

  const onClickMinusStock = (data: Data) => {
    handleAddQuantity(data, setProducts, getAllProducts)
  };

  return (
    <>
      <nav className='navigation'>
        <NavigationList>
          <NavigationSelected>
            <Link to='/'>
              전체
            </Link>
          </NavigationSelected>
          <li>
            <Link to='/normal'>
              일반 상품
            </Link>
          </li>
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
  )
}

export default All
