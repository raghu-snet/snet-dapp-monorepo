import { fromWei } from "../../Utils/GenHelperFunctions";
import BigNumber from "bignumber.js";

export const incubationProgressDetails = stakeDetails => ({
  startPeriod: stakeDetails.startPeriod,
  submissionEndPeriod: stakeDetails.submissionEndPeriod,
  endPeriod: stakeDetails.endPeriod,
});

const computeReward = stakeDetails => {
  if (stakeDetails.approvedAmount === 0) return 0;

  const approvedAmount = new BigNumber(stakeDetails.approvedAmount);
  const windowRewardAmount = new BigNumber(stakeDetails.rewardAmount);
  const windowTotalStake = new BigNumber(stakeDetails.windowTotalStake === 0 ? 1 : stakeDetails.windowTotalStake);
  const windowMaxCap = new BigNumber(stakeDetails.windowMaxCap);

  let rewardAmount = new BigNumber(0);

  if (windowTotalStake.lt(windowMaxCap)) {
    rewardAmount = approvedAmount.times(windowRewardAmount).div(windowTotalStake);
  } else {
    rewardAmount = approvedAmount.times(windowRewardAmount).div(windowMaxCap);
  }

  return rewardAmount;
};

export const cardDetails = stakeDetails => [
  {
    title: "Accepted Stake Amount",
    value: fromWei(stakeDetails.approvedAmount),
    unit: "AGI",
    toolTip:
      "The amount of AGI tokens that network accepted from your stake.  Any partial amounts not accepted by SNET Foundation will be automatically refunded to your wallet account.",
  },
  {
    title: "Reward Amount",
    value: fromWei(computeReward(stakeDetails)),
    unit: "AGI",
    toolTip: "The final amout of AGI tokens you gain as reward at the end of stake incubation period",
  },
  {
    title: "Refunded Amount",
    value: fromWei(stakeDetails.refundAmount),
    unit: "AGI",
    toolTip:
      "The amount of AGI tokens refunded automatically to your wallet account  from the unused portion of your original stake not accepted by the network.",
  },
  {
    title: "Stakers",
    value: stakeDetails.numOfStakers,
    unit: "people",
  },
  {
    title: "Current Pool Size",
    value: fromWei(stakeDetails.windowTotalStake),
    unit: "AGI",
  },
  {
    title: "Reward Pool",
    value: fromWei(stakeDetails.rewardAmount),
    unit: "AGI",
  },
];

export const agreementDetails = {
  label: "Auto Renew to next stake session",
  description:
    "Renewing stakes (and profit margins) to the next avaliable stake session gives you priority over new stakers. Renewing stakes avoids the minimum and maximum AGI requirements. Renewing saves you in ETH gas cost.",
};
