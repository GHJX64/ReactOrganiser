import React, { useState } from "react";
import { Card, Grid } from "@mui/material";
import { useStyle } from "./DashboardStyles";

const DashboardItem = (props) => {
  const classes = useStyle();

  const title = () => {
    return <>Title</>;
  };

  const label = () => {
    return <>Label</>;
  };

  const details = () => {
    return <>Details</>;
  };

  const dateTime = () => {
    return <>Date</>;
  };
  const buttons = () => {
    return <>Buttons</>;
  };
  return (
    <Card>
      <Grid container></Grid>
    </Card>
  );
};

export default DashboardItem;
