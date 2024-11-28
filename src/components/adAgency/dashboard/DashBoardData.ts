import {
  expectedIncomeImg,
  offlineScreenImg,
  onlineScreenImg,
  totalScreensImg,
  walletImg,
} from "../assets";

export const dashBoardData = [
  {
    id: 1,
    title: "Online Screens",
    img: onlineScreenImg,
    value: 15,
    percentage: 16,
  },
  {
    id: 2,
    title: "Offline Screens",
    img: offlineScreenImg,
    value: 60,
    percentage: 1,
  },
  {
    id: 3,
    title: "Total Screens",
    img: totalScreensImg,
    value: 35,
  },
  {
    id: 4,
    title: "Expected Income",
    img: expectedIncomeImg,
    value: 60450,
    percentage: 16,
  },
  {
    id: 5,
    title: "My Wallet",
    img: walletImg,
    value: 15200,
  },
  {
    id: 6,
    title: "Commission",
    img: expectedIncomeImg,
    value: 20,
  },
];
