import React, { Component } from 'react';
import { View, Text, NavigationExperimental } from 'react-native';

const {
  CardStack: NavigationCardStack
} = NavigationExperimental;

let styles = {};

const Home = () => (
  <View style={styles.container}>
    <Text>Hello from @Home</Text>
  </View>
)

function reducer(state) {
  if (!state) {
    return {
      index: 0,
      routes: [{key: "Home"}]
    };
  }
}

class App extends Component {
  state = { navState: reducer() }
  _renderScene = (props) => {
    switch(props.scene.route.key) {
      case "Home":
        return <Home />
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