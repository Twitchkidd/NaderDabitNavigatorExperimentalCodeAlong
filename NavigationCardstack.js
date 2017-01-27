import React, { Component } from 'react';
import { View, Text, NavigationExperimental } from 'react-native';

const {
  CardStack: NavigationCardStack,
  StateUtils: NavigationStateUtils,
  Header: NavigationHeader
} = NavigationExperimental;

let styles = {};

const Home = ({ navigate }) => (
  <View style={styles.container}>
    <Text>Hello from @Home!</Text>
    <Text onPress={() => navigate("push", { key: "About" })}>
      Go to About
    </Text>
  </View>
)

const About = ({ navigate }) => (
  <View style={styles.container}>
    <Text>Hello from @About!</Text>
    <Text onPress={() => navigate("pop")}>
      Go back to Home
    </Text>
  </View>
)

function reducer(state, action, route) {
  if (!state) {
    return {
      index: 0,
      routes: [{key: "Home"}]
    };
  }
  switch(action) {
    case "push":
      return NavigationStateUtils.push(state, route)
    case "pop":
      return NavigationStateUtils.pop(state)
    default:
      return state;
  }
}

class Header extends Component {
  _back = () => {
    this.props.navigate("pop");
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
  state = { navState: reducer() }
  _navigate = (action, route) => {
    const navState = reducer(this.state.navState, action, route);
    this.setState({
      navState
    });
  }
  _renderScene = (props) => {
    switch(props.scene.route.key) {
      case "Home":
        return <Home navigate={this._navigate} />
      case "About":
        return <About navigate={this._navigate} />
    }
  }
  _renderHeader = (sceneProps) => {
    return (
      <Header
        navigate={this._navigate}
        {...sceneProps}
      />
    );
  }
  render() {
    const { navState } = this.state;
    return (
      <NavigationCardStack
        navigationState={navState}
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