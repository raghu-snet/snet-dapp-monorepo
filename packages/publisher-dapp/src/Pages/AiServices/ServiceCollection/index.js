import React, { useState } from "react";
import { withStyles } from "@material-ui/styles";
import StyledPaginationPublisher from "../../../Components/StyledPagination";
import CardGroup from "./CardGroup";
import SearchInputToggler from "./SearcjInputToggler";
import { useStyles } from "./styles";

const ServiceCollection = ({
  classes,
  pagination,
  totalCount,
  handlePageChangePublisher,
  handleSearchChange,
  currentPagination,
}) => {
  const [showSearchInput, toggleSearchInput] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  // const [clearSearch, setClearSearch] = useState(false);

  const handleSearch = event => {
    setSearchKeyword(event.currentTarget.value);
    const pagination = {
      offset: 0,
      q: event.target.value,
    };
    handleSearchChange({ ...currentPagination, ...pagination });
  };

  const handleClearSearch = () => {
    setSearchKeyword("");
  };

  return (
    <div className={classes.serviceCollection}>
      <button className={classes.searchBar}>
        <span>Search:</span>
        <SearchInputToggler
          showSearchInput={showSearchInput}
          toggleSearchInput={toggleSearchInput}
          handleSearch={handleSearch}
          searchKeyword={searchKeyword}
          handleClearSearch={handleClearSearch}
          handleSearchChange={handleSearchChange}
          currentPagination={currentPagination}
          pagination={pagination}
        />
      </button>
      <CardGroup />
      <StyledPaginationPublisher
        limit={pagination.limit}
        offset={pagination.offset}
        total_count={totalCount}
        handleChange={handlePageChangePublisher}
      />
    </div>
  );
};
export default withStyles(useStyles)(ServiceCollection);
