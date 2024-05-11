import React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
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
}

export default function CustomizedAccordions({
  id,
  title,
  content,
}: CustomizedAccordionsProps) {
  const [prevPanel, setPrevPanel] = React.useState<string | null>(null);
  const [expandedPanel, setExpandedPanel] = React.useState<string | false>(
    prevPanel
  );

  const handleChange =
    (panel: string, prevPanel, setPrevPanel: Function) =>
    (event: React.SyntheticEvent, isExpanded: boolean) => {
      console.log('isExpanded: ', isExpanded);
      console.log('expandedPanel: ', expandedPanel);
      setExpandedPanel(isExpanded ? panel : false);
    };

  return (
    <div>
      <Accordion
        expanded={expandedPanel === `project-${id}`}
        onChange={handleChange(`project-${id}`, prevPanel, setPrevPanel)}
      >
        <AccordionSummary aria-controls='panel1d-content' id='panel1d-header'>
          <Typography>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>{content}</AccordionDetails>
      </Accordion>
    </div>
  );
}
