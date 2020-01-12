import React, { Component } from "react";
import { FormattedMessage } from "react-intl";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import withStyles from "@material-ui/core/styles/withStyles";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import { deepPurple } from "@material-ui/core/colors";

import TransitionsModal from "./PopUpWindow";

const styles = theme => ({
  menuButton: {
    marginRight: theme.spacing(2)
  },
  purple: {
    color: "#fff",
    backgroundColor: deepPurple[500]
  }
});

class UserMenu extends Component {
  constructor() {
    super();
    this.state = {
      anchorEl: null
    };
  }
  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null
    });
  };

  render() {
    const { anchorEl } = this.state;
    const { classes } = this.props;

    return (
      <div>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="open drawer"
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <Avatar className={classes.purple}>OP</Avatar>
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <TransitionsModal data={"YourProfile"} action={this.handleClose} />
          <TransitionsModal data={"Help"} action={this.handleClose} />
          <MenuItem onClick={this.handleClose}>
            <FormattedMessage id="userMenu.signOut" />
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

export default withStyles(styles)(UserMenu);
