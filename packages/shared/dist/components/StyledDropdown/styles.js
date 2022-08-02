"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useStyles = void 0;

var _styles = require("@material-ui/styles");

var useStyles = (0, _styles.makeStyles)(function (MUITheme) {
  return {
    infoIcon: {
      padding: "5px 10px 0 0",
      fontSize: 20,
      color: "#d6d6d6"
    },
    formControl: {
      width: 364,
      paddingLeft: 23,
      "& label": {
        padding: "0 20px 0 10px",
        left: 20,
        background: "#fff",
        color: MUITheme.palette.text.darkGrey,
        fontSize: 12,
        letterSpacing: 0.4,
        transform: "translate(14px, -6px) scale(0.90)".concat(" !important")
      },
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: MUITheme.palette.border.inputBorder
      }
    },
    selectEmpty: {
      color: "".concat(MUITheme.palette.text.darkGrey, " !important"),
      "& .MuiSelect-root": {
        padding: "15.5px 15px !important",
        fontSize: 16,
        letterSpacing: 0.15,
        lineHeight: "24px"
      },
      "&:before": {
        display: "none"
      },
      "& select": {
        "&:hover": {
          backgroundColor: "rgba(0,90,203,0.05)"
        }
      },
      "& .MuiSelect-select": {
        "&:focus": {
          backgroundColor: "transparent"
        }
      }
    },
    defaultMenuItem: {
      color: MUITheme.palette.text.lightGrey,
      fontSize: 16,
      letterSpacing: 0.5,
      lineHeight: "28px"
    },
    menuItem: {
      color: MUITheme.palette.text.darkGrey,
      fontSize: 16,
      letterSpacing: 0.5,
      lineHeight: "28px",
      "&:hover": {
        background: MUITheme.palette.background.mainContent,
        color: MUITheme.palette.primary.main
      }
    }
  };
});
exports.useStyles = useStyles;