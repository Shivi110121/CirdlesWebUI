import Modal from "react-modal";
import { connect } from "react-redux";
import React, { useState } from "react";
import { dialogFilter } from "../../util/helper";

import { findFirstValueBySesarTitle } from "../../util/helper";

export const PreviewModal = props => {
  const [modalShow, setModalShow] = useState(false);
  const previewMapping = entry => {
    let localVals = entry[1];

    if (localVals[0].includes(" : ")) {
      localVals = localVals.map(ele => {
        let replaceValue = "[VALUE]";
        // digit value
        if (ele.match(/[\d]/)) {
          replaceValue = "NNN";
        }
        // no value
        else if (ele.match(/^.*([  ]$)/)) {
          replaceValue = "Not_Provided";
        }

        return ele.replace(/(?<= : )(.*)/, replaceValue);
      });
    }
    let localAtt = localVals.join(";");
    //displays forced value
    if (localAtt.includes("<METADATA"))
      localAtt = localAtt.replace(
        /(<.*>)/,
        findFirstValueBySesarTitle(props.ent, entry[0])
      );

    return (
      <tr key={entry[0]}>
        <td>{localAtt}</td>

        <td>{entry[0]}</td>
      </tr>
    );
  };

  return (
    <div>
      <button
        className="btn bg-white btn-outline-dark btn-middle modal-button"
        onClick={() => setModalShow(true)}
      >
        Preview Mapping
      </button>
      <Modal
        isOpen={modalShow}
        onRequestClose={() => setModalShow(false)}
        contentLabel="Preview Mapping"
      >
        <button
          className="btn bg-white btn-outline-dark float-right"
          onClick={() => setModalShow(false)}
        >
          x
        </button>
        <h3> Mapping Preview </h3>
        <table class="table table-striped" style={{ width: "97%" }}>
          <tbody>
            <th scope="col">Local Value</th>

            <th scope="col">SESAR Value</th>
            {dialogFilter(props.ent).map(element => previewMapping(element))}
          </tbody>
        </table>
      </Modal>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    ent: state.marsMapMaker.entries
  };
};

export default connect(
  mapStateToProps,
  null
)(PreviewModal);
