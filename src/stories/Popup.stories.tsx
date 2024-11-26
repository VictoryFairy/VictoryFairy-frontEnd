import { Meta, StoryFn } from "@storybook/react";
import Popup, { PopupProps } from "@/components/modal/Popup";

export default {
  title: "Components/Common/Popup",
  component: Popup,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "팝업 컴포넌트입니다.",
      },
    },
  },
} as Meta;

const TemplateWithoutPortal: StoryFn<PopupProps> = (args) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}>
      <Popup {...args} />
    </div>
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
