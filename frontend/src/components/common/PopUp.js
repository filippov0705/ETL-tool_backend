import React, { Component } from "react";
import { FormattedMessage } from "react-intl";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import withStyles from "@material-ui/core/styles/withStyles";
import ScheduleRoundedIcon from "@material-ui/icons/ScheduleRounded";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import MoreHorizRoundedIcon from "@material-ui/icons/MoreHorizRounded";
import MenuItem from "@material-ui/core/MenuItem";

import List from "./List";

const styles = theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
});

class TransitionsModal extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      popupContent: null
    };
  }

  handleOpen = event => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  menuItemClick = () => {
    this.handleOpen();
    this.props.action();
  };

  scheduleClick = () => {
    this.handleOpen();
    //TODO: add logic for popup content creation
  };

  editClick = () => {
    this.handleOpen();
    //TODO: add logic for popup content creation
  };

  moreClick = () => {
    this.handleOpen();
    this.setState({
      popupContent: <List data={"More"} />
    });
  };

  getIcon = () => {
    switch (this.props.data) {
      case "Schedule":
        return <ScheduleRoundedIcon onClick={this.scheduleClick} />;

      case "Edit":
        return <EditRoundedIcon onClick={this.editClick} />;

      case "More":
        return <MoreHorizRoundedIcon onClick={this.moreClick} />;

      case "YourProfile":
        return (
          <MenuItem onClick={this.menuItemClick}>
            <FormattedMessage id="userMenu.yourProfile" />
          </MenuItem>
        );

      case "Help":
        return (
          <MenuItem onClick={this.menuItemClick}>
            <FormattedMessage id="userMenu.help" />
          </MenuItem>
        );

      default:
        return null;
    }
  };

  render() {
    const { classes, data } = this.props,
      { open } = this.state;

    return (
      <div>
        {this.getIcon(data)}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={this.handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <h2>{this.props.data}</h2>
              {this.state.popupContent}
            </div>
          </Fade>
        </Modal>
      </div>
    );
  }
}

export default withStyles(styles)(TransitionsModal);
