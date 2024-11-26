import ReactDOM from "react-dom";

interface ModalPortalProps {
  children: React.ReactNode;
}

const ModalPortal = ({ children }: ModalPortalProps) => {
  if (import.meta.env.VITE_STORYBOOK) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>;
  }

  // 실제 앱에서는 포탈을 사용
  const el = document.getElementById("root") as HTMLElement;
  return ReactDOM.createPortal(children, el);
};

export default ModalPortal;
