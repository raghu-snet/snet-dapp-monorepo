import React from "react";
import Input from "@material-ui/core/Input";
import Icon from "@material-ui/core/Icon";
import CloseIcon from "@material-ui/icons/Close";
import clsx from "clsx";
import { useStyles } from "./styles";

const SearchInputToggler = ({ showSearchInput, toggleSearchInput, handleSearch, searchKeyword }) => {
  const classes = useStyles();

  const handleBlur = () => {
    if (searchKeyword !== "") {
      return;
    }
    toggleSearchInput(false);
  };

  const handleCloseSearch = () => {
    console.log("Search cleared");
  };

  if (showSearchInput) {
    return (
      <>
        <Input onBlur={handleBlur} autoFocus onChange={handleSearch} value={searchKeyword} />
        <CloseIcon className={classes.closeIcon} onClick={handleCloseSearch} />
      </>
    );
  }
  return <Icon className={clsx(classes.icon, "fa fa-search")} onClick={() => toggleSearchInput(true)} />;
};

export default SearchInputToggler;
