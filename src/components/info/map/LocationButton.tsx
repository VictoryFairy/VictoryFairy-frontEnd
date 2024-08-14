import { useCallback } from "react";
import styled from "styled-components";
import Icon from "../../common/Icon";

interface LocationButtonProps {
  mapInstance: naver.maps.Map | null;
}

const LocationButton = ({ mapInstance }: LocationButtonProps) => {
  const moveToMyLocation = useCallback(() => {
    if (!mapInstance || !navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      const myLatLng = new naver.maps.LatLng(latitude, longitude);

      mapInstance.panTo(myLatLng, {
        duration: 500,
        easing: "easeOutCubic",
      });

      const markerSvg = `
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="#4A90E2" fill-opacity="0.2"/>
        <circle cx="20" cy="20" r="8" fill="#4A90E2"/>
        <circle cx="20" cy="20" r="4" fill="white"/>
      </svg>
    `;
      new naver.maps.Marker({
        position: myLatLng,
        map: mapInstance,
        icon: {
          content: markerSvg,
          size: new naver.maps.Size(24, 24),
        },
      });
    });
  }, [mapInstance]);

  return (
    <Button onClick={moveToMyLocation}>
      <Icon icon='IcLocation' />
    </Button>
  );
};

const Button = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  padding: 5px 10px;
  background-color: #ffffff;
  border: 2px solid #dddddd;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
`;
export default LocationButton;
