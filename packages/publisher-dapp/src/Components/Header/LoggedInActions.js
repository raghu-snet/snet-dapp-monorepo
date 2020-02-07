import React, { useState } from "react";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useLocation } from "react-router-dom";

import UserProfilePopUp from "./UserProfilePopUp";
import { useStyles } from "./styles";

const LoggedInActions = ({ classes }) => {
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const location = useLocation();

  const handleProfileIconClick = () => {
    setShowProfilePopup(!showProfilePopup);
  };

  if (location.pathname.includes("/servicecreation/")) {
    return (
      <div className={classes.loggedInActionsContainer}>
        <NotificationsIcon fontSize="large" className={classes.NotificationsIcon} />
        <AccountCircleIcon fontSize="large" onClick={handleProfileIconClick} className={classes.AccountCircleIcon} />
        <UserProfilePopUp show={showProfilePopup} handleClose={() => setShowProfilePopup(false)} />
        <div className={classes.orgNameContainer}>
          <Typography className={classes.orgName}>SingularityNET</Typography>
          <Typography className={classes.role}>Owner</Typography>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.loggedInActionsContainer}>
      <NotificationsIcon fontSize="large" className={classes.NotificationsIcon} />
      <AccountCircleIcon fontSize="large" onClick={handleProfileIconClick} className={classes.AccountCircleIcon} />
      <UserProfilePopUp show={showProfilePopup} handleClose={() => setShowProfilePopup(false)} />
    </div>
  );
};

export default withStyles(useStyles)(LoggedInActions);
