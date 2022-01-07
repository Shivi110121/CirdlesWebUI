import React from "react";
import {connect} from "react-redux";
import classNames from "classnames/bind";
import style from "styles/Squidink/ShowAbout.scss";
import squidInkLogo from "../../../img/logos/SquidInk.svg";
import squidLogo from "../../../img/logos/Squid.svg";
import WrapperComponent from "./WrapperComponent";

let cx = classNames.bind(style);

export class ShowAbout extends React.Component {
    render() {
        return (
            <WrapperComponent history={this.props.history} stateNum={1}>
                <div className={cx('label-container-custom')}>
                    <h1></h1>
                    <p><img src={squidLogo} alt="SquidInkLogo" width="150" height="150"/>
                        &nbsp;&nbsp;spills&nbsp;&nbsp;
                        <img src={squidInkLogo} alt="SquidInkLogo" width="150" height="150"/>
                    </p>

                    <h4>Squid Ink exposes <a
                        href={"https://github.com/CIRDLES/Squid"}>Squid3</a> functionality as a
                        webservice provided by <a href={"http://cirdles.org/"}>CIRDLES.org.</a></h4>
                    <p>Users are encouraged to provide feedback via <a
                        href={"https://github.com/CIRDLES/Squid/issues"}>this issues page</a> on GitHub.
                    </p>

                </div>
            </WrapperComponent>
        )
    }
}

export default connect()(ShowAbout)