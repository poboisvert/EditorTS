import ReactDOM from "react-dom";
import CodeCell from "./components/code-cell";

const App = () => {
  return (
    <>
      <CodeCell />
    </>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
