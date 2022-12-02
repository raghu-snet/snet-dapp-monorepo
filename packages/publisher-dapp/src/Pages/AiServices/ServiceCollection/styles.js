export const useStyles = () => ({
  serviceCollection: { marginTop: 33 },
  searchBar: {
    width: "100%",
    padding: "0 0 5px",
    border: "none",
    borderBottom: "1px solid rgba(155,155,155,0.9)",
    marginBottom: 15,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    background: "transparent",
    "& > span": {
      paddingTop: 1,
      color: "#999",
      fontSize: 17,
      "&:first-of-type": { marginRight: 5 },
      "&:last-of-type": { cursor: "pointer" },
    },
    "& input": { fontSize: 17 },
    "& svg": {
      color: "#999",
      cursor: "pointer",
      fontSize: 18,
    },
  },
});
