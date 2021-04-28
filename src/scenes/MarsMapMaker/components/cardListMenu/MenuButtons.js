import React from "react";
import { connect } from "react-redux";
import "../../../../styles/marsMapMaker.scss";
import { hideField } from "../../../../actions/marsMapMaker";

import {
  mapMultiOutputData,
  convertMultiData,
  mapSinglesOutputData,
  convertSinglesData
} from "../../util/helper";
import { PreviewModal } from "./PreviewModal";

const MenuButtons = props => {
  const checkStore = () => {
    console.log(props.dateFormat);
    //console.log(props.fileMeta);
    console.log(props.persist);
    //console.log(props.multiCount);
    console.log(props.ent);
    //console.log(props.toggleArr);
    console.log("\n---------------------------------\n");
  };

  return (
    <div className="col-sm-4 col-md-3 order-md-4 align-self-center text-center">
      <div
        className="card-transparent border-0 mx-auto text-center"
        style={{ maxWidth: "175px" }}
      >
        <div className="card-body">
          <div className="btn-group-vertical">
            <button
              className="btn bg-white btn-outline-dark"
              onClick={() => props.hideField(props.isHidden)}
            >
              {" "}
              {props.hideText()}{" "}
            </button>
            <PreviewModal ent={props.ent} />
            <a
              className="btn bg-white btn-outline-dark"
              target="_blank"
              href='https://drive.google.com/file/d/1F10Fh3k2pnPr5iCJnlsxirPaegup5glP/view?usp=sharing'
            >
              {" "}
              Help{" "}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    ent: state.marsMapMaker.entries,
    persist: state.marsMapMaker.persistingMetaData,
    dateFormat: state.marsMapMaker.substringDateFormat,
    toggleArr: state.marsMapMaker.toggleArr,
    hasDateFormat: state.marsMapMaker.hasChosenDateFormat,
    storeJsFile: state.marsMapMaker.jsFile,
    multiCount: state.marsMapMaker.totalMultiCount,
    fileMeta: state.marsMapMaker.fileMetadata,
    isHidden: state.marsMapMaker.hide
  };
};

export default connect(
  mapStateToProps,
  { hideField }
)(MenuButtons);
