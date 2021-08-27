import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { useStyles } from "./styles";
import SNETButton from "shared/dist/components/SNETButton";
import { ServiceCreationRoutes } from "../../ServiceCreationRouter/Routes";
import { useDispatch, useSelector } from "react-redux";
import { aiServiceDetailsActions } from "../../../../Services/Redux/actionCreators";
import { GlobalRoutes } from "../../../../GlobalRouter/Routes";
import validator from "shared/dist/utils/validator";
import { servicePricingValidationConstraints } from "../validationConstraints";
import { generateDetailedErrorMessageFromValidation } from "../../../../Utils/validation";

import { cogsToAgi } from "shared/dist/utils/Pricing";
import AlertBox, { alertTypes } from "shared/dist/components/AlertBox";
import { progressStatus, sections } from "../../constant";

const selectState = state => ({
  isValidateServiceIdLoading: state.loader.validateServiceId.isLoading,
  serviceStatus: state.aiServiceDetails.progressStages,
});

const Actions = ({ serviceDetails, setServiceDetailsInRedux, setInvalidFields }) => {
  const { serviceStatus } = useSelector(selectState);
  const classes = useStyles();
  const history = useHistory();
  const { orgUuid, serviceUuid } = useParams();
  const dispatch = useDispatch();
  const [alert, setAlert] = useState({});

  const handleBack = () => {
    history.push(ServiceCreationRoutes.DEMO.path.replace(":orgUuid", orgUuid).replace(":serviceUuid", serviceUuid));
  };

  const handleSave = async () => {
    setServiceDetailsInRedux(serviceDetails);
    await dispatch(aiServiceDetailsActions.saveServiceDetails(orgUuid, serviceUuid, serviceDetails));
    dispatch(aiServiceDetailsActions.setSavedPricingDetails(true));
  };

  const handleContinue = async () => {
    let invalidFields = validator(serviceDetails, servicePricingValidationConstraints, { format: "grouped" });
    for (const property in invalidFields) {
      if (property === "groups") {
        const invalidProperty = JSON.parse(invalidFields[property]);
        Object.assign(invalidFields, invalidProperty[0]);
        delete invalidFields.groups;
      }
    }
    if (!serviceDetails.groups[0].pricing[0].priceInCogs >= cogsToAgi(1)) {
      invalidFields = {
        ...invalidFields,
        pricing: `Price of the service should be greater than or equal to ${cogsToAgi(1)}`,
      };
    }
    if (invalidFields) {
      let isNotValid = [];
      isNotValid = isNotValid = Object.values(invalidFields);
      if (isNotValid) {
        for (let i = 0; i < isNotValid.length; i++) {
          if (isNotValid[i].includes(",")) {
            let res = isNotValid[i].split(",");
            isNotValid.splice(i, 1);
            isNotValid.push(...res);
          }
        }
        setInvalidFields(invalidFields);
        const errorMessage = generateDetailedErrorMessageFromValidation(isNotValid);
        return setAlert({ type: alertTypes.ERROR, children: errorMessage });
      }
    }
    setInvalidFields("");
    await handleSave();
    dispatch(
      aiServiceDetailsActions.updateProgressStatus(
        sections.PRICING_AND_DISTRIBUTION,
        progressStatus.PENDING,
        serviceStatus
      )
    );
    history.push(ServiceCreationRoutes.LAUNCH.path.replace(":orgUuid", orgUuid).replace(":serviceUuid", serviceUuid));
  };
  const handleFinishLater = async () => {
    await handleSave();
    history.push(GlobalRoutes.SERVICES.path.replace(":orgUuid", orgUuid));
  };

  return (
    <div>
      <AlertBox type={alert.type} message={alert.message} children={alert.children} />

      <div className={classes.buttonsContainer}>
        <SNETButton color="primary" children="finish later" onClick={handleFinishLater} />
        <SNETButton color="primary" children="previous step" onClick={handleBack} />
        <SNETButton color="primary" variant="contained" children="continue" onClick={handleContinue} />
      </div>
    </div>
  );
};

export default Actions;
