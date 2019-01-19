import React from "react";
import Radium from "radium";

import styles from "../styles/neurodocker.js";
import { API_HOST } from "../config";

class Neurodocker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      installerArguments: null
    };
  }

  async componentDidMount() {
    const response = await fetch(`${API_HOST}/installer-arguments`);
    this.setState({ installerArguments: await response.json() });
  }

  render() {
    return (
      <div className="container-fluid mt-3 ">
        <div className="col text-center">
          <h1>Neurodocker</h1>
        </div>
        <div className="col text-center">
          <div>
            <h3>Toolboxes</h3>
            <select>
              <option>FSL</option>
              <option>SPM</option>
              <option>FreeSurfer</option>
              <option>Nipype</option>
            </select>
          </div>
          <div>
            <h3>Attributes</h3>
              <input>
              </input>
          </div>
        </div>

        <div className="col text-center">
          <h3>Listview of toolboxes</h3>
          <table className="toolbox-listview">
            <tbody>
              <tr><th>Name</th><th>Version</th><th>Method</th><th>Other parameters</th></tr>
              <tr><td>Nipype</td><td>1.2.3</td><td>binaries</td><td></td></tr>
              <tr><td>FSL</td><td>4.5.6</td><td>binaries</td><td>test</td></tr>
              <tr><td>SPM</td><td>1.3.5</td><td>binaries</td><td>something</td></tr>
              <tr><td>AFNI</td><td>5.6.7</td><td>binaries</td><td>else</td></tr>
            </tbody>
          </table>
        </div>
        <div className="col text-center">
          <div className="text-center">
            <button>
              Create Dockerfile
            </button>
          </div>

          <div className="col text-center">
            <h3>Neurodocker output</h3>
          </div>
        </div>
      </div>
    )
  }
}

export default Radium(Neurodocker);