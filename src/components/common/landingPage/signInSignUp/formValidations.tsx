import { translate } from "../../../../config/i18n";
import {
  checkEmailValidation,
  checkNameValidation,
  checkPasswordMinOneDigit,
  checkPasswordMinOneSmallLetter,
  checkPasswordMinOneSpecialCharacter,
  checkPasswordMinOneUpperLetter,
  checkPhoneValidation,
} from "../../../../utils/utils";
export const handleNameSwitch = (name: string) => {
  switch (true) {
    case name.length === 0:
      return translate("common.required");
    case checkNameValidation(name) && name.length !== 0:
      return translate("common.invalidName");
    default: {
      return "";
    }
  }
};
export const handleEmailSwitch = (email: string) => {
  switch (true) {
    case email.length === 0:
      return translate("common.required");
    case checkEmailValidation(email) && email.length !== 0:
      return translate("common.invalidEmail");
    default: {
      return "";
    }
  }
};
export const handlePhoneSwitch = (phoneNumber: string) => {
  switch (true) {
    case phoneNumber.length === 0:
      return translate("common.required");
    case !checkPhoneValidation(phoneNumber) && phoneNumber.length !== 0:
      return translate("common.invalidPhone");
    default: {
      return "";
    }
  }
};
export const handleOrganizationNameSwitch = (organizationName: string) => {
  switch (true) {
    case organizationName.length === 0:
      return translate("common.required");
    case checkNameValidation(organizationName) && organizationName.length !== 0:
      return translate("common.invalidOrganizationName");
    default: {
      return "";
    }
  }
};
export const handleRoleCondition = (role: string) => {
  if (!role) {
    return translate("common.required");
  } else {
    return "";
  }
};
export const handlePasswordSwitch = (passwrod: string) => {
  switch (true) {
    case passwrod.length === 0:
      return translate("common.required");
    case passwrod.length < 8:
      return translate("common.passwordLength");
    case checkPasswordMinOneUpperLetter(passwrod):
      return translate("common.requireUpperLetter");
    case checkPasswordMinOneSmallLetter(passwrod):
      return translate("common.requireSmallLetter");
    case checkPasswordMinOneDigit(passwrod):
      return translate("common.requireOneDigit");
    case checkPasswordMinOneSpecialCharacter(passwrod):
      return translate("common.requireSpecialCharacter");
    default: {
      return "";
    }
  }
};
export const handleEmailOrPhoneSwitch = (emailOrPhone: string) => {
  if (emailOrPhone.length === 0) {
    return translate("common.required");
  } else {
    if (emailOrPhone.includes("@")) {
      return checkEmailValidation(emailOrPhone)
        ? translate("common.invalidPhoneOrEmail")
        : "";
    } else {
      return !checkPhoneValidation(emailOrPhone)
        ? translate("common.invalidPhoneOrEmail")
        : "";
    }
  }
};
