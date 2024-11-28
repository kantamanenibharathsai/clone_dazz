import { Box } from "@mui/material";
import HtmlParser, {
  HtmlParserTitles,
} from "../../../common/htmlParser/HtmlParser";

interface IProps {
  heading: HtmlParserTitles;
}
const Document = ({ heading }: IProps) => {
  return (
    <Box>
      <HtmlParser title={heading} />
    </Box>
  );
};

export default Document;
