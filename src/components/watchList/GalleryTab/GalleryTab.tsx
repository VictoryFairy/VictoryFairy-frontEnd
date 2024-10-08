import styled from "styled-components";
import { MyGame } from "@/types/Game";
import Text from "@/components/common/Text";
import Icon from "@/components/common/Icon";

interface GalleryTabProps {
  data?: MyGame[];
  onClick: (match: MyGame) => void;
  children: React.ReactNode;
}

const GalleryTab = ({ data, onClick, children }: GalleryTabProps) => {
  return (
    <GalleryTabContainer>
      {children}
      <ImgContainer>
        {data?.map((item) => (
          <div className='img' key={item.id}>
            {item.image ? (
              <img onClick={() => onClick(item)} src={item.image} alt='game' />
            ) : (
              <div
                className='stadium-info'
                role='button'
                tabIndex={0}
                onClick={() => onClick(item)}>
                <Text variant='caption'>
                  <Icon icon='IcLocation' width={15} height={15} />
                  {item.game.stadium.name} 야구장
                </Text>
                <Text variant='title_02'>{item.game.date}</Text>
              </div>
            )}
          </div>
        ))}
      </ImgContainer>
    </GalleryTabContainer>
  );
};
const GalleryTabContainer = styled.div``;

const ImgContainer = styled.div`
  display: grid;
  cursor: pointer;
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
  .stadium-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 125px;
    gap: 8px;
    background-color: var(--gray-50);
  }
`;

export default GalleryTab;
