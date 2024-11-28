export type ActiveTab =
  | "Register Request"
  | "Ad Campaigns Request"
  | "Call Back Request"
  | "Financial Request"
  | "Host Ads Request"
  | "Sales Request";
export interface RegisterTitle {
  title: string;
  align: "left" | "right" | "center";
  minWidth: string;
  keyForBodyText?: string;
  maxWidth?: string;
}
export type AdCampaignRequestAction =
  | "ACCEPT"
  | "REJECT"
  | "ASSIGN"
  | "VIEW_DETAILS"
  | null;
