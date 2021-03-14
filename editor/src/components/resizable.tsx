import "./resizable.css";
import { ResizableBox } from "react-resizable";

interface ResizableProps {
  direction: "horizontal" | "vertical";
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  return (
    <ResizableBox height={600} width={Infinity} resizeHandles={["s"]}>
      {children}
    </ResizableBox>
  );
};

export default Resizable;
