import React from 'react';
import { Data } from '../type/type';
import styled from 'styled-components';
import {
  Item,
  ItemHeader,
  ItemBody,
  ItemBodyImage,
  ItemBodyDesc,
  ItemBodyDescTitle,
  ItemBodyDescCount,
  ItemBodyDescPrice,
  ItemButtons
} from '../utils/utils';

const CartItemContainer = styled.section`
  background: #e4e4e4;
  padding: 10px;
`;

const CartItem = styled.div`
  max-width: 1180px;
  margin: 0 auto;
  display: grid;
  grid-gap: 1px;
  grid-template-columns: repeat(2, 1fr);
  padding: 20px;
`;

const ItemTotal = styled.div`
  padding-top: 10px;
`;

const Total = styled.div`
  padding: 20px;
  display: flex;
  justify-content: end;
`;

const CartTotal = styled.div`
  width: 300px;
  padding: 20px;
`;

const TotalItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  font-size: 14px;

  &:nth-child(2) {
    border-bottom: 1px solid black;
    padding-bottom: 20px;
  }
  &:nth-child(3) {
    font-size: 20px;
    padding-top: 20px;
  }
`;

const TotalPaymentButton = styled.div`
  padding: 15px 0;
  display: flex;
  justify-content: end;

  & button {
    padding: 5px;
    border: 1px solid black;
    cursor: pointer;
    border-radius: 5px;
    font-weight: 700;
    background:#FFFF66;
  }
`;

const CartItemCount = styled(ItemBodyDescCount)`
  padding-bottom: 5px;
  border-bottom: 1px solid black;
`

type Props = {
  data: Data[]
  onClickMinusQuantity: (data: Data) => void;
  vipTotal: number;
  normalTotal: number;
  onClickOpenModal: () => void;
}

const CartItems = ({ data, onClickMinusQuantity, vipTotal, normalTotal, onClickOpenModal }: Props) => {
  return (
    <CartItemContainer>
      <CartItem>
        {
          data.map(item => (
            <Item key={item.id}>
              <ItemHeader>{item.isVIP ? 'vip' : ''}</ItemHeader>
              <ItemBody>
                <ItemBodyImage>{item.image}</ItemBodyImage>
                <ItemBodyDesc>
                  <ItemBodyDescTitle>{item.name}</ItemBodyDescTitle>
                  <ItemBodyDescPrice><strong>{item.price.toLocaleString()}원</strong></ItemBodyDescPrice>
                  <CartItemCount>
                    <p>수량 <strong>{item.quantity}</strong></p>
                  </CartItemCount>
                  <ItemTotal>
                    상품금액 <strong>{(item.price * item.quantity!).toLocaleString()}원</strong>
                  </ItemTotal>
                </ItemBodyDesc>
              </ItemBody>
              <ItemButtons>
                <button onClick={() => onClickMinusQuantity(item)}>취소</button>
              </ItemButtons>
            </Item>
          ))
        }
      </CartItem>
      <Total>
        <CartTotal>
          <TotalItem>
            <p>VIP 상품</p>
            <p>{vipTotal.toLocaleString()}원</p>
          </TotalItem>
          <TotalItem>
            <p>일반 상품</p>
            <p>{normalTotal.toLocaleString()}원</p>
          </TotalItem>
          <TotalItem>
            <p>총 상품금액</p>
            <p>{(vipTotal + normalTotal).toLocaleString()}원</p>
          </TotalItem>
          <TotalPaymentButton>
            <button onClick={onClickOpenModal} disabled={!data.length}>결제하기</button>
          </TotalPaymentButton>
        </CartTotal>
      </Total>
    </CartItemContainer>
  )
}

export default CartItems
