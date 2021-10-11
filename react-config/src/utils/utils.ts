import { updateStock, getAllProducts } from '../api/api';
import { Data, DataFunc } from '@type/type';
import styled, { css } from 'styled-components';

export const handleAddStock = (
  data: Data,
  setProducts: DataFunc,
  fetchApi: () => Promise<any>,
  setCartProducts?: DataFunc,) => {
  const updatedData = { ...data, stock: data.stock += 1, quantity: data.quantity! -= 1 }
  updateStock(data.id, updatedData).then(() => {
    fetchApi().then(res => setProducts(res.data));
    if (setCartProducts) {
      getAllProducts().then(res => setCartProducts(res.data));
    }
  });
};

export const handleAddQuantity = (
  data: Data,
  setProducts: DataFunc,
  fetchApi: () => Promise<any>,
  setCartProducts?: DataFunc) => {
  const updatedData = { ...data, stock: data.stock -= 1, quantity: isNaN(data.quantity!) ? 1 : data.quantity! += 1 }
  updateStock(data.id, updatedData).then(() => {
    fetchApi().then(res => setProducts(res.data));
    if (setCartProducts) {
      getAllProducts().then(res => setCartProducts(res.data));
    }
  });
};

export const NavigationList = styled.ul`
  background: #e4e4e4;
  padding: 10px 20px;
  display: flex;

  & li {
    font-size: 13px;
    cursor: pointer;
    padding: 15px;
    font-weight: 900;
  }
`;

export const NavigationSelected = styled.li`
  background: #FFFF66;
  border-radius: 15px;
`;

export const Item = styled.div`
  background: #fff;
  padding: 15px;
  border-radius: 15px;
  margin: 15px;
`;

export const ItemHeader = styled.div`
  height: 16px;
  font-weight: 700;
`;

export const ItemBody = styled.div`
  display: flex;
`

export const ItemBodyImage = styled.div`
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ItemBodyDesc = styled.div`
  width: 60%;
`;

export const ItemBodyDescTitle = styled.div`
  font-weight: 700;
  font-size: 16px;
  padding-bottom: 10px;
`;

export const ItemBodyDescPrice = styled.div`
  padding: 10px 0;
`;

export const ItemBodyDescCount = styled.div`
& p {
  padding: 5px 0;
  font-size: 13px;
}
`;

export const ItemButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
  & button {
    padding: 5px;
    border: 1px solid #e4e4e4;
    margin: 0 5px;
    cursor: pointer;
  }
`;


