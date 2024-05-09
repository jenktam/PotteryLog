import React, { useEffect, useState } from 'react'
import Projects from '../../components/projects/Projects.jsx'
import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  Button,
  Typography,
} from '@mui/material';
// TODO: fix
import { Space } from 'antd'
import { useNavigate } from "react-router-dom";
import Column from "../../components/column.tsx";
import Cards from "../../components/card.tsx";
import { ColumnTypes } from "../../components/constants/enums.ts";
import useData from '../../components/constants/data.ts'

console.log('Column: ', Column);
const Home = () => {
  let navigate = useNavigate();
  const [newArr, products] = useData();
  const [orders, setOrders] = useState<any[] | undefined>([]);
  const { ORDERS, IN_PROGRESS, DELIVERED, RETURNED } = ColumnTypes
    
  // Makes sure that if orders changes, moves cards to correct columns
  const columnItem = React.useMemo(() => (columnName: string) => {
      return (
        orders && orders
        .filter((order) => order.column === columnName)
        .map((order, index) => (
          <Cards
          key={order.id}
          name={order.name}
          material={order.material}
          setOrders={setOrders}
          index={index}
          />
          ))
          )
  }, [orders])
  
  //creating side effects based on the data's response.
  useEffect(() => {
  setOrders(newArr);
}, [products]);

  const handleNewProject = (e: any) => {
    e.preventDefault();

    navigate('/projects/form');
  }

  return (
    <>
      {/* Drag and Drop */}
      <div>
      <Space
        direction="horizontal"
        align="baseline"
        size={109}
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <Column name={ORDERS} setOrders={setOrders}>{columnItem(ORDERS)}</Column>
        <Column name={IN_PROGRESS} setOrders={setOrders}>{columnItem(IN_PROGRESS)}</Column>
        <Column name={DELIVERED} setOrders={setOrders}>{columnItem(DELIVERED)}</Column>
        <Column name={RETURNED} setOrders={setOrders}>{columnItem(RETURNED)} </Column>
      </Space>
    </div>

      <Box>
        <Typography variant="h1" style={{textAlign: 'center'}}>Active Pots</Typography>
        <Button onClick={handleNewProject}>
          <AddIcon /> Add new project
        </Button>
        <Projects />

      </Box>
    </>
  )
};

export default Home;