import { exportJSON } from "./csvToJSON.js";
import "./App.css";
function App() {
  const triggerFileUpload = () => {
    document.getElementById("App-file-input")!.click();
  };

  const readURL = async () => {
    let value = (document.getElementById("inputURL") as HTMLInputElement)!
      .value;
    if (value == "") {
      return;
    }
    if (
      !/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(
        value
      )
    ) {
      alert("Invalid input!");
      return;
    }
    setValues("Please wait...", "fileContent");
    let response: any = await exportJSON(null, value);
    setValues(response.input, "fileContent");
    setValues(JSON.stringify(response.output, null, 2), "resultJson");
  };

  const readFile = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();

    reader.readAsText(file);

    reader.onload = async function () {
      let response: any = await exportJSON(reader.result, null);
      setValues(response.input, "fileContent");
      setValues(JSON.stringify(response.output, null, 2), "resultJson");
    };
  };

  const setValues = (value, elementId) => {
    (document.getElementById(elementId) as HTMLTextAreaElement).value = value;
  };

  return (
    <div className="App">
      <div className="App-main">
        <header>CSV To JSON</header>
        <div className="App-input">
          <div className="App-url">
            <input
              type="text"
              name="inputURL"
              id="inputURL"
              placeholder="Input csv file URL"
            />
            <button onClick={readURL}>Get</button>
          </div>
          <b>OR</b>
          <div className="file-upload">
            <div className="file-upload-select">
              <div className="file-select-button" onClick={triggerFileUpload}>
                Choose File
              </div>
              <div className="file-select-name">No file chosen...</div>
              <input
                type="file"
                name="file-upload-input"
                id="App-file-input"
                accept=".csv"
                onChange={(e) => readFile(e)}
              />
            </div>
          </div>
        </div>
        <div className="App-result">
          <textarea
            className="App-textArea"
            name="fileContent"
            id="fileContent"
            placeholder="CSV output"
          ></textarea>
          <textarea
            className="App-textArea"
            name="resultJson"
            id="resultJson"
            placeholder="JSON output"
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default App;
