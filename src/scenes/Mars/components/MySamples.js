import React, { Component } from "react";
import { connect } from "react-redux";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import MUIDataTable from "mui-datatables";
import Button from "@material-ui/core/Button";
import { fetchUsercodeAndSamples } from "../../../actions/mars";
import { SESAR_SAMPLE_DISPLAY } from "../../../constants/api";
import "../../../styles/mars.scss";
import { CsvBuilder } from "filefy";



import { SESAR_BASE_URL } from "../../../constants/api";

class MySamples extends Component {
  //When the component mounts, get the user's samples and key data about those samples
  componentDidMount() {
    this.props.fetchUsercodeAndSamples(
      this.props.usercode,
      this.props.username,
      this.props.password
    );
  }

  //Purpose: This function opens a new window showing the full sample profile
  //         for the samples the user has chosen to view
  openWindow(selectedRows, displayData) {
    //Get the rows that the user selected
    let rows = [];
    for (var i = 0; i < selectedRows.data.length; i++) {
      let index = selectedRows.data[i].index;
      rows.push(index);
    }

    //For each sample the user has selected, grab the IGSN for that sample
    let samples = [];
    for (i = 0; i < rows.length; i++) {
      let index = rows[i];
      let sample = displayData[index].data[0];
      samples.push(sample);
    }

    //For each sample selected open a new popup window showing the sample profile
    for (i = 0; i < samples.length; i++) {
      let igsn = samples[i];
      var randomnumber = Math.floor(Math.random() * 100 + 1);
      window.open(
        SESAR_SAMPLE_DISPLAY + `${igsn}`,
        "_blank",
        "PopUp",
        randomnumber,
        "scrollbars=1,menubar=0,resizable=1,width=850,height=500"
      );
    }
  }

  handleExport(selectedRows,displayData, columns) {
    //Get the rows that the user selected
    let rows = [];
    for (var i = 0; i < selectedRows.data.length; i++) {
      let index = selectedRows.data[i].index;
      rows.push(index);
    }
    let samples = [];
    for (i = 0; i < rows.length; i++) {
      let index = rows[i];
      let sample = displayData[index];
      samples.push(sample.data);
    }
    var csvBuilder = new CsvBuilder("selected.csv")
      .setDelimeter(",")
      .setColumns(columns)
      .addRows(samples)
      .exportFile();
  }

  renderTable() {
    if (this.props.loading === true || this.props.loading == undefined) {
      //Show spinner
      return (
        <div className="mysamples">
          <div className="mysamples-spinner__container">
            <div
              className="spinner-border text-primary mysamples-spinner"
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      );
    } else if (this.props.loading === false && this.props.rowData === false) {
      //Notify the user that they do not have samples
      return (
        <div className="mysamples">
          <h1 className="mysamples-notice">No Samples Yet</h1>
          <h1 className="nosamples-notice">
            Click on Mapping to Begin Sample Registration
          </h1>
        </div>
      );
    } else {
      //Display the table showing key data about registered samples
      var columns = ["IGSN", "Name", "Type", "Material", "Current Archive", "Latitude", "Longitude"];

      const options = {
        filter: true,
        filterType: "dropdown",
        responsive: "scroll",
        
        customToolbarSelect: (selectedRows, displayData) => (
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.handleExport(selectedRows, displayData, columns)}
            >
              CSV of Selected
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.openWindow(selectedRows, displayData)}
            >
              View Webpage for Selected Samples
            </Button>
          </div>
        ),
      };

      let theme = createMuiTheme({
        typography: {
          useNextVariants: true,
        },
        overrides: {
          MUIDataTableSelectCell: {
            root: {
              backgroundColor: "#FFFF",
            },
          },
        },
      });

      return (
        <div className="mysamples-table__container">
          <div className="mysamples-table">
            <MuiThemeProvider theme={theme}>
              <MUIDataTable
                title={
                  "My Samples with User Code '" +
                  this.props.usercode +
                  "' from " +
                  SESAR_BASE_URL.replace("https://", "") +
                  " , User = '" + this.props.username + "'"
                }
                data={this.props.mySamplesList}
                columns={columns}
                options={options}
              />
            </MuiThemeProvider>
          </div>
        </div>
      );
    }
  }

  //Main render function
  render() {
    return <div>{this.renderTable()}</div>;
  }
}

function mapStateToProps(state) {
  return {
    usercode: state.mars.usercode,
    password: state.mars.password,
    username: state.mars.username,
    mySamplesList: state.mars.mySamplesList,
    loading: state.mars.loading,
  };
}

export default connect(
  mapStateToProps,
  { fetchUsercodeAndSamples }
)(MySamples);
