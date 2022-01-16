import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";

import { useStyles } from "./styles";
import AccountBalance from "../../common/AccountBalance";
import StyledButton from "../../common/StyledButton";
import TransactionReceipt from "./TransactionReceipt";

const UserProfileClaims = ({ classes }) => {
  return (
    <Grid container className={classes.claimsMainContainer}>
      <Grid xs={12} sm={12} md={4} lg={4} className={classes.accountBalanceContainer}>
        <AccountBalance />
      </Grid>

      <Grid xs={12} sm={12} md={8} lg={8} className={classes.claimsContainer}>
        <h3>Claims</h3>
        <div className={classes.claimsForSolutions}>
          <h4>Claims for Solutions</h4>
          <Typography className={classes.description}>
            All AGIX tokens you receieved as rewards from the solutions that you submitted will be listed here for you
            claim to your Metamask wallet.
          </Typography>
          <Grid container className={classes.tableHeader}>
            <Grid xs={12} sm={4} md={4} lg={4}>
              <span>Request Title</span>
            </Grid>
            <Grid xs={12} sm={1} md={1} lg={1}>
              <span>Votes</span>
            </Grid>
            <Grid xs={12} sm={2} md={2} lg={2}>
              <span>Completed on</span>
            </Grid>
            <Grid xs={12} sm={1} md={1} lg={1}>
              <span>Days left to claim</span>
            </Grid>
            <Grid xs={12} sm={2} md={2} lg={2} className={classes.centerAlign}>
              <span>Tokens</span>
            </Grid>
            <Grid xs={12} sm={2} md={2} lg={2} />
          </Grid>
          <Grid container className={classes.tableData}>
            <Grid xs={12} sm={4} md={4} lg={4}>
              <span className={classes.responsiveHeader}>Request Title:</span>
              <span>A very long Request name</span>
            </Grid>
            <Grid xs={12} sm={1} md={1} lg={1}>
              <span className={classes.responsiveHeader}>Votes:</span>
              <span>12</span>
            </Grid>
            <Grid xs={12} sm={2} md={2} lg={2}>
              <span className={classes.responsiveHeader}>Completed on:</span>
              <span>20 Oct 2019</span>
            </Grid>
            <Grid xs={12} sm={1} md={1} lg={1}>
              <span className={classes.responsiveHeader}>Days left to claim:</span>
              <span>28 days</span>
            </Grid>
            <Grid xs={12} sm={2} md={2} lg={2} className={classes.centerAlign}>
              <span className={classes.responsiveHeader}>Tokens:</span>
              <span>999 AGIX</span>
            </Grid>
            <Grid xs={12} sm={2} md={2} lg={2}>
              <StyledButton disabled type="transparentBlueBorder" btnText="claim" />
            </Grid>
          </Grid>
        </div>
        <div className={classes.claimsForRequest}>
          <h4>Claims for Request</h4>
          <Typography className={classes.description}>
            All claims from the requests that you backed that were closed by you, the original requester or rejected
            SingularityNET foundation will be listed here for you to claim back to your Metamask wallet. Automatic
            refunds and transfer are currently not supported.
          </Typography>
          <Grid container className={classes.tableHeader}>
            <Grid xs={12} sm={4} md={4} lg={4}>
              <span>Request Title</span>
            </Grid>
            <Grid xs={12} sm={3} md={3} lg={3}>
              <span>Reason for claim</span>
            </Grid>
            <Grid xs={12} sm={3} md={3} lg={3}>
              <span>tokens backed</span>
            </Grid>
            <Grid xs={12} sm={2} md={2} lg={2} />
          </Grid>
          <Grid container className={classes.tableData}>
            <Grid xs={12} sm={4} md={4} lg={4}>
              <span className={classes.responsiveHeader}>Request Title:</span>
              <span>A very long Request name</span>
            </Grid>
            <Grid xs={12} sm={3} md={3} lg={3}>
              <span className={classes.responsiveHeader}>Reason for claim:</span>
              <span>Request Rejected</span>
            </Grid>
            <Grid xs={12} sm={3} md={3} lg={3}>
              <span className={classes.responsiveHeader}>Tokens backed:</span>
              <span>999 AGIX</span>
            </Grid>
            <Grid xs={12} sm={2} md={2} lg={2}>
              <StyledButton disabled type="transparentBlueBorder" btnText="claim" />
            </Grid>
          </Grid>
        </div>
      </Grid>

      <TransactionReceipt
        open={false}
        succesMsg="Claim for Request Succesfully Processed"
        receiptHeader="Claim"
        requestTitle="A very long service provider request"
      />
    </Grid>
  );
};

export default withStyles(useStyles)(UserProfileClaims);
