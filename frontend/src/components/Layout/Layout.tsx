import React from 'react';
import classes from './Layout.module.css';

export const Layout: React.FC<{}> = (props) => {
  return <div className={classes.Layout}>{props.children}</div>;
};
