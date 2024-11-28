interface RegisterTitle {
  title: string;
  align: "left" | "right" | "center";
  minWidth: string;
}
export type UserRole = "USER" | "INVESTOR" | "HOST" | "AGENCY" | "VENDER";
export interface EachFieldType {
  fieldName: string;
  fieldPlaceholder: string;
  fieldNameInForm: string;
}

export const othersTitles: RegisterTitle[] = [
  { title: "Member Name", align: "left", minWidth: "100px" },
  { title: "Member Email", align: "left", minWidth: "100px" },
  { title: "Phone No.", align: "center", minWidth: "100px" },
  { title: "Screens", align: "center", minWidth: "100px" },
  { title: "Created", align: "center", minWidth: "100px" },
  { title: "Action", align: "center", minWidth: "100px" },
];
export const vendorsTitles: RegisterTitle[] = [
  { title: "Member Name", align: "left", minWidth: "100px" },
  { title: "Member Email", align: "left", minWidth: "100px" },
  { title: "Phone No.", align: "center", minWidth: "100px" },
  { title: "Vendor Id", align: "center", minWidth: "100px" },
  { title: "Action", align: "center", minWidth: "100px" },
];
export const othersInitialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNo: "",
  commissionType: "NONE",
  commissionValue: "",
  investedAmount: "",
};

export const clientsInitialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNo: "",
};
export const clientFieldDetails = [
  {
    fieldName: "First Name",
    fieldPlaceholder: "Enter First Name",
    fieldNameInForm: "firstName",
  },
  {
    fieldName: "Last Name",
    fieldPlaceholder: "Enter Last Name",
    fieldNameInForm: "lastName",
  },
  {
    fieldName: "Email",
    fieldPlaceholder: "Enter Email",
    fieldNameInForm: "email",
  },
  {
    fieldName: "Phone No",
    fieldPlaceholder: "Enter Phone No",
    fieldNameInForm: "phoneNo",
  },
];
export const investorFieldDetails = [
  ...clientFieldDetails,
  {
    fieldName: "Choose Screen Group",
    fieldPlaceholder: "Select Screen Group",
    fieldNameInForm: "screenGroupIds",
  },
  {
    fieldName: "Choose Screens",
    fieldPlaceholder: "Select Screens",
    fieldNameInForm: "screenIds",
  },
  {
    fieldName: "Invested Amount",
    fieldPlaceholder: "Enter Amount",
    fieldNameInForm: "investedAmount",
  },
  {
    fieldName: "Commission Type",
    fieldPlaceholder: "Select Commission Type",
    fieldNameInForm: "commissionType",
  },
  {
    fieldName: "Commission Value",
    fieldPlaceholder: "Enter Commission Value",
    fieldNameInForm: "commissionValue",
  },
];
export const hostFieldDetails = [
  ...clientFieldDetails,
  {
    fieldName: "Choose Screen Group",
    fieldPlaceholder: "Select Screen Group",
    fieldNameInForm: "screenGroupIds",
  },
  {
    fieldName: "Choose Screens",
    fieldPlaceholder: "Select Screens",
    fieldNameInForm: "screenIds",
  },
  {
    fieldName: "Commission Type",
    fieldPlaceholder: "Select Commission Type",
    fieldNameInForm: "commissionType",
  },
  {
    fieldName: "Commission Value",
    fieldPlaceholder: "Enter Commission Value",
    fieldNameInForm: "commissionValue",
  },
];
export const adAgencyFieldDetails = [
  ...clientFieldDetails,
  {
    fieldName: "Commission Type",
    fieldPlaceholder: "Select Commission Type",
    fieldNameInForm: "commissionType",
  },
  {
    fieldName: "Commission Value",
    fieldPlaceholder: "Enter Commission Value",
    fieldNameInForm: "commissionValue",
  },
];
export const vendorFieldDetails = [
  ...clientFieldDetails,
  {
    fieldName: "Commission Type",
    fieldPlaceholder: "Select Commission Type",
    fieldNameInForm: "commissionType",
  },
  {
    fieldName: "Commission Value",
    fieldPlaceholder: "Enter Commission Value",
    fieldNameInForm: "commissionValue",
  },
];
