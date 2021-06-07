///////////////////////////////////////////////////////////////////////////////////////
// MAPOUTPUT.JS /////////////////////////////////////////////////////////////////////////
// This component displays an icon in the center of the toolbar /////////////////////
// This input box recieves 1 or 2 CSVS OR that combination with 1 JS file //////////
///////////////////////////////////////////////////////////////////////////////////

import React from "react";
import { connect } from "react-redux";
import saveAs from "file-saver";
import { formatDate } from "../../../../actions/marsMapMaker";

import mars from "../../../../img/marsMapMakerImg/planet.png";
import {
  isSesarTitlePresent,
  findFirstValueBySesarTitle,
  convertSinglesData,
  mapSinglesOutputData,
  convertMultiData,
  mapMultiOutputData
} from "../../util/helper.js";
import { MULTI_VALUE_TITLES as MVT } from "../../util/constants";
import * as templateText from "../../util/staticMapOutputText";

class MapOutput extends React.Component {
  filterSortedPersistent = sorted => {
    let unfiltered = sorted;
    let filtered = [];
    let reference = this.props.ent;

    let checker = 0;
    for (let i = 0; i < reference.length; i++) {
      let count = 0;

      for (let j = 0; j < unfiltered.length; j++) {
        if (unfiltered[j].sesar === reference[i].sesarTitle && count < 1) {
          filtered.push(unfiltered[j]);
          checker++;
          count++;
        }
      }
    }
    return filtered;
  };

  //creates other dynamic metadata file information
  fileMetadataHeader = () => {
    let arrayContent = "";
    for (let i = 0; i < this.props.fileMeta.length; i++) {
      if (i < this.props.fileMeta.length - 1) {
        arrayContent += this.props.fileMeta[i] + ", ";
      } else {
        arrayContent += this.props.fileMeta[i] + "\n";
      }
    }
    for (let i = 0; i < this.props.ent.length; i++) {
      if (
        this.props.ent[i].sesarTitle === "current_archive" &&
        this.props.ent[i].value !== "" &&
        this.props.ent[i].isGreen
      ) {
        arrayContent +=
          "// This is a mapping file for the organization " +
          this.props.ent[i].value +
          "\n";
      } else {
        arrayContent += "";
      }
    }

    arrayContent +=
      templateText.MMM_INFO +
      templateText.LICENSE +
      templateText.HEADER_DENOTER +
      "\n";
    return templateText.HEADER_TEXT + arrayContent;
  };

  //creates each METADATA and METADATA_ADD functions
  forceEditFunction = () => {
    //sortedPersistent are the METADATA and METADATA_ADD fields
    let sortedPersistent = this.props.persist;

    let functID = "";
    let value = "";
    for (let i = 0; i < this.props.persist.length; i++) {
      value = this.props.persist[i].value;
      if (!this.props.persist[i].header.includes("<METADATA_ADD")) {
        value = this.props.ent[this.props.persist[i].index].value;
      }

      functID =
        functID +
        "const forceEditID" +
        this.props.persist[i].index +
        " = () => {" +
        "\n" +
        "let mapMakerHeader = " +
        '"' +
        this.props.persist[i].header +
        '"' +
        "\n" +
        "let mapMakerIndex = " +
        this.props.persist[i].index +
        "\n  " +
        "return " +
        '"' +
        value +
        '"' +
        ";\n}\n\n";
    }

    return functID;
  };

  //this takes in the chosen date format and creates the text that corresponds to how the user wants the entry to be manipulated
  createDateFormatString = chosenFormat => {
    let letDateString = "";
    if (chosenFormat !== "start") {
      let y = "";
      let d = "";
      let m = "";
      let prefix = "";
      switch (chosenFormat) {
        case "YYYYMMDD":
          y = "0,4";
          d = "6,2";
          m = "4,2";
          break;
        case "YYYYDDMM":
          y = "0,4";
          d = "4,2";
          m = "6,2";
          break;
        case "DDMMYYYY":
          y = "4,4";
          d = "0,2";
          m = "2,2";
          break;
        case "MMDDYYYY":
          y = "4,4";
          d = "2,2";
          m = "0,2";
          break;
        case "YYYY/MM/DD":
          y = "0,4";
          d = "8,2";
          m = "5,2";
          break;
        case "YYYY/DD/MM":
          y = "0,4";
          d = "5,2";
          m = "8,2";
          break;
        case "MM/DD/YYYY":
          y = "6,4";
          d = "3,2";
          m = "0,2";
          break;
        case "DD/MM/YYYY":
          y = "6,4";
          d = "0,2";
          m = "3,2";
          break;
        case "YY/MM/DD":
          prefix = this.props.centuryChosen.substr(0, 2);
          y = "0,2";
          d = "6,2";
          m = "3,2";
          break;
        case "MM/DD/YY":
          prefix = this.props.centuryChosen.substr(0, 2);
          y = "6,2";
          d = "3,2";
          m = "0,2";
          break;
        case "YY/DD/MM":
          prefix = this.props.centuryChosen.substr(0, 2);
          y = "0,2";
          d = "3,2";
          m = "6,2";
          break;
        case "DD/MM/YY":
          prefix = this.props.centuryChosen.substr(0, 2);
          y = "6,2";
          d = "0,2";
          m = "3,2";
          break;
        default:
      }

      letDateString = templateText.dateString(prefix, y, d, m);
    } else {
      letDateString = "";
    }
    return letDateString;
  };

