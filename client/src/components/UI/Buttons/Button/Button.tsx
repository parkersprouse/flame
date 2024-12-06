import { ReactNode } from 'react';
import classes from './Button.module.css';

interface Props {
  children: ReactNode;
  click?: any;
  type?: 'button' | 'submit' | 'reset';
}

export const Button = (props: Props): JSX.Element => {
  const { children, click, type = 'button' } = props;

  return (
    <button
      className={classes.Button}
      onClick={click ? click : () => {}}
      type={type}
    >
      {children}
    </button>
  );
};
