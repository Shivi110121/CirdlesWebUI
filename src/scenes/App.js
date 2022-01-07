// @flow
import React, { Component, Fragment } from "react";
import { Switch, Route, Link, NavLink } from "react-router-dom";
import Home from "./Home";
import Squid from "./Squid";
import Ambapo from "./Ambapo";
import Topsoil from "./Topsoil";
import Squidink from "./Squidink";
import Mars from "./Mars";
import MarsMapMaker from "./MarsMapMaker";
import squidLogo from "../img/logos/Squid.svg";
import ambapoLogo from "../img/logos/Ambapo.svg";
import topsoilLogo from "../img/logos/Topsoil.svg";
import marslogo from "../img/logos/Mars.svg";
import marsMapMakerLogo from "../img/logos/MarsMapMaker.svg";
import inklogo from "../img/logos/SquidInk.svg";
import { colors } from "constants";
import {SQUIDINK_ENABLED} from "constants/api";

import "styles/index.scss";
import { maxHeaderSize } from "http";


const routes = [
  {
    path: "/",
    title: "CIRDLES Web Services",
    exact: true,
    component: Home,
    logo: null
  },
  {
    path: "/ambapo",
    title: "Ambapo",
    component: Ambapo,
    logo: ambapoLogo
  },
  {
    path: "/squid",
    title: "Squid Ink: Squid's Reporting Service (Beta)",
    component: Squid,
    logo: squidLogo
  },
  {
    path: "/topsoil",
    title: "Topsoil",
    component: Topsoil,
    logo: topsoilLogo
  },
  {
    path: "/mars",
    title: "MARS",
    component: Mars,
    logo: marslogo
  },
  {
    path: "/marsMapMaker",
    title: "MarsMapMaker",
    component: MarsMapMaker,
    logo: marsMapMakerLogo
  },
  {
    path: "/squidink",
    title: "Squid Ink",
    component: Squidink,
    logo: inklogo
  }
];

const Header = ({ title, logo }) => {
  const image = logo ? (
    <img
      src={logo}
      width="30"
      height="30"
      alt={`${title} logo`}
      className="d-inline-block align-top mr-2"
    />
  ) : null;
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="#">
          {image}
          {title}
        </Link>
        <div className="navbar-nav flex-row ml-auto">
          <NavLink className="nav-item nav-link ml-4" to="/#">
            <strong>Home</strong>
          </NavLink>
          {/* temporarily unavailable: 
            uncomment ambapo reference in Home/index as well
            <NavLink className="nav-item nav-link ml-4" to="/ambapo">
            Ambapo
          </NavLink>*/}
          <NavLink className="nav-item nav-link ml-4" to="/topsoil">
            Topsoil
          </NavLink>
          <NavLink className="nav-item nav-link ml-4" to="/mars">
            MARS
          </NavLink>
          <NavLink className="nav-item nav-link ml-4" to="/marsMapMaker">
            MARS Map Maker
          </NavLink>

             {
               SQUIDINK_ENABLED ?
            <NavLink className="nav-item nav-link ml-4" to="/squidink">
              SQUIDINK
            </NavLink>
                   : null
          }


        </div>
      </div>
    </nav>
  );
};

class App extends Component {
  render() {
    return (
      <div style={styles.wrapper}>
        {routes.map(route => {
          const { title, path, exact } = route;
          return (
            <Route
              key={title + "-header-route"}
              path={path}
              exact={exact}
              render={() => Header(route)}
            />
          );
          })
        }
        <main >
          <Switch style={styles.body}>
            {routes.map(route => {
              const { title, ...rest } = route;
              return <Route key={title + "-main-route"} {...rest} />;
            })}
          </Switch>
        </main>
      </div>
    );
  }
}

const styles = {
  wrapper: {
    height: "100%",
    width: "100%",
    backgroundColor: colors.primary
  },
  body: {
    position: "absolute",
    top: "5.5em",
    right: "100%",
    bottom: "0",
    left: "0",
    backgroundColor: colors.primary
  }
};
export default App;
