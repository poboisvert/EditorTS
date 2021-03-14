import { useEffect, useRef } from "react";
import "./preview.css";

interface IPreviewProps {
  code: string;
}

// Second box to display the code from the textarea
const html = `
    <html>
      <head></head>
      <body>
        <div id="root"></div>
        <script>
          window.addEventListener('message', (event) => {
            try {
              eval(event.data);
            } catch (err) {
              const root = document.querySelector("#root");
              root.innerHTML = "<div><b>" + err + "</b></div>"
            }
          }, false);
        </script>
      </body>
    </html>
  `;

const Preview: React.FC<IPreviewProps> = ({ code }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    // If the user reset innerHTML to ""
    iframe.current.srcdoc = html;

    iframe.current.contentWindow.postMessage(code, "*");
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe ref={iframe} sandbox="allow-scripts" srcDoc={html} />
    </div>
  );
};

export default Preview;
