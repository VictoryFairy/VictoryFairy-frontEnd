import { useCallback, useState } from "react";
import styled, { keyframes } from "styled-components";
import Icon from "@/components/common/Icon";

interface LocationButtonProps {
  mapInstance: naver.maps.Map | null;
}

const LocationButton = ({ mapInstance }: LocationButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const moveToMyLocation = useCallback(() => {
    if (!mapInstance || !navigator.geolocation) return;

    setIsLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
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

        setIsLoading(false);
      },
      () => {
        setIsLoading(false);
        alert(
          "위치를 가져올 수 없습니다. 위치 서비스를 활성화했는지 확인하세요.",
        );
      },
    );
  }, [mapInstance]);

  return (
    <Button onClick={moveToMyLocation} disabled={isLoading}>
      {isLoading ? <Spinner /> : <Icon icon='IcCurrentLocation' />}
    </Button>
  );
};

const Button = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 35px;
  height: 35px;
  padding: 5px;
  background-color: #ffffff;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  width: 20px;
  height: 20px;
  border: 3px solid #ddd;
  border-top: 3px solid #4a90e2;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

export default LocationButton;
