import AppBar from "@material-ui/core/AppBar";
import Collapse from "@material-ui/core/Collapse";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import MenuIcon from "@material-ui/icons/Menu";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import StarBorder from "@material-ui/icons/StarBorder";
import clsx from "clsx";
import React, { useEffect } from "react";
import { Link, Route, Switch } from "react-router-dom";
import SigninContainer from "../container/SignInContainer";
const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));
export default function SideBar(props) {
  const open = props.open;
  const handleDrawerClose = props.handleDrawerClose;
  const theme = useTheme();
  const classes = useStyles();
  const [openCollapse, setOpenCollapse] = React.useState([false, false, false,false]); // thiet lap 4 menu TO
  const handleListClick = i => {
    let tmp = [...openCollapse];
    tmp[i] = tmp[i] ? false : true;
    setOpenCollapse(tmp);
  };

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      <List>
      <div>
            <ListItem button onClick={() => handleListClick(0)}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Kiểm soát lộ trình" />
              {openCollapse[0] ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openCollapse[0]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem 
                  button 
                  className={classes.nested}
                  component={Link}
                  to={process.env.PUBLIC_URL + "/tracklocations/gismap"}
                >
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Bản đồ" />
                  </ListItem>
                
               
                  <ListItem 
                    button 
                    className={classes.nested}
                    component={Link}  // props 
                    to={process.env.PUBLIC_URL + "/tracklocations/list"} // props
                  >
                    <ListItemIcon>

                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Danh sách" />
                  </ListItem>
                
              </List>
            </Collapse>
          </div>

        {props.menu.has("MENU_USER") ? (
          <div>
            <ListItem button onClick={() => handleListClick(1)}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Tài khoản" />
              {openCollapse[1] ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openCollapse[1]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {props.menu.has("MENU_USER_CREATE") ? (
                  <ListItem
                    button
                    className={classes.nested}
                    component={Link}
                    to={process.env.PUBLIC_URL + "/userlogin/create"}
                  >
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Tạo mới" />
                  </ListItem>
                ) : (
                  ""
                )}
                {props.menu.has("MENU_USER_LIST") ? (
                  
                    <ListItem
                      button
                      className={classes.nested}
                      component={Link}
                      to={process.env.PUBLIC_URL + "/userlogin/list"}
                    >
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Danh sách" />
                    </ListItem>
                  
                ) : (
                  ""
                )}
              </List>
            </Collapse>
          </div>
        ) : (
          ""
        )}
        {props.menu.has("MENU_ORDER") ? (
          <div>
            <ListItem button onClick={() => handleListClick(2)}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Đơn hàng" />
              {openCollapse[2] ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openCollapse[2]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {props.menu.has("MENU_ORDER_CREATE") ? (
                  <ListItem
                    button
                    className={classes.nested}
                    component={Link}
                    to={process.env.PUBLIC_URL + "/order/create"}
                  >
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Tạo mới" />
                  </ListItem>
                ) : (
                  ""
                )}
                {props.menu.has("MENU_ORDER_LIST") ? (
                  <Link to="/order/list">
                    <ListItem
                      button
                      className={classes.nested}
                      component={Link}
                      to={process.env.PUBLIC_URL + "/order/list"}
                    >
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Danh sách" />
                    </ListItem>
                  </Link>
                ) : (
                  ""
                )}
              </List>
            </Collapse>
          </div>
        ) : (
          ""
        )}
        {props.menu.has("MENU_INVOICE") ? (
          <div>
            <ListItem button onClick={() => handleListClick(3)}> 
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Hóa đơn" />
              {openCollapse[3] ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openCollapse[3]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {props.menu.has("MENU_INVOICE_CREATE") ? (
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Tạo mới" />
                  </ListItem>
                ) : (
                  ""
                )}
                {props.menu.has("MENU_INVOICE_LIST") ? (
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Danh sách" />
                  </ListItem>
                ) : (
                  ""
                )}
              </List>
            </Collapse>
          </div>
        ) : (
          ""
        )}
      </List>
    </Drawer>
  );
}
