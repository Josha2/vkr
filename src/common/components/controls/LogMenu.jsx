import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const ITEM_HEIGHT = 40;

export default function LogMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    props.setEdit(!props.edit);
    setAnchorEl(null);
  };

  const options = !props.edit ? "Изменить данные" : "Сохранить данные";

  return (
    <div>
      <IconButton
        aria-label="more" 
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
        style={{
          marginTop: 8.5,
          outline: 'none'
        }}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
          <MenuItem onClick={handleClose}>
            {options}
          </MenuItem>
      </Menu>
    </div>
  );
}