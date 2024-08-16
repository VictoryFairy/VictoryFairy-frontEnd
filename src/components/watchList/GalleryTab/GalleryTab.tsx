import styled from "styled-components";
import { MyGame } from "@/types/Game";
import MonthNav from "@/components/common/MonthNav";

interface GalleryTabProps {
  data?: MyGame[];
}

const GalleryTab = ({ data }: GalleryTabProps) => {
  return (
    <GalleryTabContainer>
      <MonthNav />
      <ImgContainer>
        {data?.map((item) => (
          <div className='img' key={item.id}>
            <img src={item.image} alt='game' />
          </div>
        ))}
      </ImgContainer>
    </GalleryTabContainer>
  );
};
const GalleryTabContainer = styled.div``;

const ImgContainer = styled.div`
  display: grid;
  //3x3
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;

  .img {
    height: 125px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

export default GalleryTab;
