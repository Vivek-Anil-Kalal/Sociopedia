import { Box } from "@mui/material";
import ENV from '../../config.js'


const UserImage = ({ image, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={`${ENV.BACKEND_URL}/assets/${image}`}
      />
    </Box>
  );
};

export default UserImage;