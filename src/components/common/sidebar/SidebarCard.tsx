import { Avatar, Box, Typography } from "@mui/material";
import { styles } from "./SidebarStyles";
import {
  availableLicenseIcon,
  availableSpaceIcon,
  licenseExpiringIcon,
  sideBarCardWalletIcon,
} from "./assets/assets";

interface ISidebarCard {
  wallet: number;
}
const SidebarCard: React.FC<ISidebarCard> = ({ wallet }) => {
  return (
    <Box sx={styles.sideBarCardMainContainer}>
      <Box sx={styles.sideBarCardAvatarContainer}>
        <Avatar sx={styles.sideBarCardAvatar}>
          <Box component="img" src={sideBarCardWalletIcon} />
        </Avatar>
        <Box flexGrow={1}>
          <Typography
            variant="body1"
            color="initial"
            sx={styles.sideBarCardTitle}
          >
            My Wallet
          </Typography>
          <Typography
            variant="body1"
            color="initial"
            sx={styles.sideBarCardSubTitle}
            title={wallet.toLocaleString()}
          >
            &#8377; {wallet.toLocaleString()}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const SidebarCardForAdmin = () => {
  return (
    <Box sx={styles.sideBarCardMainContainer}>
      <Box sx={styles.sideBarCardAvatarContainer}>
        <Avatar sx={styles.sideBarCardAvatar}>
          <Box component="img" src={availableSpaceIcon} />
        </Avatar>
        <Box>
          <Typography
            variant="body1"
            color="initial"
            sx={styles.sideBarCardTitle}
          >
            Storage Used
          </Typography>
          <Typography
            variant="body1"
            color="initial"
            sx={styles.sideBarCardSubTitle}
          >
            300.00 MB
          </Typography>
        </Box>
      </Box>
      <Box sx={styles.sideBarCardAvatarContainer}>
        <Avatar sx={styles.sideBarCardAvatar}>
          <Box component="img" src={availableLicenseIcon} />
        </Avatar>
        <Box>
          <Typography
            variant="body1"
            color="initial"
            sx={styles.sideBarCardTitle}
          >
            Available Licenses
          </Typography>
          <Typography
            variant="body1"
            color="initial"
            sx={styles.sideBarCardSubTitle}
          >
            0
          </Typography>
        </Box>
      </Box>
      <Box sx={styles.sideBarCardAvatarContainer}>
        <Avatar sx={styles.sideBarCardAvatar}>
          <Box component="img" src={licenseExpiringIcon} />
        </Avatar>
        <Box>
          <Typography
            variant="body1"
            color="initial"
            sx={styles.sideBarCardTitle}
          >
            Licenses Expiring Soon
          </Typography>
          <Typography
            variant="body1"
            color="initial"
            sx={styles.sideBarCardSubTitle}
          >
            0
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export { SidebarCard, SidebarCardForAdmin };
