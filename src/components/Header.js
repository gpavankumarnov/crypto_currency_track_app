import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Select,
  MenuItem,
  makeStyles,
  ThemeProvider,
  createTheme,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: "gold",
    fontWeight: "bold",
    cursor: "pointer",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "4rem",
   
    
  },
}));

const Header = () => {
  const classes = useStyles();

  const darkTheme = createTheme({
      palette:{
          primary:{
              main:'#fff',
          },
          type:'dark'
      }
  })

  return (
    
    <div className={classes.header}>
       <ThemeProvider theme={darkTheme}>
      {/* header tag - appbar*/}
      <AppBar color="transparent" >
        <Toolbar className={classes.header}>
          <Link to="/">
            <Typography variant="h5" className={classes.title}>
              Crypto Hunter
            </Typography>
          </Link>
          <Select>
            <MenuItem value={"USD"}>USD</MenuItem>
            <MenuItem value={"INR"}>INR</MenuItem>
          </Select>
        </Toolbar>
      </AppBar>
       </ThemeProvider>
    </div>
  );
};

export default Header;
