import React, { useState } from "react";
import { connect } from "react-redux";
import Modal from "@material-ui/core/Modal";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CircularProgress from "@material-ui/core/CircularProgress";

import AlertBox, { alertTypes } from "../../../../common/AlertBox";
import { requestDetailsById } from "../../../../../Redux/reducers/RequestReducer";
import { waitForTransaction, closeRequest } from "../../../../../utility/BlockchainHelper";

import Paper from "@material-ui/core/Paper";

import { useStyles } from "./styles";
import StyledButton from "../../../../common/StyledButton";

import { LoaderContent } from "../../../../../utility/constants/LoaderContent";
import { loaderActions } from "../../../../../Redux/actionCreators";

const CloseRequest = ({
  open,
  handleClose,
  requestId,
  requestDetails,
  loading,
  metamaskDetails,
  startLoader,
  stopLoader,
}) => {
  const classes = useStyles();

  const [alert, setAlert] = useState({ type: alertTypes.ERROR, message: undefined });

  const handleCancel = () => {
    setAlert({ type: alertTypes.ERROR, message: undefined });
    handleClose();
  };

  const handleSubmit = async () => {
    if (!metamaskDetails.isTxnsAllowed) {
      setAlert({ type: alertTypes.ERROR, message: `Needs connection to Metamask` });
      return;
    }

    try {
      // Initiate the Deposit Token to RFAI Escrow
      let txHash = await closeRequest(metamaskDetails, requestId);

      startLoader(LoaderContent.CLOSE_REQUEST);

      // Wait for the transaction to be completed
      await waitForTransaction(txHash);

      setAlert({ type: alertTypes.SUCCESS, message: "Transaction has been completed successfully" });

      stopLoader();
    } catch (err) {
      setAlert({ type: alertTypes.ERROR, message: "Transaction has failed." });
      stopLoader();
    }
  };

  if (!requestDetails) {
    return <div />;
  }

  return (
    <div>
      <Modal open={open} onClose={handleCancel} className={classes.Modal}>
        <Card className={classes.card}>
          <CardHeader
            className={classes.CardHeader}
            title="Close Request"
            action={
              <IconButton onClick={handleCancel}>
                <CloseIcon />
              </IconButton>
            }
          />
          <CardContent className={classes.CardContent}>
            <Paper className={classes.root}>
              <div className={classes.requestTitleContainer}>
                <span className={classes.requestTitle}>Request Title : </span>
                <span className={classes.titleName}>{requestDetails.request_title}</span>
              </div>
              {loading && (
                <div className={classes.circularProgressContainer}>
                  <div className={classes.loaderChild}>
                    <CircularProgress className={classes.circularProgress} />
                    <p className={classes.loaderText}>LOADING SOLUTION..</p>
                  </div>
                </div>
              )}
              {!loading && (
                <div className={classes.closeRequestContent}>
                  <div className="overview-content">
                    <p>
                      Are you sure you want to close your request? Once the request is closed, it can not be reopened.
                      All AGIX tokens will be returned the Backers through the Claims page.
                    </p>
                  </div>
                </div>
              )}
            </Paper>
            <AlertBox type={alert.type} message={alert.message} />
          </CardContent>
          <CardActions className={classes.CardActions}>
            <StyledButton btnText="Cancel" type="transparent" onClick={handleCancel} />
            <StyledButton btnText="Close Request" type="redBg" onClick={handleSubmit} />
          </CardActions>
        </Card>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const { requestId } = ownProps;

  return {
    loading: state.loaderReducer.RequestModalCallStatus,
    metamaskDetails: state.metamaskReducer.metamaskDetails,
    requestDetails: requestDetailsById(state, requestId),
  };
};

const mapDispatchToProps = dispatch => ({
  startLoader: loaderContent => dispatch(loaderActions.startAppLoader(loaderContent)),
  stopLoader: () => dispatch(loaderActions.stopAppLoader),
});

export default connect(mapStateToProps, mapDispatchToProps)(CloseRequest);
