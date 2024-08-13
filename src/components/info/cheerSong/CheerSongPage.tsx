import { useState } from "react";
import SearchBar from "../../common/SearchBar";

const CheerSongPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
  };

  const handleSearch = () => {
    console.log(searchTerm);
  };
  return (
    <div>
      <SearchBar
        placeholder='제목, 가사를 입력해주세요.'
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onSearch={handleSearch}
      />
    </div>
  );
};

export default CheerSongPage;
