import { Meta, StoryFn } from "@storybook/react";
import SearchBar, { SearchBarProps } from "@/components/common/SearchBar";

export default {
  title: "Components/Common/SearchBar",
  component: SearchBar,
} as Meta;

const Template: StoryFn<SearchBarProps> = (args) => <SearchBar {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: "Search...",
  searchTerm: "",
  onSearchChange: (searchTerm: string) =>
    console.log("Search term changed:", searchTerm),
  onSearch: () => console.log("Search initiated"),
};
