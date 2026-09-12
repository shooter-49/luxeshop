import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    // Send to logging/monitoring here if available
    console.error('ErrorBoundary caught', error, info)
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 40, textAlign: 'center' }}>
          <h2>Une erreur est survenue</h2>
          <p>Nous avons enregistré le problème. Rechargez la page ou contactez le support.</p>
        </div>
      )
    }
    return this.props.children
  }
}
