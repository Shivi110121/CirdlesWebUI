import Modal from "react-modal";
import { connect } from "react-redux";
import React, { useState } from "react";
import { dialogFilter } from "../../util/helper";


export const AboutModal = props => {
    const [modalShow, setModalShow] = useState(false);

    return (
        <div>
        <button
            className="btn bg-white btn-outline-dark modal-button btn-middle"
            onClick={() => setModalShow(true)}
        >
            About
        </button>
        <Modal
            isOpen={modalShow}
            onRequestClose={() => setModalShow(false)}
            contentLabel="About"
        >
            <button
            className="btn bg-white btn-outline-dark float-right"
            onClick={() => setModalShow(false)}
            >
            x
            </button>
            <h3>About</h3>
            <br></br>
            <br></br>
            <p>Mars Map Maker is an assistive tool 
                that is used to create mapping files 
                for the uploading of legacy samples at 
                SESAR (System for Earth Sample 'Registration) through MARS.
            </p>
            <br></br>
            <p> Mars Map Maker was created by 
            <a href="https://github.com/jamesamrundle"> James Rundle</a>,
            <a href="https://github.com/julius-walton"> Julius Walton</a>,
            <a href="https://github.com/joshuadgilley"> Josh Gilley</a>,
            <a href="https://github.com/hafey1"> Robert Niggebrugge</a>, and
            <a href="https://github.com/stapletonce"> Chloe Stapleton</a> of
            <a href="https://cirdles.org"> CIRDLES.org</a>,
                under the guidance of Principal Investigator 
            <a href="https://github.com/bowring"> Dr. Jim Bowring </a>
                 in coordination with 
            <a href="https://geosamples.org"> geosamples.org</a>.
            </p>
    </Modal>
    </div>
    );
}


const mapStateToProps = state => {
  return {
    ent: state.marsMapMaker.entries,
  };
};

export default connect(
  mapStateToProps,
  null
)(AboutModal);