import { motion } from "framer-motion";
import styled from "styled-components";

const MotionPopup = styled(motion.div)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50vh;
  background-color: white;
  border-radius: 20px 20px 0 0;
  z-index: 1001;
`;

interface PopupProps {
  isOpen: boolean;
  handleClose: () => void;
}

const RankPopup = ({ isOpen, handleClose }: PopupProps) => {
  return (
    <MotionPopup
      initial={{ y: "100%" }}
      animate={{ y: isOpen ? "0%" : "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      drag='y'
      dragConstraints={{ top: 0 }}
      onDragEnd={(e, info) => {
        if (info.point.y > 300) {
          handleClose();
        }
      }}>
      d
    </MotionPopup>
  );
};

export default RankPopup;
