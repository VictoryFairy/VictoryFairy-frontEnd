interface ZoomButtonProps {
    mapInstance: naver.maps.Map | null;
    zoomType: "in" | "out";
}
declare const ZoomButton: ({ mapInstance, zoomType }: ZoomButtonProps) => import("react/jsx-runtime").JSX.Element;
export default ZoomButton;
