import React, { Component } from 'react';
import { View, Text, NavigationExperimental } from 'react-native';

const {
  CardStack: NavigationCardStack
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
    case "push": {
      const routes = state.routes.slice();
      routes.push(route);
      return {
        ...state,
        index: routes.length - 1,
        routes
      }
    }
    case "pop": {
      if (state.index <= 0) return state;
      const routes = state.routes.slice(0, -1);
      return {
        ...state,
        index: routes.length - 1,
        routes
      }
    }
    default:
      return state;
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
  render() {
    const { navState } = this.state;
    return (
      <NavigationCardStack
        navigationState={navState}
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