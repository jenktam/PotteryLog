import { ColumnTypes } from './enums.ts';
import { IProduct } from '../../components/constants/models';
import { useList } from '@refinedev/core';

function useData() {
  //Fetching data from the products endpoint
  //using Refine's useList hook
  const { data } = useList<IProduct>({
    config: {
      pagination: {
        current: 2,
      },
    },
    resource: 'products',
  });

  //modifying fetched data and adding column property
  const newArr = data?.data.map((i: IProduct) => {
    return {
      ...i,
      column: ColumnTypes.ORDERS,
    };
  });

  return [newArr, data?.data];
}

export default useData;
