import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const Toaster = ({ open, onClose, toasterMessage }) => {
    console.log("open==>",open);
  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={onClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={onClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Snackbar
    sx={{
        "& .MuiSnackbarContent-root": {
          backgroundColor: "#1876d1",
          color: "#fff",
          fontSize: "1.0rem",
        },
      }}
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      message={toasterMessage}
      action={action}
    />
  );
};

export default Toaster;
