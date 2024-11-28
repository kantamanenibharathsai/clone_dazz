import { Box, Typography } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import sliderImage from "../../assets/sliderImg.svg";
import { SliderSectionData } from "./SliderSectionData";
import { sliderSectionStyles } from "./SliderSectionStyles";
const SliderSection = () => {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <Box sx={sliderSectionStyles.mainContainer}>
      <Slider {...settings}>
        {SliderSectionData.map((eachData) => (
          <Box key={eachData.id} sx={sliderSectionStyles.sliderContainer}>
            <Box sx={sliderSectionStyles.sliderSubContainer}>
              <Box sx={sliderSectionStyles.sliderTextContainer}>
                <Typography sx={sliderSectionStyles.sliderTitletext}>
                  {eachData.title}
                </Typography>
                <Typography sx={sliderSectionStyles.sliderDescriptiontext}>
                  {eachData.description}
                </Typography>
              </Box>
              <Box>
                <Box
                  component={"img"}
                  src={sliderImage}
                  sx={sliderSectionStyles.sliderImgStyle}
                  alt={`Slide ${eachData.id}`}
                />
              </Box>
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default SliderSection;
