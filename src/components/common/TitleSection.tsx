import styled from "styled-components";
import React from "react";
import { typography } from "../../style/typography";

interface TitleProps {
  title: string;
  subtitle?: string;
}
const TitleSection = ({ title, subtitle }: TitleProps) => {
  return (
    <TitleWrapper>
      <Title>
        {title.split("<br/>").map((line, index) => (
          <React.Fragment key={index}>
            {index > 0 && <br />} {/* 첫 번째 줄 이후에만 <br /> 추가 */}
            {line}
          </React.Fragment>
        ))}
      </Title>
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
    </TitleWrapper>
  );
};
const TitleWrapper = styled.div`
  margin-bottom: 20px;
`;

const Title = styled.h2`
  ${typography.headline}
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  ${typography.body_02}
  color: #666;
`;
export default TitleSection;
