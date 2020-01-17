import { API } from "aws-amplify";
import { initializeAPIOptions } from "../../../Utils/API";
import { memberStatus } from "../../../Utils/TeamMembers";
import { APIEndpoints, APIPaths } from "../../AWS/APIEndpoints";
import { fetchAuthenticatedUser } from "./userActions/loginActions";
import { loaderActions } from "./";
import { LoaderContent } from "../../../Utils/Loader";
import { APIError } from "shared/dist/utils/API";
import BlockChainError from "shared/dist/utils/API";
import { setUserInviteeStatus, setUserInviteCode } from "./userActions/onboardingActions";
import { initSDK } from "shared/dist/utils/snetSdk";
import { blockChainEvents } from "../../../Utils/Blockchain";

export const SET_MEMBERS_FOR_STATUS = "SET_MEMBERS_FOR_STATUS";

export const setMembersForStatus = (status, members) => ({
  type: SET_MEMBERS_FOR_STATUS,
  payload: { [status]: members },
});

const getMembersAPI = (status, uuid) => async dispatch => {
  const { token } = await dispatch(fetchAuthenticatedUser());
  const apiName = APIEndpoints.REGISTRY.name;
  const apiPath = APIPaths.GET_MEMBERS(uuid);
  const queryStringParameters = { status };
  const apiOptions = initializeAPIOptions(token, null, queryStringParameters);
  return await API.get(apiName, apiPath, apiOptions);
};

export const getMembers = (status, uuid) => async dispatch => {
  const { data } = await dispatch(getMembersAPI(status, uuid));
  dispatch(setMembersForStatus(status, data));
};

export const getAllMembers = uuid => async dispatch => {
  try {
    dispatch(loaderActions.startAppLoader(LoaderContent.GET_ALL_MEMBERS));
    const promises = Object.values(memberStatus).map(status => {
      return dispatch(getMembers(status, uuid));
    });
    await Promise.all(promises);
    dispatch(loaderActions.stopAppLoader());
  } catch (error) {
    dispatch(loaderActions.stopAppLoader());
  }
};

const generateInviteMembersPayload = members => ({ members: members.map(member => ({ username: member.trim() })) });

const inviteMembersAPI = (payload, uuid) => async dispatch => {
  const { token } = await dispatch(fetchAuthenticatedUser());
  const apiName = APIEndpoints.REGISTRY.name;
  const apiPath = APIPaths.INVITE_MEMBERS(uuid);
  const apiOptions = initializeAPIOptions(token, payload);
  return await API.post(apiName, apiPath, apiOptions);
};

export const inviteMembers = (members, uuid) => async dispatch => {
  try {
    dispatch(loaderActions.startAppLoader(LoaderContent.INVITE_MEMBERS));
    const payload = generateInviteMembersPayload(members);
    await dispatch(inviteMembersAPI(payload, uuid));
    dispatch(loaderActions.stopAppLoader());
  } catch (error) {
    dispatch(loaderActions.stopAppLoader());
  }
};

const acceptInvitationAPI = (orgUuid, payload) => async dispatch => {
  const { token } = await dispatch(fetchAuthenticatedUser());
  const apiName = APIEndpoints.REGISTRY.name;
  const apiPath = APIPaths.ACCEPT_INVITATION(orgUuid);
  const apiOptions = initializeAPIOptions(token, payload);
  return await API.post(apiName, apiPath, apiOptions);
};

export const acceptInvitation = (orgUuid, payload) => async dispatch => {
  try {
    dispatch(loaderActions.startAppLoader(LoaderContent.ACCEPT_INVITATION));
    const { data, error } = await dispatch(acceptInvitationAPI(orgUuid, payload));
    if (error.code) {
      throw new APIError(error.message);
    }
    dispatch(loaderActions.stopAppLoader());
    return data;
  } catch (error) {
    dispatch(loaderActions.stopAppLoader());
    throw error;
  }
};

const verifyInvitationCodeAPI = code => async dispatch => {
  const { token } = await dispatch(fetchAuthenticatedUser());
  const apiName = APIEndpoints.REGISTRY.name;
  const apiPath = APIPaths.VERIFY_INIVITATION;
  const queryParameters = {
    invite_code: code,
  };
  const apiOptions = initializeAPIOptions(token, null, queryParameters);
  return await API.get(apiName, apiPath, apiOptions);
};

export const verifyInvitation = code => async dispatch => {
  try {
    dispatch(loaderActions.startAppLoader(LoaderContent.VERIFY_INVITATION_CODE));
    const { data, error } = await dispatch(verifyInvitationCodeAPI(code));
    if (error.code) {
      throw new APIError(error.message);
    }
    dispatch(setUserInviteCode(code));
    dispatch(loaderActions.stopAppLoader());
    return data;
  } catch (error) {
    dispatch(loaderActions.stopAppLoader());
    throw error;
  }
};

const getMemberStatusAPI = (username, orgUuid) => async dispatch => {
  const { token } = await dispatch(fetchAuthenticatedUser());
  const apiName = APIEndpoints.REGISTRY.name;
  const apiPath = APIPaths.GET_MEMBER_STATUS(orgUuid, username);
  const apiOptions = initializeAPIOptions(token);
  return await API.get(apiName, apiPath, apiOptions);
};

export const getMemberStatus = (username, orgUuid) => async dispatch => {
  const { data, error } = await dispatch(getMemberStatusAPI(username, orgUuid));
  if (error.code) {
    throw new APIError(error.message);
  }
  if (data[0] && data[0].status) {
    setUserInviteeStatus(data[0].status);
  }
};
const generatePublishMembersPayload = members =>
  members.map(member => ({
    username: member.username,
    address: member.address,
    status: member.status,
  }));

const publishMembersAPI = (payload, uuid) => async dispatch => {
  const { token } = await dispatch(fetchAuthenticatedUser());
  const apiName = APIEndpoints.REGISTRY.name;
  const apiPath = APIPaths.PUBLISH_MEMBERS(uuid);
  const apiOptions = initializeAPIOptions(token, payload);
  return await API.get(apiName, apiPath, apiOptions);
};

export const publishMembers = (members, uuid) => async dispatch => {
  try {
    dispatch(loaderActions.startAppLoader(LoaderContent.PUBLISH_MEMBERS));
    const payload = generatePublishMembersPayload(members);
    await dispatch(publishMembersAPI(payload, uuid));
  } catch (error) {
    dispatch(loaderActions.stopAppLoader());
  }
};

const filterAdressFromMembers = members => members.map(member => member.address);

export const addAndPublishMembers = (members, orgId, uuid) => async dispatch => {
  const sdk = await initSDK();
  const newMembersAddress = filterAdressFromMembers(members);
  dispatch(loaderActions.startAppLoader(LoaderContent.ADD_MEMBERS_TO_BLOCKCHAIN));
  return new Promise((resolve, reject) => {
    sdk._registryContract
      .addOrganizationMembers(orgId, newMembersAddress)
      .on(blockChainEvents.TRANSACTION_HASH, async txnHash => {
        await dispatch(publishMembers(members, uuid, txnHash));
      })
      .on(blockChainEvents.RECEIPT, () => {
        dispatch(loaderActions.stopAppLoader());
        resolve();
      })
      .on(blockChainEvents.ERROR, error => {
        dispatch(loaderActions.stopAppLoader());
        throw new BlockChainError();
      });
  });
};
