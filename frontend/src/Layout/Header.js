import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../store/auth-reducer";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import Switch from "@mui/material/Switch";
import { themeAction } from "../store/theme-reducer";
import Button from "@mui/material/Button"; // Import Button
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import appLogo from "../assets/images/logo.png";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { useTheme } from "@mui/material/styles";

const pages = ["Home", "Expenses"];
const settings = ["Profile", "Logout"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const theme = useTheme();


  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const projectId = location?.pathname?.split("/").pop();
  const isLogin = useSelector((state) => state.auth.token);
  const expenseArr = useSelector((state) => state.expense.expenses); // Access expense state

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const userlogOuthandler = () => {
    dispatch(authAction.removeExpenseToken());
    dispatch(authAction.removeUserEmail());
    dispatch(authAction.setProjectId(""));
    history.replace("/");
  };

  const handleCloseUserMenu = (key) => {
    setAnchorElUser(null);
    switch (key) {
      case "Logout":
        userlogOuthandler();
        break;
      case "Profile":
        history.push(`/contact/${projectId}`);
        break;

      default:
        break;
    }
  };

  const darkTheme = useSelector((state) => state.theme.theme);

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Expense Breakdown", 20, 20);

    const tableColumn = ["Amount", "Description", "Category"];
    const tableRows = [];

    expenseArr.forEach((expense) => {
      const expenseData = [
        expense.amount,
        expense.description,
        expense.category,
      ];
      tableRows.push(expenseData);
    });

    autoTable(doc, { head: [tableColumn], body: tableRows, startY: 30 });
    doc.save("expenses.pdf");
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xxl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img
              src={appLogo}
              alt="logo"
              style={{ width: "50px", marginRight: "20px" }}
            />
          </Typography>
          {isLogin && (
            <>
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={() => setAnchorElNav(null)}
                  sx={{ display: { xs: "block", md: "none" } }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={() => setAnchorElNav(null)}>
                      <NavLink
                        to={
                          page === "Home"
                            ? `/welcome/${projectId}`
                            : `/${page.toLowerCase()}/${projectId}`
                        }
                        activeClassName="active-link"
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                        }}
                      >
                        <Typography textAlign="center">{page}</Typography>
                      </NavLink>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>

              <Typography
                variant="h5"
                noWrap
                component="div"
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                {/* Mobile Logo or Title */}
              </Typography>

              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", md: "flex" },
                  gap: "10px",
                }}
              >
                {pages.map((page) => (
                  <NavLink
                    key={page}
                    to={
                      page === "Home"
                        ? `/welcome/${projectId}`
                        : `/${page.toLowerCase()}/${projectId}`
                    }
                    activeClassName="active-link"
                    style={{
                      textDecoration: "none",
                      color: "white",
                      padding: "10px",
                      borderRadius: "5px",
                    }}
                    activeStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    {page}
                  </NavLink>
                ))}
               {expenseArr.length > 0 && <Box sx={{
                  marginLeft:"10px"
                }} >
                  <Tooltip title="Download expenses">
                    <IconButton>
                      <IconButton 
                      onClick={exportToPDF}
                      sx={{
                        padding :"0px"
                      }} >
                         <FileDownloadOutlinedIcon  sx={{
                            color:  "white" ,
                          }} />
                      </IconButton>
                    </IconButton>
                  </Tooltip>
                </Box>}

                <Box>
                <Tooltip title= {theme.palette.mode === "dark" ? "Light" : "Dark"}>
                    <IconButton>
                    {darkTheme ? <LightModeIcon  onClick={() => {
                      dispatch(themeAction.toggleTheme());
                    }} /> : <DarkModeIcon onClick={() => {
                      dispatch(themeAction.toggleTheme());
                    }} />}
                    </IconButton>
                  </Tooltip>
                
                </Box>
              </Box>

             

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Udai Bhanu"
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={() => setAnchorElUser(null)}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => handleCloseUserMenu(setting)}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
