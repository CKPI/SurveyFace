import React from 'react';
import JssProvider from 'react-jss/lib/JssProvider';
import { withStyles, MuiThemeProvider } from 'material-ui/styles';
import wrapDisplayName from 'recompose/wrapDisplayName';
import createContext from '../styles/createContext';

const styles = theme => ({
  '@global': {
    html: {
      background: theme.palette.background.default,
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    },
    body: {
      margin: 0,
      padding: 0,
    },
  },
});

const AppWrapper = withStyles(styles)(props => props.children);

const context = createContext();

function withRoot(Component) {
  class WithRoot extends React.Component {
    componentDidMount() {
      const jssStyles = document.querySelector('#jss-server-side');
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    }

    render() {
      return (
        <JssProvider registry={context.sheetsRegistry} jss={context.jss}>
          <MuiThemeProvider
            theme={context.theme}
            sheetsManager={context.sheetsManager}
          >
            <AppWrapper>
              <Component {...this.props} />
            </AppWrapper>
          </MuiThemeProvider>
        </JssProvider>
      );
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    WithRoot.displayName = wrapDisplayName(Component, 'withRoot');
  }

  return WithRoot;
}

export default withRoot;
