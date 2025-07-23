import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "@/assets/images/logo.png";

const Logo = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return <LogoWrapper alt='승리요정' src={logo} onClick={goHome} />;
};

const LogoWrapper = styled.img`
  width: 164px;
  height: 48px;
`;

export default Logo;
