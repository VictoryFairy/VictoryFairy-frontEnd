import { Meta, StoryFn } from "@storybook/react";
import Popup, { PopupProps } from "@/components/modal/Popup";
import { ThemeContextProvider } from "@/context/ThemeContext";

export default {
  title: "Components/Common/Popup",
  component: Popup,
} as Meta;

const TemplateWithoutPortal: StoryFn<PopupProps> = (args) => {
  return (
    <ThemeContextProvider>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}>
        <Popup {...args} />
      </div>
    </ThemeContextProvider>
  );
};

export const Default = TemplateWithoutPortal.bind({});
Default.args = {
  title: "팝업 제목",
  message: "팝업 메시지",
  buttons: [
    { label: "취소", variant: "cancel" },
    { label: "확인", variant: "confirm" },
  ],
};
