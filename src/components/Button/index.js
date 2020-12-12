import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  margin: {
    "margin-left": theme.spacing(3),
    "margin-right": theme.spacing(3),
    width: theme.spacing(25),
  },
}));

export default function CustomizedButton({
  funcChangePage,
  isDisabled,
  step,
  children,
}) {
  const classes = useStyles();

  return (
    <Button
      variant="contained"
      color="primary"
      className={classes.margin}
      // when user clicked the button, this code execute function "funcChangePage" /which comes as props/,
      // with given as props step /1 or -1/, and change (set) the value of the page in the parent component.
      onClick={() => funcChangePage(step)}
      // the button is disabled if props isDiasbled equals to true
      disabled={isDisabled}
    >
      {children}
    </Button>
  );
}
