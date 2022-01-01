// @flow
import React from "react";
import Radium from "radium";
import { ProjectCard } from "components";
import {
  SQUID,
  AMBAPO,
  TOPSOIL,
  MARS,
  MARSMAPMAKER,
  SQUIDINK
} from "constants";
import {SQUIDINK_ENABLED, FILEBROWSER_URL} from "constants/api";

type Props = {
  history: any
};

const HomePage = ({ history }: Props) => {
  return (
    <div style={styles.home}>
      <div style={styles.cardWrapper}>
        {/*Temporarily unavailable
          uncomment ambapo references in App.js as well
          <ProjectCard
          description={AMBAPO.description}
          logo={require("img/logos/Ambapo.svg")}
          width={300}
          height={300}
          onClick={() => history.push("/ambapo")}
          style={{ margin: 40 }}
        />*/}
        <ProjectCard
          description={TOPSOIL.description}
          logo={require("img/logos/Topsoil.svg")}
          width={300}
          height={300}
          onClick={() => history.push("/topsoil")}
          style={{ margin: 40 }}
        />
        <ProjectCard
          description={MARS.description}
          logo={require("img/logos/Mars.svg")}
          width={300}
          height={300}
          onClick={() => history.push("/mars")}
          style={{ margin: 40 }}
        />
        <ProjectCard
          description={MARSMAPMAKER.description}
          logo={require("img/logos/MarsMapMaker.svg")}
          width={300}
          height={300}
          onClick={() => history.push("/marsMapMaker")}
          style={{ margin: 40 }}
        />
{
        SQUIDINK_ENABLED ?
        <ProjectCard
          description={SQUIDINK.description}
          logo={require("img/logos/SquidInk.svg")}
          width={300}
          height={300}
          onClick={() => {
            history.push("/squidink")
            //window.open(FILEBROWSER_URL, "_self")
          }}
          style={{ margin: 40 }}
        /> : null


}
      </div>
    </div>
  );
};

const styles = {
  home: {
    height: "100%"
  },
  cardWrapper: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
};

export default Radium(HomePage);
