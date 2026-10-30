import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}


class ErrorBoundary extends Component<Props, State> {

  state: State = {
    hasError: false,
  };


  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }


  componentDidCatch(error: Error) {
    console.error(
      "Widget error:",
      error
    );
  }


  render() {

    if (this.state.hasError) {

      return (
        <div className="
          rounded-xl
          border
          border-red-300
          bg-red-50
          p-6
          text-red-700

          dark:border-red-900
          dark:bg-red-950
          dark:text-red-300
        ">
          <h3 className="font-bold">
            Widget failed to load
          </h3>

          <p className="mt-2 text-sm">
            Something went wrong while rendering this component.
          </p>
        </div>
      );

    }


    return this.props.children;

  }

}


export default ErrorBoundary;