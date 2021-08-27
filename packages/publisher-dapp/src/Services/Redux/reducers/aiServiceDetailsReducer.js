import { aiServiceDetailsActions } from "../actionCreators";
import { ContactsTypes } from "../../../Utils/Contacts";
import { serviceSetupStatuses } from "../../../Utils/serviceSetup";
import { serviceCreationStatus, progressStages, sections } from "../../../Pages/AiServiceCreation/constant";

export const defaultGroups = [
  {
    name: "default_group",
    id: "",
    pricing: [
      {
        default: true,
        priceModel: "fixed_price",
        priceInCogs: 1,
      },
    ],
    endpoints: {},
    testEndpoints: [],
    daemonAddresses: [],
    freeCallsAllowed: 0,
  },
];

const initialAiServiceDetailsState = {
  demoComponentAvailable: true,
  serviceState: {
    state: serviceCreationStatus.NOT_STARTED,
  },
  touched: false,
  status: serviceSetupStatuses.NOT_STARTED,
  uuid: "",
  name: "",
  id: "",
  newId: "",
  availability: "",
  shortDescription: "",
  longDescription: "",
  projectURL: "",
  proto: {
    ipfsHash: "",
    encoding: "",
    type: "",
  },
  assets: {
    heroImage: {
      url: "",
      ipfsHash: "",
    },
    demoFiles: {
      url: "",
      ipfsHash: "",
    },
    protoFiles: {
      url: "",
      ipfsHash: "",
    },
  },
  contributors: "",
  ipfsHash: "",
  contacts: [
    { type: ContactsTypes.GENERAL, email: "", phone: "" },
    { type: ContactsTypes.SUPPORT, email: "", phone: "" },
  ],
  groups: defaultGroups,
  tags: [],
  comments: {
    SERVICE_PROVIDER: "",
    SERVICE_APPROVER: "<div></div>",
  },
  foundInBlockchain: false,
  progressStages,
  currentSection: sections.AI_PROFILE,
  savedPricingDetails: false,
};

const serviceDetailsReducer = (state = initialAiServiceDetailsState, action) => {
  switch (action.type) {
    case aiServiceDetailsActions.SET_DEMO_COMPONENT_AVAILABLE:
      return { ...state, demoComponentAvailable: action.payload };
    case aiServiceDetailsActions.SET_BUILD_STATUS:
      return { ...state, progressStages: action.payload };
    case aiServiceDetailsActions.SET_PROGRESS_STATUS:
      return { ...state, progressStages: action.payload };
    case aiServiceDetailsActions.SET_ALL_SERVICE_DETAILS_ATTRIBUTES:
      return { ...state, ...action.payload };
    case aiServiceDetailsActions.SET_AI_SERVICE_TOUCHED_FLAG:
      return { ...state, touched: action.payload };
    case aiServiceDetailsActions.SET_AI_SERVICE_ID:
      return { ...state, id: action.payload };
    case aiServiceDetailsActions.SET_AI_SERVICE_ID_AVAILABILITY:
      return { ...state, availability: action.payload };
    case aiServiceDetailsActions.SET_AI_SERVICE_NAME:
      return { ...state, name: action.payload };
    case aiServiceDetailsActions.SET_AI_SERVICE_UUID:
      return { ...state, uuid: action.payload };
    case aiServiceDetailsActions.SET_AI_SERVICE_GROUPS:
      return { ...state, groups: action.payload };
    case aiServiceDetailsActions.SET_AI_SERVICE_DETAIL_LEAF:
      return { ...state, [action.payload.name]: action.payload.value };
    case aiServiceDetailsActions.SET_AI_SERVICE_MULTIPLE_DETAILS:
      return { ...state, ...action.payload };
    case aiServiceDetailsActions.SET_AI_SERVICE_FREE_CALL_SIGNER_ADDRESS:
      return { ...state, freeCallSignerAddress: action.payload };
    case aiServiceDetailsActions.SET_SERVICE_PROVIDER_COMMENT:
      return {
        ...state,
        comments: {
          ...state.comments,
          SERVICE_PROVIDER: action.payload,
        },
      };
    case aiServiceDetailsActions.SET_AI_SERVICE_STATE_STATE:
      return { ...state, serviceState: { ...state.serviceState, state: action.payload } };
    case aiServiceDetailsActions.SET_SERVICE_DETAILS_PROTO_URL:
      return { ...state, assets: { ...state.assets, protoFiles: { ...state.assets.protoFiles, url: action.payload } } };
    case aiServiceDetailsActions.SET_SERVICE_HERO_IMAGE_URL:
      return { ...state, assets: { ...state.assets, heroImage: { ...state.assets.heroImage, url: action.payload } } };
    case aiServiceDetailsActions.SET_SERVICE_DEMO_FILES_URL:
      return { ...state, assets: { ...state.assets, demoFiles: { ...state.assets.demoFiles, url: action.payload } } };
    case aiServiceDetailsActions.SET_SERVICE_DETAILS_FOUND_IN_BLOCKCHAIN:
      return { ...state, foundInBlockchain: action.payload };
    case aiServiceDetailsActions.SET_SAVED_PRICING_DETAILS:
      return { ...state, savedPricingDetails: action.payload };
    default:
      return state;
  }
};

export default serviceDetailsReducer;
