import { translate } from "../../../config/i18n";
import {
  alphabetWithNumsRegex,
  checkEmailValidation,
  checkNameValidation,
  checkPhoneValidation,
} from "../../../utils/utils";
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
export const handleStudentIdSwitch = (studentId: string) => {
  switch (true) {
    case studentId.length === 0:
      return translate("common.required");
    case !alphabetWithNumsRegex(studentId) && studentId.length !== 0:
      return "Invalid Student ID";
    default: {
      return "";
    }
  }
};
export const handleEducationalSwitch = (studentId: string) => {
  switch (true) {
    case studentId.length === 0:
      return translate("common.required");
    case !alphabetWithNumsRegex(studentId) && studentId.length !== 0:
      return "Invalid Educational ID";
    default: {
      return "";
    }
  }
};
export const handleDOBSwitch = (dateOfBirth: string) => {
  if (dateOfBirth.length === 0) {
    return translate("common.required");
  } else {
    return "";
  }
};
export const handleCourseSwitch = (institute: string) => {
  switch (true) {
    case institute.length === 0:
      return translate("common.required");
    case !alphabetWithNumsRegex(institute) && institute.length !== 0:
      return "Invalid Course/Major";
    default: {
      return "";
    }
  }
};
export const handleStudyYear = (givenYear: string) => {
  const currentYear = new Date().getFullYear();
  switch (true) {
    case givenYear.length === 0:
      return translate("common.required");
    case +givenYear > 0 && +givenYear <= currentYear:
      return "Invalid Year Of Study";
    default: {
      return "";
    }
  }
};
export const formInitialData = [
  {
    fieldName: "fullName",
    value: "",
    errorMessage: "",
    placeholder: "Full Name",
  },
  {
    fieldName: "studentId",
    value: "",
    errorMessage: "",
    placeholder: "Student ID",
  },
  {
    fieldName: "emailAddress",
    value: "",
    errorMessage: "",
    placeholder: "Email Address",
  },
  {
    fieldName: "phoneNumber",
    value: "",
    errorMessage: "",
    placeholder: "Phone Number",
  },
  {
    fieldName: "dateOfBirth",
    value: "",
    errorMessage: "",
    placeholder: "Date Of Birth",
  },
  {
    fieldName: "educationalInstitution",
    value: "",
    errorMessage: "",
    placeholder: "Educational Institution",
  },
  {
    fieldName: "course/Major",
    value: "",
    errorMessage: "",
    placeholder: "Course/Major",
  },
  {
    fieldName: "yearOfStudy",
    value: "",
    errorMessage: "",
    placeholder: "Year Of Study",
  },
];
