import React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { ColumnTypes, cardType } from 'src/components/constants/enums';
import { IProduct } from 'src/components/constants/models';
import { useDrag } from 'react-dnd';
import NoImage from '../../assets/defaultProjectImage.jpeg';
import { Link } from 'react-router-dom';

interface IProject {
  id: number;
  name: string;
  dateStarted: string;
  dateFinished: string;
  status: string;
  weight: number;
  size: string;
  notes: string;
  coverPic: string;
}

const ProjectCard = ({
  project,
  key,
  setOrders,
}: {
  project: IProject;
  key: number;
  setOrders?: any;
}) => {
  const {
    name,
    dateStarted,
    dateFinished,
    status,
    weight,
    size,
    notes,
    coverPic,
    id,
  } = project;
  const orderColumnChange = (CurrentOrder: any, columnName: string) => {
    setOrders((prevState: string[]) => {
      return prevState.map((item: any) => {
        // Updates columns when cards dropped based on column and status properties.
        // If the name of the card matches the current order name, it will update the column and status properties. Otherwise, it will return the item as is.
        let newState = {
          ...item,
          column: item.name === CurrentOrder.name ? columnName : item.column,
          status: item.name === CurrentOrder.name ? columnName : item.status,
        };
        return newState;
      });
    });
  };

  const [{ isDragging }, drag] = useDrag({
    type: cardType.ORDER,
    item: { name },
    end: (order, monitor) => {
      const dropResult = monitor.getDropResult<IProduct>();

      if (dropResult !== null) {
        const { name } = dropResult;
        const { THROWN, TRIMMED, BISQUED, GLAZED, COMPLETED, SOLD, GIFTED } =
          ColumnTypes;

        switch (name) {
          case THROWN:
            orderColumnChange(order, ColumnTypes.THROWN);
            break;
          case TRIMMED:
            orderColumnChange(order, ColumnTypes.TRIMMED);
            break;
          case BISQUED:
            orderColumnChange(order, ColumnTypes.BISQUED);
            break;
          case GLAZED:
            orderColumnChange(order, ColumnTypes.GLAZED);
            break;
          case COMPLETED:
            orderColumnChange(order, ColumnTypes.COMPLETED);
            break;
          case SOLD:
            orderColumnChange(order, ColumnTypes.SOLD);
            break;
          case GIFTED:
            orderColumnChange(order, ColumnTypes.GIFTED);
            break;
          default:
            break;
        }
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <>
      <Card
        ref={drag}
        className='card'
        style={{
          opacity: isDragging ? '0.5' : '1',
          marginBottom: '15px',
          boxShadow: '1px 4px 11px -2px rgba(135,135,135,0.75)',
        }}
      >
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
            {dateStarted} - {dateFinished}
          </Typography>
          <CardMedia
            component='img'
            height='194'
            image={coverPic ? `/upload/${coverPic}` : NoImage}
            alt='Project Image'
          />
          <Typography sx={{ mb: 1.5 }} color='text.secondary'>
            {status}
          </Typography>
          <Typography variant='body2'>Weight: {weight}</Typography>
          <Typography variant='body2'>Size: {size}</Typography>
          <Typography variant='body2'>Notes: {notes}</Typography>
        </CardContent>
        <CardActions>
          <Link to={`/projects/${id}`}>Learn More</Link>
        </CardActions>
      </Card>
    </>
  );
};

export default ProjectCard;
