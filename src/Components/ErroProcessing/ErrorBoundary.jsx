import React from 'react'
import styles from './Error.module.scss'


export class ErrorBoundary extends React.Component {
    state = { hasError: false };
    componentDidCatch() {
        this.setState({ hasError: true })
    }
    render() {
        if (this.state.hasError) {
            return (
                <div className={styles.errBoundary}>
                    <h1>Something went wrong. Please try again</h1>
                    <button type="button" onClick={() => this.setState({ hasError: false })}>
                        Try again?
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}
