import React from "react";

//MUI
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from '@mui/material/IconButton';


const Expenses = ({ expenseArr, editButtonHandler, deleteButtonHandler }) => {
  console.log("inside expense");
  return (
    <React.Fragment>
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

                    <IconButton
                      color="error"
                      onClick={() => editButtonHandler(row)}
                    >
                      <EditIcon 
                        sx={{ color: "#1876d1" }}
                       />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => deleteButtonHandler(row?.Id)}
                    >
                      <DeleteIcon />
                    </IconButton>
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
