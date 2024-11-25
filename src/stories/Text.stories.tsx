import { Meta, StoryFn } from "@storybook/react";
import Text, { TextProps } from "@/components/common/Text";

export default {
  title: "Components/Common/Text",
  component: Text,
} as Meta;

const Template: StoryFn<TextProps> = (args) => <Text {...args} />;

export const Display = Template.bind({});
Display.args = {
  children: "This is a display text",
  variant: "display",
  color: "black",
};

export const Headline = Template.bind({});
Headline.args = {
  children: "This is a headline text",
  variant: "headline",
  color: "black",
};

export const Title02 = Template.bind({});
Title02.args = {
  children: "This is a title 02 text",
  variant: "title_02",
  color: "black",
};

export const Title01 = Template.bind({});
Title01.args = {
  children: "This is a title 01 text",
  variant: "title_01",
  color: "black",
};

export const Subtitle03 = Template.bind({});
Subtitle03.args = {
  children: "This is a subtitle 03 text",
  variant: "subtitle_03",
  color: "black",
};

export const Subtitle02 = Template.bind({});
Subtitle02.args = {
  children: "This is a subtitle 02 text",
  variant: "subtitle_02",
  color: "black",
};

export const Subtitle01 = Template.bind({});
Subtitle01.args = {
  children: "This is a subtitle 01 text",
  variant: "subtitle_01",
  color: "black",
};

export const Body02 = Template.bind({});
Body02.args = {
  children: "This is a body 02 text",
  variant: "body_02",
  color: "black",
};

export const BodyLong02 = Template.bind({});
BodyLong02.args = {
  children: "This is a body long 02 text",
  variant: "body_long_02",
  color: "black",
};

export const Body01 = Template.bind({});
Body01.args = {
  children: "This is a body 01 text",
  variant: "body_01",
  color: "black",
};

export const BodyLong01 = Template.bind({});
BodyLong01.args = {
  children: "This is a body long 01 text",
  variant: "body_long_01",
  color: "black",
};

export const Caption = Template.bind({});
Caption.args = {
  children: "This is a caption text",
  variant: "caption",
  color: "black",
};

export const CaptionLong = Template.bind({});
CaptionLong.args = {
  children: "This is a caption long text",
  variant: "caption_long",
  color: "black",
};
