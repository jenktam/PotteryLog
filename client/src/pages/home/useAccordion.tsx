import { useState, useEffect } from 'react';

export const useAccordion = (initialPanel: string | false = '') => {
  const [expanded, setExpanded] = useState<string | false>(initialPanel);

  const handleChange =
    (panel: string, prevPanel, setPrevPanel: Function) =>
    (event: React.SyntheticEvent, newExpanded: boolean) => {
      // Track previous panel
      if (prevPanel !== panel) {
        setExpanded(false);
        setPrevPanel(panel);
      }

      setExpanded(newExpanded ? panel : false);
    };

  return { expanded, handleChange };
};
