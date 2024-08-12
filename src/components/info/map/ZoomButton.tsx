import styled from "styled-components";

interface ZoomButtonProps {
  mapInstance: naver.maps.Map | null;
  zoomType: "in" | "out";
}

const ZoomButton = ({ mapInstance, zoomType }: ZoomButtonProps) => {
  const handleZoom = () => {
    if (!mapInstance) return;

    const currentZoom = mapInstance.getZoom();
    const newZoom = zoomType === "in" ? currentZoom + 1 : currentZoom - 1;

    mapInstance.morph(mapInstance.getCenter(), newZoom, {
      duration: 300,
      easing: "easeOutCubic",
    });
  };

  return (
    <Button onClick={handleZoom} bottom={zoomType === "in" ? "80px" : "140px"}>
      {zoomType === "in" ? "+" : "-"}
    </Button>
  );
};
const Button = styled.button<{ bottom: string }>`
  position: absolute;
  right: 20px;
  width: 40px;
  height: 40px;
  background-color: #ffffff;
  color: #4a90e2;
  border: 2px solid #dddddd;
  border-radius: 50%;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background-color: #4a90e2;
    color: #ffffff;
  }

  bottom: ${({ bottom }) => bottom};
`;
export default ZoomButton;
