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
    pixelOffset: new naver.maps.Point(0, 5),
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
      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
        <circle cx="25" cy="25" r="20" fill="#4A90E2" stroke="#fff" stroke-width="3"/>
        <circle cx="25" cy="30" r="18" fill="rgba(0, 0, 0, 0.2)" />
        <circle cx="25" cy="25" r="15" fill="#fff"/>
        <text x="25" y="30" font-family="Arial" font-size="18" fill="#4A90E2" text-anchor="middle" dominant-baseline="middle">P</text>
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
