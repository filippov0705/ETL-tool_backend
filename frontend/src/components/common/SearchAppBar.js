import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";

import Search from "./Search";
import UserMenu from "./UserMenu";

import { mainPath, ProceduresPath } from "../../utils/BuildPaths";

import mainTheme from "../../style/theme";

const styles = theme => ({
  header: {
    ...mainTheme.header
  },
  root: {
    padding: theme.spacing(1),
    [theme.breakpoints.up("md")]: {
      display: "none"
    },
    [theme.breakpoints.up("lg")]: {
      display: "none"
    }
  },
  link: {
    textDecoration: "none",
    color: "black"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  appBar: {
    justifyContent: "center"
  },
  grow: {
    flexGrow: "5"
  },
  headerButton: {
    ...mainTheme.headerButton
  },
  active: {
    color: "red"
  }
});

class SearchAppBar extends Component {
  constructor() {
    super();
    this.state = {
      anchorEl: null,
      mobileMoreAnchorEl: null
    };
  }

  handleProfileMenuOpen = event => {
    this.setState({
      anchorEl: event.currentTarget
    });
  };

  handleMobileMenuClose = () => {
    this.setState({
      mobileMoreAnchorEl: null
    });
  };

  handleMenuClose = () => {
    this.setState({
      anchorEl: null
    });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({
      mobileMoreAnchorEl: event.currentTarget
    });
  };

  render() {
    const { classes } = this.props,
      { anchorEl, mobileMoreAnchorEl } = this.state,
      isMenuOpen = Boolean(anchorEl),
      isMobileMenuOpen = Boolean(mobileMoreAnchorEl),
      menuId = "primary-search-account-menu",
      renderMenu = (
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          id={menuId}
          keepMounted
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={isMenuOpen}
          onClose={this.handleMenuClose}
        >
          <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
        </Menu>
      );

    const mobileMenuId = "primary-search-account-menu-mobile";
    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
        className={classes.root}
      >
        <Link to={mainPath()} className={classes.link}>
          <MenuItem
            className={
              this.props.location === "/"
                ? `${classes.headerButton} ${classes.active}`
                : classes.headerButton
            }
          >
            <FormattedMessage id="navigation.mainPage" />
          </MenuItem>
        </Link>
        <Link to={ProceduresPath()} className={classes.link}>
          <MenuItem
            className={
              this.props.location === "/"
                ? classes.headerButton
                : `${classes.headerButton} ${classes.active}`
            }
          >
            <FormattedMessage id="navigation.procedures" />
          </MenuItem>
        </Link>
      </Menu>
    );

    return (
      <React.Fragment>
        <AppBar className={classes.header}>
          <Toolbar>
            <UserMenu />
            <Typography className={classes.title} variant="h6" noWrap>
              ITechArt
            </Typography>
            <Search />
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <Link to={mainPath()} className={classes.link}>
                <Button
                  className={
                    this.props.location === "/"
                      ? `${classes.headerButton} ${classes.active}`
                      : classes.headerButton
                  }
                >
                  <FormattedMessage id="navigation.mainPage" />
                </Button>
              </Link>
              <Link to={ProceduresPath()} className={classes.link}>
                <Button
                  className={
                    this.props.location === "/"
                      ? classes.headerButton
                      : `${classes.headerButton} ${classes.active}`
                  }
                >
                  <FormattedMessage id="navigation.procedures" />
                </Button>
              </Link>
              <IconButton
                className={classes.root}
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={this.handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon color="action" />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(SearchAppBar);
