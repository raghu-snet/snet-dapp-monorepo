import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import StyledTextField from "shared/dist/components/StyledTextField";
import { hqAddressFormData } from "./content";

const HQAddress = props => {
  const { hqAddress, handlehqAddressChange } = props;

  return (
    <Grid item sx={12} sm={12} md={6} lg={6}>
      <Typography variant="h6">Headquarters Address</Typography>
      <StyledTextField
        {...hqAddressFormData.STREET}
        variant="outlined"
        value={hqAddress.STREET}
        onChange={handlehqAddressChange}
        fullWidth
      />
      <StyledTextField
        {...hqAddressFormData.APARTMENT}
        variant="outlined"
        value={hqAddress.APARTMENT}
        onChange={handlehqAddressChange}
        fullWidth
      />
      <StyledTextField
        {...hqAddressFormData.CITY}
        variant="outlined"
        value={hqAddress.CITY}
        onChange={handlehqAddressChange}
        fullWidth
      />
      <Grid container>
        <Grid item sx={12} sm={12} md={4} lg={4}>
          <StyledTextField
            {...hqAddressFormData.ZIP}
            variant="outlined"
            value={hqAddress.ZIP}
            onChange={handlehqAddressChange}
            fullWidth
          />
        </Grid>
        <Grid item sx={12} sm={12} md={8} lg={8}>
          <StyledTextField
            {...hqAddressFormData.COUNTRY}
            variant="outlined"
            value={hqAddress.COUNTRY}
            onChange={handlehqAddressChange}
            fullWidth
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

HQAddress.propTypes = {
  hqAddress: PropTypes.shape({
    street: PropTypes.string,
    apartment: PropTypes.string,
    city: PropTypes.string,
    zip: PropTypes.string,
    country: PropTypes.string,
  }),
  handlehqAddressChange: PropTypes.func,
};

export default HQAddress;
