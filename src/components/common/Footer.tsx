import styled from "styled-components";

const Footer = () => {
  return <FooterContainer>bottom</FooterContainer>;
};

const FooterContainer = styled.div`
  height: 64px;
  position: fixed;
  bottom: 0;
  max-width: 480px;
  width: 100%;
`;

// const IconWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
// `;

export default Footer;
