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
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Typography } from '@mui/material';

const Expenses = ({ expenseArr, editButtonHandler, deleteButtonHandler }) => {
  const getIconForCategory = (category) => {
    switch (category) {
      case "grocery":
        return <LocalGroceryStoreIcon />;
      case "fuel":
        return <LocalGasStationIcon />;
      case "medicine":
        return <MedicalServicesIcon />;
      case "vegetable":
        return <RestaurantIcon />;
      default:
        return <MoreHorizIcon />;
    }
  };

  console.log("expenseArr==>", expenseArr);

  return (
    <React.Fragment>
      {expenseArr.length > 0 ? (
        <TableContainer component={Paper} sx={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", borderRadius: "8px" }}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="left" sx={{ fontWeight: "bold", color: "#1976d2" }}>Amount &#8377;</TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold", color: "#1976d2" }}>Description</TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold", color: "#1976d2" }}>Category</TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold", color: "#1976d2" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expenseArr.map((row) => (
                <TableRow
                  key={row.Id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 }, "&:hover": { backgroundColor: "#f5f5f5" } }}
                >
                  <TableCell component="th" scope="row" align="left">
                    {row.amount}
                  </TableCell>
                  <TableCell align="left">{row.description}</TableCell>
                  <TableCell align="left">
                    <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      {getIconForCategory(row.category)}
                      {row.category}
                    </Box>
                  </TableCell>
                  <TableCell align="right" sx={{ width: "200px" }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        gap: "10px",
                      }}
                    >
                      <IconButton
                        color="primary"
                        onClick={() => editButtonHandler(row)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="secondary"
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
      ) : (
        <Box sx={{ textAlign: "center", padding: "40px", color: "#1976d2", marginTop: "20px" }}>
          <Typography variant="h6">No expenses available</Typography>
          <Typography variant="body1">Please add some expenses to see them here.</Typography>
        </Box>
      )}
    </React.Fragment>
  );
};

export default Expenses;
