import React from "react";
interface SearchBarProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
    searchTerm: string;
    onSearchChange: (searchTerm: string) => void;
    onSearch: () => void;
}
declare const SearchBar: ({ placeholder, searchTerm, onSearchChange, onSearch, ...inputProps }: SearchBarProps) => import("react/jsx-runtime").JSX.Element;
export default SearchBar;
