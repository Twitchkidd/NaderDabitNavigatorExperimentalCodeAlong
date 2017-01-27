import { connect } from 'react-redux';
import App from './NavigationCardstack';
import { push, pop } from './navActions';
function mapStateToProps (state) {
  return {
    navState: state.navState
  }
}
export default connect(
  mapStateToProps,
  {
    push: (route) => push(route),
    pop: () => pop()
  }
)(App)