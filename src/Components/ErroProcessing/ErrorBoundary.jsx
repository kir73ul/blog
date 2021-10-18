import React from 'react'

export class ErrorBoundary extends React.Component {
    state = { hasError: false };

    componentDidCatch(error, errorInfo) {
        this.props.log({ error, errorInfo });
        this.setState({ hasError: true })

    }
    render() {
        if (this.state.hasError) {
            return (
                <div>
                    <h1>Oops, we done goofed up</h1>
                    <button type="button" onClick={() => this.setState({ hasError: false })}>
                        Try again?
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}