  //this method loops through the array entries in the store multiple times to append to the string based on corresponding SesarTitles selected that
  createMapString() {
    const letMapString = "let map = {\n";
    const mapStringEnd = "\n  }\n\n";

    return (
      letMapString +
      [
        convertSinglesData(mapSinglesOutputData(this.props.ent)),
        convertMultiData(mapMultiOutputData(this.props.ent))
      ].join(",\n") +
      mapStringEnd
    );
  }

  logicFunctionAppend() {
    let logicID = "";

    for (let i = 0; i < this.props.persist.length; i++) {
      logicID =
        logicID +
        "  " +
        this.props.persist[i].sesar +
        ": forceEditID" +
        this.props.persist[i].index +
        ",\n";
    }
    return logicID;
  }

  createLogicAndCombination() {
    const logic =
      "let logic = { " +
      "\n" +
      this.logicFunctionAppend() +
      templateText.STATIC_FUNCTION_TEXT;

    return logic + templateText.COMBINATION_TEXT + templateText.END_OF_FILE;
  }

  finalAppend = async () => {
    let dateDoubleCheck = "start";

    //if we are formatting directly from JS file
    if (this.props.dateFormatFromJS) {
      dateDoubleCheck = this.props.dateFormatFromJS;
    }

    // if date format was set normally
    if (
      this.props.dateFormat !== "startingDate" &&
      (isSesarTitlePresent("collection_start_date", this.props.ent) ||
        isSesarTitlePresent("collection_end_date", this.props.ent))
    ) {
      dateDoubleCheck = this.props.dateFormat;
    }

    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    let currentDate = " " + year + "-" + month + "-" + day;

    let fileString =
      "// Mapping file created by Mars Map Maker on" + currentDate + "\n";
    fileString = fileString + this.fileMetadataHeader();
    fileString = fileString + this.forceEditFunction();
    fileString = fileString + templateText.MULTIVALUE_FUNCTION_TEXT;
    fileString = fileString + this.createDateFormatString(dateDoubleCheck);
    fileString = fileString + this.createMapString();
    fileString = fileString + this.createLogicAndCombination();
    return fileString;
  };

  createMapFile = async () => {
    if (isSesarTitlePresent("user_code", this.props.ent)) {
      const fileOutput = new Blob([await this.finalAppend()], {
        type: "text/javascript;charset=utf-8"
      });
      let name = findFirstValueBySesarTitle(this.props.ent, "user_code");
      saveAs(fileOutput, name + "_Mapping.js");
    } else {
      alert(templateText.USER_CODE_ALERT);
    }
  };

  render() {
    return (
      <div
        className="text-center order-md-3 col-md-3"
        style={{ padding: "20px" }}
      >
        <div className="marsOutput">
          <img
            className="mars--icon"
            src={mars}
            alt="marsIcon"
            onClick={() => this.createMapFile()}
          ></img>
          <h4 style={{ padding: "0%", margin: "0%" }}>Click to Map</h4>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    dateFormatFromJS: state.marsMapMaker.chosenDateFormat,
    hasTwoYs: state.marsMapMaker.hasTwoYs,
    century: state.marsMapMaker.century,
    ent: state.marsMapMaker.entries,
    fileMeta: state.marsMapMaker.fileMetadata,
    persist: state.marsMapMaker.persistingMetaData,
    multiValue: state.marsMapMaker.multiValues,
    singleMeasure: state.marsMapMaker.singleMeasureArr,
    dateFormat: state.marsMapMaker.substringDateFormat,
    centuryChosen: state.marsMapMaker.century
  };
};

export default connect(
  mapStateToProps,
  { formatDate }
)(MapOutput);
