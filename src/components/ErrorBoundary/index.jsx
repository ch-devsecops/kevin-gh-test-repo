import { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    const { errorHandler } = this.props;

    if (errorHandler) {
      errorHandler(error, errorInfo);
    } else {
      const { componentName } = this.props;
      console.log({
        componentName,
        error,
        errorInfo,
      });
    }
  }

  render() {
    const { hasError } = this.state;
    const { children, errorMessage } = this.props;

    if (hasError) {
      return errorMessage || null;
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  errorHandler: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  errorMessage: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default ErrorBoundary;
