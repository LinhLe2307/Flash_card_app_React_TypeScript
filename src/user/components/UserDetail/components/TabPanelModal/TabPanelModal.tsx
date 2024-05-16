import React from "react"
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import "./TabPanelModal.css"

interface TabPanelModalProps {
    projectsTypes: string[]
    value: number
    setValue: (value: number) => void
    fullName: string
    image: string
    children: React.ReactNode
}

interface TabPanelProps {
  children: React.ReactNode 
  value: number 
  index: number
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ paddingTop: "1rem", fontFamily: "inherit"}}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const TabPanelModal = ({ projectsTypes, value, setValue, fullName, image, children }: TabPanelModalProps) => {

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(event);
    setValue(newValue);
  };

  return (
    <div id="projects">
      <div className="image-upload__preview tab-panel-user-center">
        <img src={image}/>
      </div>
      <Typography
        variant="h4"
        component="div"
        sx={{
          flexGrow: 1,
          display: { sm: "block" },
          fontFamily: '"Raleway", sans-serif',
          textAlign: "center",
          marginBottom: "1rem",
        }}
      >
       {fullName} 
      </Typography>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider"
        }}
      >
        <Tabs
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {projectsTypes.map((projectsType, index) => (
            <Tab
              label={`${projectsType}`}
              {...a11yProps(index)}
              key={index}
              sx={{
                fontFamily: '"Raleway", sans-serif',
                textTransform: "none",
                fontSize: "1rem",
              }}
            />
          ))}
        </Tabs>
      </Box>
      <TabPanel value={value} index={value}>
        <Box
          sx={{
            flexGrow: 1,
            paddingLeft: "1rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            spacing="1.5rem"
            columns={{ xs: 4, sm: 8, md: 12 }}
            sx={{
              maxWidth: "1552px",
              fontFamily: '"Raleway", sans-serif'
            }}
          >
            {
              children
            }
          </Grid>
        </Box>
      </TabPanel>
    </div>
  );
};

export default TabPanelModal;
