import { useCallback } from "react";
import styled from "styled-components";

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

      new naver.maps.Marker({
        position: myLatLng,
        map: mapInstance,
        icon: {
          content: '<div style="color: #4a90e2;">📍</div>',
          size: new naver.maps.Size(24, 24),
        },
      });
    });
  }, [mapInstance]);

  return <Button onClick={moveToMyLocation}>내 위치로 이동</Button>;
};

const Button = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  padding: 10px 15px;
  background-color: #ffffff;
  color: #4a90e2;
  border: 2px solid #dddddd;
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;

  &:hover {
    background-color: #4a90e2;
    color: #ffffff;
  }
`;
export default LocationButton;
