import React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { ColumnTypes, cardType } from 'src/components/constants/enums';
import { IProduct } from 'src/components/constants/models';
import { useDrag } from 'react-dnd';
import { useAccordion } from 'src/pages/home/useAccordion';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  width: '100%',
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',

  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: 0,
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

interface CustomizedAccordionsProps {
  id: number;
  title: React.ReactNode;
  content: React.ReactNode;
  expanded: boolean;
  onChange: (event: React.SyntheticEvent, isExpanded: boolean) => void;
  setOrders?: any;
}

export default function CustomizedAccordions({
  id,
  title,
  content,
  expanded,
  setOrders,
  onChange,
}: CustomizedAccordionsProps) {
  const orderColumnChange = (CurrentOrder: any, columnName: string) => {
    setOrders((prevState: string[]) => {
      return prevState.map((item: any) => {
        // Updates columns when cards dropped based on column and status properties.
        // If the id of the card matches the current order id, it will update the column and status properties. Otherwise, it will return the item as is.
        let newState = {
          ...item,
          column: item.id === CurrentOrder.id ? columnName : item.column,
          status: item.id === CurrentOrder.id ? columnName : item.status,
        };
        return newState;
      });
    });
  };

  const [{ isDragging }, drag] = useDrag({
    type: cardType.ORDER,
    item: { id, name: title },
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
    <div
      ref={drag}
      style={{
        opacity: isDragging ? '0.5' : '1',
        boxShadow: '1px 4px 11px -2px rgba(135,135,135,0.75)',
        transform: 'translate3d(0, 0, 0)',
      }}
    >
      <Accordion expanded={expanded} onChange={onChange}>
        <AccordionSummary aria-controls='panel1d-content' id='panel1d-header'>
          <Typography>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>{content}</AccordionDetails>
      </Accordion>
    </div>
  );
}
