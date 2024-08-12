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
    <Button onClick={handleZoom} zoomType={zoomType}>
      {zoomType === "in" ? "+" : "−"}
    </Button>
  );
};

const Button = styled.button<{ zoomType: "in" | "out" }>`
  position: absolute;
  right: 20px;
  top: ${({ zoomType }) => (zoomType === "in" ? "10px" : "55px")};
  width: 30px;
  height: 30px;
  background-color: #ffffff;

  border: 1px solid #dddddd;
  border-radius: 4px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  font-size: 24px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f0f8ff;
  }

  &:active {
    background-color: #e6f3ff;
    transform: translateY(1px);
  }

  ${({ zoomType }) =>
    zoomType === "out" &&
    `
    border-top: none;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  `}

  ${({ zoomType }) =>
    zoomType === "in" &&
    `
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  `}
`;

export default ZoomButton;