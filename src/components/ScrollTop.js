import React from 'react';
import { Toolbar } from '@material-ui/core';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const location = useLocation();

  const handleClick = () => {
    const anchor = (window.ownerDocument || document).querySelector(
      '#back-to-top-anchor'
    );

    if (anchor) {
      anchor.scrollIntoView();
    }
  };

  React.useEffect(
    e => {
      handleClick();
    },
    [location.pathname]
  );

  return (
    <Toolbar style={{ minHeight: 0, maxHeight: 0 }} id="back-to-top-anchor" />
  );
}
