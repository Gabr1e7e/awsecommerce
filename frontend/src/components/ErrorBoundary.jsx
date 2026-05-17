import { Component } from "react";
import ErrorPage from "./ErrorPage";

// Deduce il tipo di errore dall'oggetto Error catturato
function detectErrorType(error) {
  if (!navigator.onLine) return "network";

  const msg = error?.message?.toLowerCase() ?? "";
  const status = error?.status ?? error?.statusCode ?? null;

  if (status === 403) return "403";
  if (status === 404) return "404";
  if (status >= 500)  return "500";

  if (msg.includes("timeout") || msg.includes("aborted") || msg.includes("timed out"))
    return "timeout";
  if (msg.includes("network") || msg.includes("fetch") || msg.includes("failed to fetch"))
    return "network";

  return "500";
}

export default class ErrorBoundary extends Component {
  state = {
    hasError: false,
    errorType: "500",
    errorId: null,
  };

  static getDerivedStateFromError(error) {
    return {
      hasError:  true,
      errorType: detectErrorType(error),
      errorId:   `ERR_${Date.now()}`,
    };
  }

  componentDidCatch(error, info) {
    console.error("[ErrorBoundary]", error, info);
  }

  handleRetry = () => {
    this.setState({ hasError: false, errorType: "500", errorId: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorPage
          type={this.state.errorType}
          errorId={this.state.errorId}
          onRetry={this.handleRetry}
        />
      );
    }
    return this.props.children;
  }
}