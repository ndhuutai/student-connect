import React, {
  useState,
  useContext,
  useEffect,
  DispatchWithoutAction,
} from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  createStyles,
  makeStyles,
  Theme,
  TextField,
} from '@material-ui/core';
import axios, { AxiosResponse } from 'axios';

import { DispatchConversationContext } from '../../contexts/conversation';
import { connection as ConnectionContext } from '../../contexts/socket';

import { joinRoom } from '../../actions/socket';
import { setRoom } from '../../actions/conversation';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    container: {
      margin: 'auto',
      width: '100%',
      height: '500px',
      display: 'flex',
      justifyContent: 'center',
    },

    formControl: {
      minWidth: '200px',
      maxWidth: '60%',
    },

    select: {
      marginTop: theme.spacing(1),
    },

    textField: {
      marginTop: theme.spacing(1),
    },
  });
});

interface Props {
  onJoin: () => void;
}

export const SelectDepartment: React.FC<Props> = (props) => {
  const classes = useStyles();
  const [department, setDepartment] = useState('');
  const [departmentList, setDepartmentList] = useState<Array<string[]>>();
  const [name, setName] = useState('');

  const connectionContext = useContext(ConnectionContext);
  const conversationDispatchContext = useContext(DispatchConversationContext);

  const connection = connectionContext?.socket;

  useEffect(() => {
    axios
      .get('/rooms')
      .then((res: AxiosResponse<any>) => {
        const rooms = res.data.map((room: { _id: string; alias: string }) => {
          return [room._id, room.alias];
        });
        setDepartmentList(rooms);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleSelectChange: React.ChangeEventHandler<HTMLSelectElement> = (
    e
  ) => {
    setDepartment(e.target.value);
  };

  const handleTextChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.target.value);
  };

  const handleSubmit: React.ChangeEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (connection) {
      joinRoom(connection, department, '1');
      conversationDispatchContext(setRoom(department));
      props.onJoin();
    }
  };

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit}>
        <FormControl className={classes.formControl}>
          <InputLabel id="select-label">Department</InputLabel>
          <Select
            labelId="select-label"
            id="select-label"
            value={department}
            onChange={handleSelectChange}
          >
            {!departmentList
              ? 'Please wait...'
              : departmentList.map((departmentTuple) => {
                  return (
                    <MenuItem
                      value={departmentTuple[0]}
                      key={departmentTuple[0]}
                    >
                      {departmentTuple[1]}
                    </MenuItem>
                  );
                })}
          </Select>
          <TextField
            label={'Question'}
            onChange={handleTextChange}
            className={classes.textField}
          />
        </FormControl>
      </form>
    </div>
  );
};
