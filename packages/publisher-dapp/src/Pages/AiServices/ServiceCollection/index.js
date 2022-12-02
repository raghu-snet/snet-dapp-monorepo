import React, { useState } from "react";
import { withStyles } from "@material-ui/styles";
import StyledPaginationPublisher from "../../../Components/StyledPagination";
import CardGroup from "./CardGroup";
import SearchInputToggler from "./SearcjInputToggler";
import { useStyles } from "./styles";

const ServiceCollection = ({ classes, pagination, totalCount, handlePageChangePublisher }) => {
  const [showSearchInput, toggleSearchInput] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSearch = event => {
    setSearchKeyword(event.currentTarget.value);
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
