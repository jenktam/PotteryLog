import { useState, useEffect } from 'react';

export const useAccordion = (initialPanel: string | false = '') => {
  const [expanded, setExpanded] = useState<string | false>(initialPanel);

  const handleChange =
    (panel: string, prevPanel, setPrevPanel: Function) =>
    (event: React.SyntheticEvent, newExpanded: boolean) => {
      // track previous panel
      if (prevPanel !== panel) {
        console.log('panel: ', panel);
        console.log('prevPanel: ', prevPanel);
        setExpanded(false);
        setPrevPanel(panel);
        console.log('panel changed');
      }

      setExpanded(newExpanded ? panel : false);
    };

  return { expanded, handleChange };
};
