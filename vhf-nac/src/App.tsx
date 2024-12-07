import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { ErrorPage } from "./routes/error-page";

interface AppState {
  hasError: boolean;
  error: Error | null;
}

interface AppProps {
  children?: React.ReactNode;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }
  // There is currently no exception catching hook implementation in React
  // https://legacy.reactjs.org/docs/hooks-faq.html#do-hooks-cover-all-use-cases-for-classes
  componentDidCatch(error: Error) {
    console.error("error caught: ", error);
    this.setState({
      hasError: true,
      error: error,
    });
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <>
          <BrowserRouter>
            <ErrorPage error={this.state.error} />
          </BrowserRouter>
        </>
      );
    }

    return <BrowserRouter>{this.props.children}</BrowserRouter>;
  }
}

export default App;
