import { translate } from "../../../../config/i18n";
import cinemaImg from "../../assets/cinema.svg";
import digitalImg from "../../assets/digital.svg";
import influencerImg from "../../assets/influencere.svg";
import magazineImg from "../../assets/magazine.svg";
import newsPaperImg from "../../assets/newspaper.svg";
import sportsImg from "../../assets/sports.svg";

export const browseMediaData = [
  {
    id: 1,
    genreText: translate("common.cinema"),
    genreImg: cinemaImg,
  },
  {
    id: 2,
    genreText: translate("common.digital"),
    genreImg: digitalImg,
  },
  {
    id: 3,
    genreText: translate("common.influencer"),
    genreImg: influencerImg,
  },
  {
    id: 4,
    genreText:translate("common.magazine"),
    genreImg: magazineImg,
  },
  {
    id: 5,
    genreText: translate("common.newsPaper"),
    genreImg: newsPaperImg,
  },
  {
    id: 6,
    genreText: translate("common.sports"),
    genreImg: sportsImg,
  },
];
