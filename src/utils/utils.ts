import moment from "moment";
import { KeyboardEvent } from "react";
import { cardLayoutPlacedHolderImage } from "../components/common/assets";
import Storage from "./Storage";

export const formateDate = (date: string | Date, formate?: string) => {
  return moment(date).format(formate ?? "DD-MM-YYYY");
};
export const formateDateWithTime = (date: string | Date) => {
  return moment(date).format("DD/MM/YYYY, hh:mm:ss A");
};
export const formatDataYtoD = (date: Date | null | string) => {
  return date ? moment(date).format("YYYY-MM-DD") : null;
};
export const formateDateWithTimeToGetData = (date: Date | null) => {
  if (date) {
    return moment(date).format("YYYY-MM-DD,hh:mm:ss").replace(",", "T").trim();
  } else {
    return null;
  }
};
export const checkEmailValidation = (email: string) => {
  const regEx = /^[a-zA-Z][a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const validEmail = regEx.test(String(email).toLowerCase().trim());
  if (!validEmail) {
    return true;
  } else {
    return false;
  }
};

export const checkPhoneValidation = (phone: string) => {
  // eslint-disable-next-line
  const regEx = /^([0|\+[0-9]{1,2})?([6-9][0-9]{9})$/;
  const testRegex = regEx.test(String(phone).trim());
  if (!testRegex) {
    return false;
  }
  return true;
};
export const checkNameValidation = (name: string) => {
  const regEx = /^[a-zA-Z ]{3,30}$/;
  const testRegex = regEx.test(String(name).trim());
  if (!testRegex) {
    return true;
  } else {
    return false;
  }
};
export const checkPasswordMinOneUpperLetter = (password: string) => {
  const regEx = /^(?=.*[A-Z])/;
  const testRegex = regEx.test(String(password).trim());
  if (!testRegex) {
    return true;
  } else {
    return false;
  }
};

export const checkPasswordMinOneSmallLetter = (password: string) => {
  const regEx = /^(?=.*[a-z])/;
  const testRegex = regEx.test(String(password).trim());
  if (!testRegex) {
    return true;
  } else {
    return false;
  }
};

export const checkPasswordMinOneDigit = (password: string) => {
  const regEx = /^(?=.*[0-9])/;
  const testRegex = regEx.test(String(password).trim());
  if (!testRegex) {
    return true;
  } else {
    return false;
  }
};

export const checkPasswordMinOneSpecialCharacter = (password: string) => {
  const regEx = /^(?=.*[*.!@$%^&(){}[])/;
  const testRegex = regEx.test(String(password).trim());
  if (!testRegex) {
    return true;
  } else {
    return false;
  }
};
export const passwordRegex =
  /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
export const alphabetWithNumsRegex = (nameWithDigits: string) => {
  const regEx = /^[A-Za-z0-9 ]*$/;
  const testRegex = regEx.test(String(nameWithDigits).trim());
  return testRegex;
};
export const handleCardLayoutPlaceHolder = (
  event: React.SyntheticEvent<HTMLImageElement, Event>
) => (event.currentTarget.src = `${cardLayoutPlacedHolderImage}`);

// use below function if you need to restrict your input to take consecutive spaces and must starts without space and does not contain any special characters
export const cleanInputSetter = (
  value: string,
  setter: (value: string) => void
) => {
  if (/^(?!.*\s{2,})[a-zA-Z][a-zA-Z0-9 ]*$/.test(value) || !value)
    setter(value);
};
export const showEntriesStats = (
  totalItem: number,
  currentPage: number,
  pageSize: number
) => {
  const start = (currentPage - 1) * pageSize + 1;
  const end = currentPage * pageSize;
  return `Showing data ${start} to ${
    end > totalItem ? totalItem : end
  } of ${totalItem} items`;
};
//Use this function for preventing (+,-,e,E) symbol in input type=number field
export const blockInvalidChar = (event: KeyboardEvent<HTMLDivElement>) =>
  ["ArrowUp", "ArrowDown", "e", "E", "+", "-"].includes(event.key) &&
  event.preventDefault();
export const tokenWithUrl = (image: string | null | undefined) => {
  const token = Storage.get("token");
  if (image === null && image === undefined) return "";
  return `${image}/${token && token}`;
};
