import { translate } from "../../../../config/i18n";
import aboutUsImg from "../../assets/aboutUsImg.png";
import agreementImg from "../../assets/agreementImg.png";
import privacyPolicyImg from "../../assets/privacyPolicyImg.png";
import securityImg from "../../assets/securityImg.png";
import termsAndConditionsImg from "../../assets/termsAndConditionsImg.png";
export const settingsScreensData = [
  {
    id: 1,
    icon: agreementImg,
    title: translate("adAgency.agreementDocument"),
  },
  {
    id: 2,
    icon: securityImg,
    title: translate("adAgency.loginAndSecurity"),
  },
  {
    id: 3,
    icon: privacyPolicyImg,
    title: translate("adAgency.privacyPolicy"),
  },
  {
    id: 4,
    icon: termsAndConditionsImg,
    title: translate("adAgency.termsAndConditions"),
  },
  {
    id: 5,
    icon: aboutUsImg,
    title: translate("adAgency.aboutUs"),
  },
];
