export type Data = {
  id: number;
  name: string;
  image: string;
  stock: number;
  price: number;
  isVIP: boolean;
  quantity: number | null
}

export type DataFunc = (data: Data[]) => void
