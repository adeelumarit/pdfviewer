import * as React from "react";
import { makeStyles } from "@fluentui/react-components";
import { Ribbon24Regular, LockOpen24Regular, DesignIdeas24Regular } from "@fluentui/react-icons";
import { insertText } from "../taskpane";

import '../../../assets/css/style.css'
import AppRouter from "./Router/AppRouter";
import { Loader } from "./Loader/loader";
import { useEffect } from "react";

interface AppProps {
  title: string;
}

const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
  },
});

const App: React.FC<AppProps> = () => {
  const styles = useStyles();

  const [loading, setLoading] = React.useState(true)
  //loader
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className={styles.root}>
      <AppRouter />

      {loading ? <Loader /> : ""}
    </div>
  );
};

export default App;
