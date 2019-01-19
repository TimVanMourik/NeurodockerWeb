import React, { Fragment } from "react";
import { render } from "react-dom";
import { hot } from "react-hot-loader";

import Neurodocker from "./components/neurodocker";

class App extends React.Component {
  render() {
    return (
      <Neurodocker />
    );
  }
}

export default hot(module)(() => <App classname="app" />);
