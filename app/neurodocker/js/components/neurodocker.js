import React from "react";
import Radium from "radium";
import to from "await-to-js";

import { getCsrfToken } from "../utils/auth";
import styles from "../styles/neurodocker.js";
import { API_HOST } from "../config";

class Neurodocker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      packages: null,
      selectedToolbox: null,
      dockerOrSingularity: "docker",
      dockerCommand: ""
    };
    this.selectToolbox = this.selectToolbox.bind(this);
    this.updateArgument = this.updateArgument.bind(this);
    this.toggleToolbox = this.toggleToolbox.bind(this);
    this.updateCode = this.updateCode.bind(this);
    this.makeDockerFile = this.makeDockerFile.bind(this);
  }

  async componentDidMount() {
    const response = await fetch(`${API_HOST}/installer-arguments`);
    const installerArguments = await response.json()
    this.setState({ packages: installerArguments && installerArguments.packages });
  }

  selectToolbox(event) {
    this.setState({
      selectedToolbox: event.target.value
    });
  }

  updateArgument(event, selectedArgument) {
    const { value } = event.target;
    const { packages, selectedToolbox } = this.state;
    const newPackages = packages.map(toolbox => {
      if(toolbox.name === selectedToolbox) {
        const newArguments = toolbox.arguments.map(argument => {
          if(argument.name === selectedArgument) {
            return {...argument, value}
          } else {
            return argument
          }
        })
        return {...toolbox, arguments: newArguments}
      } else {
        return toolbox
      }
    });
    this.setState({
      packages: newPackages
    })
    this.updateCode(newPackages);
  }

  toggleToolbox() {
    const { value } = event.target;
    const { packages, selectedToolbox } = this.state;
    const newPackages = packages.map(toolbox => {
      if(toolbox.name === selectedToolbox) {
        return {...toolbox, included: toolbox.included ? !toolbox.included : true}
      } else {
        return toolbox
      }
    });
    this.setState({
      packages: newPackages
    })
    this.updateCode(newPackages);
  }

  updateCode(packages) {
    const { dockerOrSingularity } = this.state;
    const dockerCommand = `neurodocker generate ${dockerOrSingularity} `

    const list = packages && packages
      .filter(toolbox => toolbox.included)
      .map(toolbox => {
        const argumentList = toolbox.arguments && toolbox.arguments
          .filter(argument => argument.value || argument.default)
          .map(argument => {
          return `${argument.name}=${argument.value || argument.default}`
        })
        return (`--${toolbox.cli} ${argumentList && argumentList.join(" ") || ""} `)
      }).join(" ")
    this.setState({
      dockerCommand: `${dockerCommand} ${list}`
    })
  }

  async makeDockerFile() {
    const { code } = this.state;
    const body = JSON.stringify({ code });
    const dockerResponse = await fetch(`${API_HOST}/dockerfile`, {
      method: "POST",
      headers: { "X-CSRFToken": await getCsrfToken() },
      body,
      credentials: "include"
    });
    const [error, answer] = await to(dockerResponse.json());
    if (error) {
      return false;
    } else {
      return answer.ok;
    }
  }

  render() {
    const { packages, dockerCommand, selectedToolbox } = this.state;

    const selection = packages && packages.filter(toolbox => toolbox.name === selectedToolbox)[0];
    return (
      <div className="container-fluid mt-3 ">
        <div className="col text-center">
          <h1>Neurodocker</h1>
        </div>
        <div className="col text-center">
          <div>
            <h3>Toolboxes</h3>
            <select
              onChange={this.selectToolbox}
            >
            <option /> {/*Starting with an empty option here */}
              {
                packages && packages.map(toolbox => (
                  <option
                    key={toolbox.name}
                  >
                    {toolbox.name}
                  </option>
                ))
              }
            </select>
          </div>
          <div>
            <h3>Attributes</h3>
            <table className="toolbox-listview">
              <tbody>
              {
                selection && selection.arguments && selection.arguments.map(argument => (
                  <tr
                    key={argument.name}
                  >
                    <td>{argument.name}</td>
                    <td>
                      <input
                        onChange={(event) => this.updateArgument(event, argument.name)}
                        value={argument.value || argument.default || ""}
                      />
                    </td>
                  </tr>
                ))
              }
              </tbody>
            </table>
          </div>
            <button
              onClick={this.toggleToolbox}
            >
              {selection && selection.included ? "Remove" : "Add"}
            </button>
        </div>
        <div className="col text-center">
          <h3>Neurodocker command:</h3>
          <p
            style={[styles.command]}
          >
            {dockerCommand}
          </p>
        </div>
        <div className="col text-center">
          <div className="text-center">
            <button
              onClick={this.makeDockerFile}
            >
              Create Dockerfile
            </button>
          </div>

          <div className="col text-center">
            <h3>Dockerfile</h3>
          </div>
        </div>
      </div>
    )
  }
}

export default Radium(Neurodocker);
