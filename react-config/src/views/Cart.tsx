import React, { useState } from 'react';
import { getAllProducts, updateStock, updatePurchase } from '../api/api';
import { Data, DataFunc } from '../type/type';
import CartItems from '../components/CartItems';
import ConfirmModal from '../components/ConfirmModal';
import { handleAddStock } from '../utils/utils';
import styled from 'styled-components';

const CartEmptyText = styled.p`
  padding: 200px;
  text-align: center;
`

type Props = {
  products: Data[]
  setProducts: any;
}

const Cart = ({ products, setProducts }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const productsInCart = products?.filter(fruit => fruit.quantity! > 0);

  const vipTotal = productsInCart.reduce((acc, val) => {
    if (val.isVIP) {
      acc += val.price * val.quantity!
    }
    return acc
  }, 0);

  const normalTotal = productsInCart.reduce((acc, val) => {
    if (!val.isVIP) {
      acc += val.price * val.quantity!
    }
    return acc
  }, 0);

  const onClickMinusQuantity = (data: Data) => {
    handleAddStock(data, setProducts, getAllProducts)
  };

  const onClickOpenModal = () => setIsModalOpen(true);

  const onClickCloseModal = () => setIsModalOpen(false);

  const onClickPayment = async () => {
    const purchaseProductsInCart = productsInCart.map(fruit => {
      return {
        id: fruit.id,
        quantity: fruit.quantity!
      }
    }).map(fruit => updatePurchase(fruit));
    const updateProductsData = productsInCart.map(fruit => {
      return {
        ...fruit,
        stock: fruit.stock,
        quantity: 0,
      }
    }).map(fruit => updateStock(fruit.id, fruit));

    // await Promise.all([...purchaseProductsInCart, ...updateProductsData]).then(() => window.location.reload()).catch(err => alert(err))
  };

  return (
    <>
      {
        !productsInCart.length && <CartEmptyText>장바구니가 비어있습니다.</CartEmptyText>
      }
      <CartItems
        data={productsInCart}
        vipTotal={vipTotal}
        normalTotal={normalTotal}
        onClickMinusQuantity={onClickMinusQuantity}
        onClickOpenModal={onClickOpenModal}
      />
      <ConfirmModal isOpen={isModalOpen} onClose={onClickCloseModal} onClickPayment={onClickPayment} />
    </>
  );
};

export default Cart;
