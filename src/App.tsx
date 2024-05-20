import React from "react";
import { FormInputs } from "./constants/Form";
import { PDFPreview } from "./components/Preview";
import UI from "./components/UI";
import { ThemeContext } from "./context/ThemeContextProvider";
import { FormDataContext } from "./context/FormDataContextProvider";

function App() {
  const { theme, setTheme } = React.useContext(ThemeContext);
  const { formData, setFormData } = React.useContext(FormDataContext);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [showFilePreview, setShowFilePreview] = React.useState(false);

  const showPreviewFile = () => {
    if (
      !fileInputRef.current ||
      !fileInputRef.current.files ||
      !fileInputRef.current.files[0]
    ) {
      alert("Please select a file");
      return;
    }
    console.log(fileInputRef.current.files[0]);
    setShowFilePreview(true);
  };
  return (
    <div className="relative overflow-hidden h-screen">
      {/* NavBar */}
      <nav
        className={`border h-20 flex items-center px-14 shadow-sm
      ${showFilePreview && "blur-md"}`}
      >
        <span className="text-3xl font-semibold">PDF Tool</span>
      </nav>

      <div
        className={`border flex items-center justify-around 
        ${showFilePreview && "blur-md"}`}
      >
        {/* Left */}
        <div className="w-1/2 mx-10">
          <>
            {FormInputs.map((item) => (
              <div key={item.key}>
                <input
                  type={item.type}
                  placeholder={item.placeholder}
                  className="border p-4 rounded-md my-4 w-full outline-none"
                  value={formData[item.key as keyof typeof formData]} // Type assertion
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      [item.key]: e.target.value,
                    });
                  }}
                />
                <br />
              </div>
            ))}
          </>
          <div className="text-center">
            <button
              onClick={() => console.table(formData)}
              className="active:scale-90 outline-none border rounded-md p-4 px-10 bg-gray-300 hover:bg-gray-400 transition-all duration-300 mx-4"
            >
              Submit
            </button>
            <button
              onClick={() =>
                setFormData({ name: "", email: "", phone: "", filename: "" })
              }
              className="active:scale-90 outline-none border rounded-md p-4 px-10 bg-gray-300 hover:bg-gray-400 transition-all duration-300  mx-4"
            >
              Clear
            </button>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="file"
              accept=".pdf"
              ref={fileInputRef}
              className="p-4 rounded-md my-4 outline-none"
            />
            <button
              onClick={() => showPreviewFile()}
              className="active:scale-90 outline-none border rounded-md p-2 px-10 bg-gray-300 hover:bg-gray-400 transition-all duration-300  mx-4"
            >
              Preview
            </button>
          </div>
        </div>

        {/* Right */}
        <div className="w-1/2 mx-10 ">
          <div className="flex items-center gap-3 justify-center mb-10">
            <button
              onClick={() => setTheme(true)}
              className={`active:scale-90 p-2 px-4 border rounded-lg ${
                theme ? "bg-gray-400" : "bg-gray-300"
              }`}
            >
              Light UI
            </button>
            <button
              onClick={() => setTheme(false)}
              className={`active:scale-90 p-2 px-4 border rounded-lg ${
                !theme ? "bg-gray-400" : "bg-gray-300"
              }`}
            >
              Dark UI
            </button>
          </div>
          <div className="border h-80 my-10">
            <UI />
          </div>
          <div className="flex items-center gap-3 justify-center">
            <button
              // onClick={() => showPreviewFile()}
              className="active:scale-90 outline-none border rounded-md p-2 px-10 bg-gray-300 hover:bg-gray-400 transition-all duration-300  mx-4"
            >
              Preview
            </button>
            <button
              // onClick={() => showPreviewFile()}
              className="active:scale-90 outline-none border rounded-md p-2 px-10 bg-gray-300 hover:bg-gray-400 transition-all duration-300  mx-4"
            >
              Download
            </button>
          </div>
        </div>
      </div>
      {showFilePreview && fileInputRef.current?.files && (
        <PDFPreview
          file={fileInputRef.current.files[0]}
          showFilePreview={setShowFilePreview}
        />
      )}
    </div>
  );
}

export default App;
