import { Component } from "react";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            error,
        };
    }

    render() {
        const { hasError, error } = this.state;

        if (hasError) return this.props.handleError(error);
        return this.props.children;
    }
}

export default ErrorBoundary;