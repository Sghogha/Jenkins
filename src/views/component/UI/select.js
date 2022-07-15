import { InputBase, withStyles } from "@material-ui/core";

export const CustomSelectInput = withStyles((theme) => ({
  input: {
    borderRadius: 3,
    position: "relative",
    backgroundColor: "#ffffff",
    color: "#000000",
    border: "1px solid #D4D6D8",
    fontSize: 16,
    padding: "12px 9px",
    "&:hover": {
      borderColor: "#4582c3",
      // border: "1px solid #4582c3",
    },
    "&:focus": {
      border: "2px solid #4582c3",
      borderRadius: 3,
      // borderColor: "#4582c3",
      backgroundColor: "#ffffff",
    },
    "&:Mui-error": {
      border: "1px solid #D84727",
    },
  },
}))(InputBase);
