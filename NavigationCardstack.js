import React, { Component, PropTypes } from 'react';
import { View, Text, NavigationExperimental } from 'react-native';
import Home from './Home';
import About from './About';

const {
  CardStack: NavigationCardStack,
  Header: NavigationHeader
} = NavigationExperimental;

let styles = {};

class Header extends Component {
  _back = () => {
    this.props.pop();
  }
  _renderTitleComponent = (props) => {
    return (
      <NavigationHeader.Title>
        {props.scene.route.key}
      </NavigationHeader.Title>
    );
  }
  render() {
    return (
      <NavigationHeader
        {...this.props}
        renderTitleComponent={this._renderTitleComponent}
        onNavigateBack={this._back}
      />
    );
  }
}

class App extends Component {
  _renderScene = (props) => {
    switch(props.scene.route.key) {
      case "Home":
        return <Home />
      case "About":
        return <About />
    }
  }
  _renderHeader = (sceneProps) => {
    return (
      <Header
        pop={this.props.pop}
        {...sceneProps}
      />
    );
  }
  render() {
    const { navState } = this.props;
    let direction = "horizontal";
    if (navState.prevPushedRoute && navState.prevPushedRoute.type === "modal") {
      direction = "vertical";
    }
    return (
      <NavigationCardStack
        direction={direction}
        navigationState={this.props.navState}
        renderHeader={this._renderHeader}
        renderScene={this._renderScene}
      />
    );
  }
}

styles = {
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  }
}

export default App;