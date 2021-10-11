import React from 'react';
import { Data } from '@type/type';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

type Props = {
  products: Data[]
}

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 5px 20px 15px;
`;

const HeaderLogo = styled.img`
  visibility: hidden;
`;

const HeaderTitle = styled.h1`
  font-size: 20px;
  font-weight: 700;
`;

const HeaderMenu = styled.div`
  display: flex;
  font-size: 13px;
  & p {
    padding: 0 10px;
  }
`;

const CountProducts = styled.span`
  position: absolute;
  top: 7px;
  right: 5px;
  width: 15px;
  height: 15px;
  background: #FFFF66;
  text-align: center;
  border-radius: 50%;
`;

const Header = ({ products }: Props) => {
  const countProductsInCart = products.filter(fruit => fruit.quantity! > 0);
  const isFruitInCart = countProductsInCart.length > 0
  return (
    <HeaderContainer>
      <HeaderLogo src='' alt='logo' />
      <HeaderTitle className='header-title'>Welcome to our Shop</HeaderTitle>
      <HeaderMenu className='header-menu'>
        <p><Link to='/'>상품목록</Link></p>
        <p><Link to='/cart'>장바구니</Link>
          {isFruitInCart && <CountProducts className='count-fruit-cart'>{countProductsInCart.length}</CountProducts>}
        </p>
      </HeaderMenu>
    </HeaderContainer>
  )
}

export default Header
