import { Box } from "@mui/material";
import { landingPageStyles } from "./LandingPageStyles";
import BannerSection from "./bannerSection/BannerSection";
import BrowseMediaSection from "./browseMediaSection/BrowseMediaSection";
import FooterSection from "./footerSection/FooterSection";
import SliderSection from "./sliderSection/SliderSection";
import TestimonialSection from "./testimonialSection/TestimonialSection";

const LandingPage = () => {
  return (
    <Box sx={landingPageStyles.landingPageBackground}>
      <BannerSection />
      <SliderSection />
      <BrowseMediaSection />
      <TestimonialSection />
      <FooterSection />
    </Box>
  );
};

export default LandingPage;
