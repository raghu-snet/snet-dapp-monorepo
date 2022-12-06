import React from "react";
import Input from "@material-ui/core/Input";
import Icon from "@material-ui/core/Icon";
import CloseIcon from "@material-ui/icons/Close";
import clsx from "clsx";
import { useStyles } from "./styles";

const SearchInputToggler = ({
  showSearchInput,
  toggleSearchInput,
  handleSearch,
  searchKeyword,
  handleClearSearch,
  handleSearchChange,
  currentPagination,
  pagination,
}) => {
  const classes = useStyles();

  const handleBlur = () => {
    if (searchKeyword !== "") {
      return;
    }
    toggleSearchInput(false);
  };

  const handleCloseSearch = () => {
    toggleSearchInput(false);
    const pagination = {
      offset: 0,
      q: "",
    };
    handleSearchChange({ ...currentPagination, ...pagination });
    handleClearSearch();
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
