import React from 'react';
import {
  withStyles,
  createStyles,
  Badge,
  Avatar,
  Theme,
  makeStyles,
} from '@material-ui/core';
const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      backgroundColor: '#44b700',
      color: '#44b700',
      position: 'relative',
      top: '35px',
      left: '-20px',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: '$ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  })
)(Badge);

const StyledAvatar = withStyles((theme: Theme) => {
  return createStyles({
    circle: {
      margin: theme.spacing(1),
    },
  });
})(Avatar);

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({});
});

interface UserDisplayProps {
  name: string;
  avatarSrc?: string;
}

export const UserDisplay: React.FC<UserDisplayProps> = (props) => {
  const styles = useStyles();

  return (
    <div>
      <StyledBadge
        overlap="circle"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        variant="dot"
      >
        <StyledAvatar alt="avatar" src={props.avatarSrc || undefined}>
          {props.name.charAt(0)}
        </StyledAvatar>
      </StyledBadge>
    </div>
  );
};
