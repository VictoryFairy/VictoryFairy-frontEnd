import { useState } from "react";
import styled from "styled-components";
import search from "../assets/Icons/search.svg";

const Info = () => {
  const [activeTab, setActiveTab] = useState<"info" | "cheer">("info");

  const handleTabChange = (tab: "info" | "cheer") => {
    setActiveTab(tab);
  };

  return (
    <Container>
      <Tabs>
        <TabButton
          active={activeTab === "info"}
          onClick={() => handleTabChange("info")}>
          주차정보
        </TabButton>
        <TabButton
          active={activeTab === "cheer"}
          onClick={() => handleTabChange("cheer")}>
          응원가
        </TabButton>
      </Tabs>
      <SearchBar>
        <SearchInput placeholder='구장명 , 팀명을 검색해보세요.' />
        <SearchIcon src={search} />
      </SearchBar>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const Tabs = styled.div`
  display: flex;
  gap: 20px;
`;

const TabButton = styled.button<{ active: boolean }>`
  padding: 15px 0;
  border: none;
  background: transparent;
  color: ${({ active }) => (active ? "#000" : "#888")};
  font-size: 18px;
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  cursor: pointer;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;

  padding: 10px;
  background-color: #f8f8f8;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: 14px;
`;

const SearchIcon = styled.img`
  color: #888;
  cursor: pointer;
`;

export default Info;
