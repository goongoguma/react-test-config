import React from 'react';
import { Data } from '../type/type';
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
import styled from 'styled-components';

const ItemContainer = styled.section`
  background: #e4e4e4;
  padding: 10px;
  display: grid;
  grid-gap: 1px;
  grid-template-columns: repeat(3, 1fr);
  position: relative;
`;

type Props = {
  data: Data[]
  onClickMinusQuantity: (data: Data) => void;
  onClickMinusStock: (data: Data) => void;
}

const ProductItems = ({ data, onClickMinusQuantity, onClickMinusStock }: Props) => {
  return (
    <ItemContainer>
      {
        !data.length ? <div>Loading...</div> :
          data.map(item => (
            <Item key={item.id}>
              <ItemHeader>{item.isVIP ? 'VIP' : ''}</ItemHeader>
              <ItemBody>
                <ItemBodyImage>{item.image}</ItemBodyImage>
                <ItemBodyDesc>
                  <ItemBodyDescTitle>{item.name}</ItemBodyDescTitle>
                  <ItemBodyDescPrice><strong>{item.price.toLocaleString()}원</strong></ItemBodyDescPrice>
                  <ItemBodyDescCount>
                    <p>잔량  <strong>{item.stock}</strong></p>
                    <p>수량  <strong>{item?.quantity ?? 0}</strong></p>
                  </ItemBodyDescCount>
                </ItemBodyDesc>
              </ItemBody>
              <ItemButtons>
                {
                  item.quantity! > 0 &&
                  <button onClick={() => onClickMinusQuantity(item)}>빼기</button>
                }

                <button onClick={() => onClickMinusStock(item)} disabled={!item.stock}>담기</button>
              </ItemButtons>
            </Item>
          ))
      }
    </ItemContainer>
  )
}

export default ProductItems
