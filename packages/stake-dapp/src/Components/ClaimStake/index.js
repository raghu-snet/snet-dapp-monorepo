import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import moment from "moment";

import AlertBox, { alertTypes } from "shared/dist/components/AlertBox";
import SNETButton from "shared/dist/components/SNETButton";
import NoDataFoundImg from "shared/dist/assets/images/NoDataFound.png";

import { cardDetails, btnDetails } from "./content";
import { useStyles } from "./styles";
import AccountBalance from "../AccountBalance";
import Card from "../StakeSession/Card";
import InfoBox from "../StakeSession/InfoBox";
import { LoaderContent } from "../../Utils/Loader";
import { loaderActions } from "../../Services/Redux/actionCreators";
import { waitForTransaction, claimStake } from "../../Utils/BlockchainHelper";

import InlineLoader from "../InlineLoader";

const stateSelector = state => ({
  claimStakes: state.stakeReducer.claimStakes,
  metamaskDetails: state.metamaskReducer.metamaskDetails,
  isLoading: state.loader.claimStakeList.isLoading,
});

const ClaimStake = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { claimStakes, metamaskDetails, isLoading } = useSelector(state => stateSelector(state));

  const [alert, setAlert] = useState({ 0: { type: "Error", message: "Test Error Message" } });

  if (isLoading) {
    return <InlineLoader />;
  }

  if (claimStakes.length === 0) {
    return (
      <div className={classes.noDataFoundSection}>
        <img src={NoDataFoundImg} alt="No Data Found" />
        <Typography>You have no stakes to claim</Typography>
      </div>
    );
  }

  const initiateClaimState = async stakeMapIndex => {
    let txHash;
    try {
      // Initiate the Withdraw Stake Operation
      txHash = await claimStake(metamaskDetails, stakeMapIndex);

      setAlert({ [stakeMapIndex]: { type: alertTypes.INFO, message: "Transaction is in Progress" } });

      dispatch(loaderActions.startAppLoader(LoaderContent.CLAIM_STAKE));

      await waitForTransaction(txHash);

      setAlert({
        [stakeMapIndex]: { type: alertTypes.SUCCESS, message: "Transaction has been completed successfully" },
      });

      dispatch(loaderActions.stopAppLoader());
    } catch (err) {
      setAlert({ [stakeMapIndex]: { type: alertTypes.ERROR, message: "Transaction has failed." } });
      dispatch(loaderActions.stopAppLoader());
    }
  };

  const handleClick = async (btnAction, stakeMapIndex) => {
    if (btnAction === "reStake") {
      alert("reStake Coming Soon... Stay Tuned...");
    }

    if (btnAction === "claimStake") {
      await initiateClaimState(stakeMapIndex);
    }
  };

  const disableUserStakeActions = stakeDetails => {
    const currentTimestamp = moment().unix();

    // Check for Metamask Connection
    if (!metamaskDetails.isTxnsAllowed) {
      return true;
    }

    // Check if the Stake is in Submission Phase and Not Open For external
    if (
      currentTimestamp > stakeDetails.startPeriod &&
      currentTimestamp < stakeDetails.submissionEndPeriod &&
      stakeDetails.openForExternal === false
    ) {
      return true;
    }

    // Check for the Claim Actions
    const gracePeriod = stakeDetails.endPeriod + (stakeDetails.endPeriod - stakeDetails.requestWithdrawStartPeriod);

    if (currentTimestamp > stakeDetails.endPeriod && currentTimestamp < gracePeriod) {
      return true;
    }
    return false;
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={4} lg={4}>
        <AccountBalance />
      </Grid>
      <Grid item xs={12} sm={12} md={8} lg={8} className={classes.stakeSessionBoxContainer}>
        {claimStakes.map(stake => (
          <div key={stake.stakeMapIndex} className={classes.box}>
            <div className={classes.header}>
              <Typography variant="h6">
                Stake Session - {moment.unix(stake.startPeriod).format("MMM YYYY")} #{stake.stakeMapIndex}
              </Typography>
            </div>
            <div className={classes.cards}>
              {cardDetails(stake).map(card => (
                <Card key={card.title} title={card.title} value={card.value} unit={card.unit} />
              ))}
            </div>
            <div className={classes.infoBox}>
              <InfoBox stakeDetails={stake} />
            </div>
            <AlertBox
              type={alert[stake.stakeMapIndex] ? alert[stake.stakeMapIndex].type : undefined}
              message={alert[stake.stakeMapIndex] ? alert[stake.stakeMapIndex].message : undefined}
            />
            <div className={classes.btnContainer}>
              {btnDetails.map(button => (
                <SNETButton
                  key={button.text}
                  children={button.text}
                  color={button.color}
                  variant={button.variant}
                  onClick={_e => handleClick(button.action, stake.stakeMapIndex)}
                  disabled={disableUserStakeActions(stake)}
                />
              ))}
            </div>
          </div>
        ))}
      </Grid>
    </Grid>
  );
};

export default ClaimStake;
