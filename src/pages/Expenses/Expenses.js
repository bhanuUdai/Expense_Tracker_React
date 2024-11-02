import React from "react";
import classes from "./Expenses.module.css";

//MUI
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Expenses = ({ expenseArr, editButtonHandler, deleteButtonHandler }) => {
  console.log("inside expense");
  return (
    <React.Fragment>
      {/* <main  className={classes.main}>
        <span>
          <h3>Amount :</h3>
          <h2 className={classes.items}>$ {prop.items.amount}</h2>
        </span>
        <span>
          <h3>Description :</h3>
          <h2 className={classes.items}>{prop.items.description}</h2>
        </span>
        <span>
          <h3>Category :</h3>
          <h2 className={classes.items}>{prop.items.category}</h2>
        </span>
        <button
          onClick={() => prop.editButtonClicked(prop.items)}
          className={classes.edit_button}
        >
          EDIT
        </button>
        <button
          onClick={() => prop.deleteButtonClicked(prop.items.Id)}
          className={classes.delete_button}
        >
          DELETE
        </button>
      </main> */}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {/* <TableCell>Dessert (100g serving)</TableCell> */}
              <TableCell>Amount &#8377;</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenseArr.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >

                <TableCell component="th" scope="row">
                  {row.amount}
                </TableCell>
                <TableCell align="right">{row.description}</TableCell>
                <TableCell align="right">{row.category}</TableCell>
                {/* <TableCell align="right" >
                  {" "}
                  <Box
                    sx={{
                      width: "fit-content",
                      display: "flex",
                      flexDirection: "row",
                      gap: "20px",
                      justifyContent: "end",
                    }}
                  >
                    <Button
                      sx={
                        {
                          // width: "100%",
                        }
                      }
                      variant="contained"
                      // onClick={submitHandler}
                    >
                      Edit
                    </Button>
                    <Button
                      sx={
                        {
                          // width: "100%",
                        }
                      }
                      variant="contained"
                      // onClick={submitHandler}
                    >
                      Delete
                    </Button>
                  </Box>
                </TableCell> */}

                <TableCell align="right" sx={{ width: "200px" }}>
                  {" "}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      gap: "10px",
                    }}
                  >
                    <Button
                      variant="contained"
                      onClick={() => editButtonHandler(row)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => deleteButtonHandler(row?.Id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};
export default Expenses;
