// @flow
import React, { Component } from 'react';
import Radium from 'radium';
import { Nav } from './components';
import { HEADER_HEIGHT } from 'constants';

type Props = {
  title: string
};

class BaseHeader extends Component<Props> {
  nav;

  closeMenu() {
    this.nav && this.nav.resetMenu();
  }

  render() {
    const { title } = this.props;
    return (
      <header style={styles.header}>
        <div style={styles.left}>
          <h3 style={styles.title}>{title}</h3>
        </div>
        <div style={styles.right}>
          <Nav ref={nav => (this.nav = nav)} />
        </div>
      </header>
    );
  }
}

const styles = {
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 5000,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: HEADER_HEIGHT,
    padding: '0px 50px'
  },
  left: {
    flex: 0.8,
    display: 'flex',
    justifyContent: 'flex-start'
  },
  right: {
    flex: 0.2,
    display: 'flex',
    justifyContent: 'flex-end'
  },
  title: {
    fontSize: '1.8em',
    fontFamily: 'Libre Franklin, sans-serif'
  }
};

export const Header = Radium(BaseHeader);
