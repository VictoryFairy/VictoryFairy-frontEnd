import { Meta, StoryFn } from "@storybook/react";
import Loading from "@/components/common/Loading";

export default {
  title: "Components/Common/Loading",
  component: Loading,
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}>
        <Story />
      </div>
    ),
  ],
} as Meta;

const Template: StoryFn = (args) => <Loading {...args} />;

export const Default = Template.bind({});
Default.args = {};
