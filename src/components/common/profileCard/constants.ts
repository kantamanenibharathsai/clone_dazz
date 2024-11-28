export type ISettingsData = {
  id: number;
  description: string;
  icon: string;
};
export type IData = {
  id: number;
  name: string;
  label: string;
  isSelect: boolean;
};

export type User = {
  name: string;
  email: string;
  organization: string | null;
  phone: string;
  commission:string | null;
  commissionValue:string|null
  twoStepVerification:boolean;
  [key: string]: string |null |boolean ;
};

export const sampleTabsData = ["Profile", "Logs", "Settings"];
export const textFieldData: IData[] = [
  {
    id: 1,
    name: "name",
    label: "Name",
    isSelect: false,
  },
  {
    id: 2,
    name: "organization",
    label: "Organization Name",
    isSelect: false,
  },
  {
    id: 3,
    name: "email",
    label: "Email",
    isSelect: false,
  },
  {
    id: 4,
    name: "phone",
    label: "Phone",
    isSelect: false,
  },
  
];

export const textFieldCommission: IData[] = [
  {
    id: 1,
    name: "name",
    label: "Name",
    isSelect: false,
  },
  {
    id: 2,
    name: "organization",
    label: "Organization Name",
    isSelect: false,
  },
  {
    id: 3,
    name: "email",
    label: "Email",
    isSelect: false,
  },
  {
    id: 4,
    name: "phone",
    label: "Phone",
    isSelect: false,
  },
  {
    id: 5,
    name: "commission",
    label: "Commission",
    isSelect: true,
  },
  {
    id: 6,
    name: "commissionValue",
    label: "Commission Value",
    isSelect: false,
  },
];