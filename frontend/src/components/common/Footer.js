import React from "react";
import { FormattedMessage } from "react-intl";

import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import FooterLogo from "../../style/img/footer-logo.svg";
import withStyles from "@material-ui/core/styles/withStyles";

import {
  COPYRIGHT,
  TELEPHONE_VELCOM,
  TELEPHONE_MTS,
  E_MAIL,
  MAIL_TO_CAREERS,
  MAIL_TO_CAREERS_HREF,
  MAIL_TO_LAB,
  MAIL_TO_LAB_HREF,
  MAIL_TO_COOPERATION,
  MAIL_TO_COOPERATION_HREF
} from "../../constants/footerConstants";

const styles = theme => ({
  columnGrid: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    fontSize: "14px",
    color: "white"
  },
  text: {
    color: "white"
  },
  logo: {
    width: "150px",
    [theme.breakpoints.up("xs")]: {
      display: "none"
    },
    [theme.breakpoints.up("sm")]: {
      display: "none"
    },
    [theme.breakpoints.up("md")]: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    },
    [theme.breakpoints.up("lg")]: {
      display: "flex"
    }
  },
  footerRight: {
    display: "flex",
    alignItems: "center"
  },
  footerContainer: {
    [theme.breakpoints.up("xs")]: {
      flexDirection: "column-reverse",
      alignItems: "center"
    },
    [theme.breakpoints.up("sm")]: {
      flexDirection: "column-reverse"
    },
    [theme.breakpoints.up("md")]: {
      display: "flex",
      flexDirection: "row"
    },
    [theme.breakpoints.up("lg")]: {
      display: "flex"
    }
  },
  footerWrapper: {
    backgroundColor: "#24292e"
  },
  footer: {
    width: "100%",
    maxWidth: "1200px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "10px",
    margin: "0 auto"
  }
});

const Footer = props => {
  const { classes } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl" className={classes.footerWrapper}>
        <Typography component="div" className={classes.footer}>
          <Grid container className={classes.footerContainer}>
            <Grid item xs={12} md={5} className={classes.columnGrid}>
              <img src={FooterLogo} alt="logo" className={classes.logo} />
              <span className={classes.text}>&#169;{COPYRIGHT}</span>
            </Grid>
            <Grid item xs={12} md={7} className={classes.footerRight}>
              <Grid item xs={8} className={classes.columnGrid}>
                <span>
                  <FormattedMessage id="footer.telephones" />:
                </span>
                <span>{TELEPHONE_VELCOM}</span>
                <span>{TELEPHONE_MTS}</span>
              </Grid>
              <Grid item xs={4} className={classes.columnGrid}>
                <span>
                  {E_MAIL}{" "}
                  <a className={classes.text} href={MAIL_TO_CAREERS_HREF}>
                    {MAIL_TO_CAREERS}
                  </a>
                </span>
                <span>
                  <FormattedMessage id="footer.careerStart" />:{" "}
                  <a className={classes.text} href={MAIL_TO_LAB_HREF}>
                    {MAIL_TO_LAB}
                  </a>
                </span>
                <span>
                  <FormattedMessage id="footer.cooperation" />:{" "}
                  <a className={classes.text} href={MAIL_TO_COOPERATION_HREF}>
                    {MAIL_TO_COOPERATION}
                  </a>
                </span>
              </Grid>
            </Grid>
          </Grid>
        </Typography>
      </Container>
    </React.Fragment>
  );
};

export default withStyles(styles)(Footer);
