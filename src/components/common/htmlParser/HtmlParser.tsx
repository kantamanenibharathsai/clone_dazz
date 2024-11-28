import { Box, BoxProps, CircularProgress, Typography } from "@mui/material";
import DOMPurify from "dompurify";
import { memo, useEffect, useState } from "react";
import { endpoints } from "../../../config/config";
import { colors } from "../../../config/theme";
import networkCall from "../../../utils/networkCall";
import { useAppSelector } from "../../../utils/useRedux";
import { HtmlParserContainer, htmlParseStyles } from "./HtmlParserStyles";
export type HtmlParserTitles =
  | "Agreement Document"
  | "Privacy Policy"
  | "Terms & Conditions"
  | "About Us"
  | "";
interface HtmlParserProps {
  title: HtmlParserTitles;
  container?: BoxProps;
}
interface IState {
  data: string;
  loading: boolean;
  errorMessage: string;
}
const SUITABLE_DOC = {
  AboutUs: {
    url: endpoints.GET_ABOUT_US,
    key: "aboutUs",
  },
  PrivacyPolicy: {
    url: endpoints.GET_PRIVACY_POLICY,
    key: "privacyPolicy",
  },
  "Terms&Conditions": {
    url: endpoints.GET_TERMS_AND_CONDITIONS,
    key: "termsAndConditions",
  },
  AgreementDocument: {
    url: endpoints.GET_AGREEMENT_DOCUMENT,
    key: "agreementDocument",
  },
};

const HtmlParser = ({ title, container }: HtmlParserProps) => {
  const [doc, setDoc] = useState<IState>({
    errorMessage: "",
    data: "",
    loading: false,
  });
  const roleId = useAppSelector((state) => state.Auth?.user?.roleId);
  const handleFetchingRelatedDoc = async () => {
    try {
      const value = title.split(" ").join("") as keyof typeof SUITABLE_DOC;
      const url = SUITABLE_DOC?.[value].url;
      const dataKey = SUITABLE_DOC?.[value].key;
      setDoc({ ...doc, loading: true });
      const { response } = await networkCall(
        `${url}/role?roleId=${roleId}`,
        "GET"
      );
      if (response?.statusCode === "200") {
        setDoc({
          data: response.data?.[dataKey] ?? "",
          loading: false,
          errorMessage: "",
        });
      } else if (response?.statusCode === "404") {
        setDoc({
          data: response.data?.[dataKey] ?? "",
          loading: false,
          errorMessage: response.message,
        });
      } else {
        handleApiException();
      }
    } catch (error) {
      handleApiException();
    }
  };
  const handleApiException = () => {
    setDoc({
      ...doc,
      loading: false,
      errorMessage: "Something went wrong try again",
    });
  };
  const cleanHtml = DOMPurify.sanitize(doc.data);
  useEffect(() => {
    handleFetchingRelatedDoc();
    // eslint-disable-next-line
  }, []);
  return (
    <HtmlParserContainer {...container}>
      {doc.loading ? (
        <Box textAlign={"center"}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Typography variant="h2" sx={htmlParseStyles.title}>
            {title}
          </Typography>
          {doc.errorMessage ? (
            <Typography textAlign={"center"} color={colors.validate}>
              {doc.errorMessage}
            </Typography>
          ) : (
            <Box dangerouslySetInnerHTML={{ __html: cleanHtml }} />
          )}
        </>
      )}
    </HtmlParserContainer>
  );
};

export default memo(HtmlParser);
