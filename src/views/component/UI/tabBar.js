import { AppBar, Tab, Tabs, Box, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "transparent",
    boxShadow: "none",
    color: "#ffffff",
    "& .MuiTabs-root": {
      minHeight: "35px",
      borderBottom: "1px solid #2c2f34",
    },
    "& .MuiTab-root": {
      fontFamily: "Space Mono",
      borderRight: "1px solid #ffffff",
      textTransform: "capitalize",
      fontSize: "16px",
      lineHeight: "21.33px",
      letterSpacing: "-0.4px",
      opacity: 1,
      minWidth: "146px",
      minHeight: "auto",
      padding: "0 0 1.68px 0",
      fontWeight: 400,
    },
    "& .MuiTab-root:last-child": {
      borderRight: 0,
    },
    "& .MuiTabs-indicator": {
      height: "3px",
      backgroundColor: "#40BFC5",
    },
  },
}));

const a11yProps = (index) => {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
};

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};
const TabBars = ({ tabs, handleChange, value }) => {
  const classes = useStyles();
  // const [value, setValue] = useState(0);

  // const handleChange = (e, newValue) => {
  //   setValue(newValue);
  // };
  return (
    <div>
      <AppBar position="static" color="default" className={classes.root}>
        <Tabs
          variant="scrollable"
          scrollButtons="auto"
          value={value}
          onChange={handleChange}
        >
          {tabs?.map((item, i) => (
            <Tab key={i} label={item?.label} {...a11yProps(i)} />
          ))}
        </Tabs>
      </AppBar>
      <Box>
        {tabs?.map((item, i) => (
          <TabPanel key={i} value={value} index={i}>
            {item?.content}
          </TabPanel>
        ))}
      </Box>
    </div>
  );
};

export default TabBars;
