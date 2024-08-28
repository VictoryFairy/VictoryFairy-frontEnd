import { useEffect, useRef, useCallback, useState } from "react";
import styled from "styled-components";
import { ParkingInfo, Stadium } from "@/types/Stadium";
import LocationButton from "./LocationButton";
import ZoomButton from "./ZoomButton";

interface MapProps {
  selectedStadium: Stadium;
  parkingSpots: Omit<ParkingInfo, "stadium">[];
  selectedParking: Omit<ParkingInfo, "stadium"> | null;
}

const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
`;

const createCustomInfoWindow = (content: string) => {
  const customInfo = new naver.maps.InfoWindow({
    content: `
      <div style="
        background-color: #fff;
        padding: 10px;
        min-width: 150px;
        border-radius: 8px;
        border : 1px solid black;
      
      ">
        ${content}
      </div>
    `,
    backgroundColor: "transparent",
    borderColor: "transparent",
    anchorSize: new naver.maps.Size(0, 0),
    anchorSkew: true,
    pixelOffset: new naver.maps.Point(0, 2),
  });

  return customInfo;
};

const Map = ({ selectedStadium, parkingSpots, selectedParking }: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<naver.maps.Marker[]>([]);
  const [mapInstance, setMapInstance] = useState<naver.maps.Map | null>(null);

  const createMarker = useCallback(
    (spot: any) => {
      if (!mapInstance) return null;

      const markerSvg = `
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="1" y="1" width="40" height="40" rx="20" fill="white"/>
<rect x="1" y="1" width="40" height="40" rx="20" stroke="black" stroke-width="2"/>
<path d="M14 31V11H22.3683C27.2155 11 30 13.8039 30 17.7403C30 21.732 27.1713 24.4807 22.2505 24.4807H18.4199V31H14ZM18.4199 21.1381H21.5433C24.1657 21.1381 25.4475 19.7569 25.4328 17.7403C25.4475 15.7514 24.1657 14.4116 21.5433 14.3978H18.4199V21.1381Z" fill="black"/>
</svg>
    `;

      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(spot.latitude, spot.longitude),
        map: mapInstance,
        icon: {
          content: markerSvg,
          size: new naver.maps.Size(50, 50),
          anchor: new naver.maps.Point(25, 50),
        },
      });

      const infoWindow = createCustomInfoWindow(`
        <h3 style="margin: 0 0 5px; font-size: 15px; color: #333; text-align: center;">${spot.name}</h3>
        <p style="margin: 0; font-size: 10px; color: #333; text-align: center;">${spot.address}</p>
      `);

      naver.maps.Event.addListener(marker, "click", () => {
        if (!mapInstance) return;
        if (infoWindow.getMap()) {
          infoWindow.close();
        } else {
          infoWindow.open(mapInstance, marker);
        }
      });

      return marker;
    },
    [mapInstance],
  );

  useEffect(() => {
    if (!window.naver || !mapRef.current || !selectedStadium) return;

    const mapOptions: naver.maps.MapOptions = {
      center: new window.naver.maps.LatLng(
        selectedStadium.latitude,
        selectedStadium.longitude,
      ),
      zoom: 15,
    };
    const newMapInstance = new window.naver.maps.Map(
      mapRef.current,
      mapOptions,
    );
    setMapInstance(newMapInstance);
  }, [selectedStadium]);

  useEffect(() => {
    if (!mapInstance || !selectedStadium) return;

    const teamLocation = new window.naver.maps.LatLng(
      selectedStadium.latitude,
      selectedStadium.longitude,
    );

    mapInstance.panTo(teamLocation, {
      duration: 500,
      easing: "easeOutCubic",
    });

    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    parkingSpots.forEach((spot) => {
      const marker = createMarker(spot);
      if (marker) markersRef.current.push(marker);
    });
  }, [selectedStadium, parkingSpots, createMarker, mapInstance]);

  useEffect(() => {
    if (!mapInstance || !selectedParking) return;

    const parkingLocation = new window.naver.maps.LatLng(
      selectedParking.latitude,
      selectedParking.longitude,
    );

    mapInstance.panTo(parkingLocation, {
      duration: 500,
      easing: "easeOutCubic",
    });

    const timer2 = setTimeout(() => {
      const selectedMarker = markersRef.current.find((marker) =>
        marker.getPosition().equals(parkingLocation),
      );

      if (selectedMarker) {
        const infoWindow = createCustomInfoWindow(`
          <h3 style="margin: 0 0 5px; font-size: 15px; color: #333; text-align: center;">${selectedParking.name}</h3>
          <p style="margin: 0; font-size: 10px; color: #333; text-align: center;">${selectedParking.address}</p>
        `);

        infoWindow.open(mapInstance, selectedMarker);
      }
    }, 300);

    return () => {
      clearTimeout(timer2);
    };
  }, [selectedParking, mapInstance]);

  return (
    <MapContainer>
      <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
      <LocationButton mapInstance={mapInstance} />
      <ZoomButton mapInstance={mapInstance} zoomType='in' />
      <ZoomButton mapInstance={mapInstance} zoomType='out' />
    </MapContainer>
  );
};

export default Map;
