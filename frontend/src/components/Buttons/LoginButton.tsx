import React from 'react';
import { styled } from '@material-ui/core/styles';
import { Button, ButtonProps } from '@material-ui/core';

import indigo from '@material-ui/core/colors/indigo';

interface loginBtnProp extends ButtonProps {
  onClick: React.MouseEventHandler;
}

const StyledLoginButton = styled(Button)({
  background: indigo[500],
  border: 0,
  borderRadius: 3,
  color: 'white',
  height: 48,
  padding: '0 30px',

  '&:hover': {
    background: indigo[500],
  },
});

export const LoginButton: React.FC<loginBtnProp> = (props) => {
  return <StyledLoginButton onClick={props.onClick}>Login</StyledLoginButton>;
};
