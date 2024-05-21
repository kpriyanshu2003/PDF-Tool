import React from "react";
import UI from "./components/UI";
import { FormInputs } from "./constants/Form";
import { PDFPreview } from "./components/Preview";
import { ThemeContext } from "./context/ThemeContextProvider";
import { FormDataContext } from "./context/FormDataContextProvider";
import { createPDF, fileToArrayBuffer, mergePDF } from "./lib/pdf";

function App() {
  const { theme, setTheme } = React.useContext(ThemeContext);
  const { formData, setFormData } = React.useContext(FormDataContext);

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [newPdf, setNewPdf] = React.useState<ArrayBuffer | null>(null);
  const [showFilePreview, setShowFilePreview] = React.useState(false);
  const [url, setUrl] = React.useState<string | undefined>();

  const showPreviewFile = (shownew?: boolean) => {
    if (!shownew) {
      if (
        !fileInputRef.current ||
        !fileInputRef.current.files ||
        !fileInputRef.current.files[0]
      ) {
        alert("Please select a file");
        return;
      }
      setUrl(URL.createObjectURL(fileInputRef.current.files[0]));
    }
    setShowFilePreview(true);
  };

  const handleCreatePDF = async () => {
    createPDF(document.getElementById("pdf-content"), setNewPdf);
  };

  const handlePDFMerge = async () => {
    await handleCreatePDF();
    if (!newPdf) {
      alert("Try Again !");
      return;
    }

    const dtA = [];
    dtA.push(newPdf as ArrayBuffer);

    if (
      fileInputRef.current &&
      fileInputRef.current.files &&
      fileInputRef.current.files[0]
    ) {
      dtA.push(await fileToArrayBuffer(fileInputRef.current.files[0]));
    }

    const dt = await mergePDF(dtA);
    const pdfBlob = new Blob([dt], { type: "application/pdf" });
    const mergedPdfUrl = URL.createObjectURL(pdfBlob);
    console.log(mergedPdfUrl);
    setUrl(mergedPdfUrl);
  };

  const handlePDFPreview = async () => {
    await handlePDFMerge();
    showPreviewFile(true);
  };

  const handlePDFDownload = async () => {
    await handlePDFMerge();
    if (!url) {
      alert("URL is not generated. Please try again!");
      return;
    }
    const a = document.createElement("a");
    a.href = url;
    a.download = formData.filename || "output.pdf";
    a.textContent = "Download PDF";
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
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
            <div id="pdf-content">
              <UI />
            </div>
          </div>
          <div className="flex items-center gap-3 justify-center">
            <button
              onClick={() => handlePDFPreview()}
              className="active:scale-90 outline-none border rounded-md p-2 px-10 bg-gray-300 hover:bg-gray-400 transition-all duration-300  mx-4"
            >
              Preview
            </button>
            <button
              onClick={() => handlePDFDownload()}
              className="active:scale-90 outline-none border rounded-md p-2 px-10 bg-gray-300 hover:bg-gray-400 transition-all duration-300  mx-4"
            >
              Download
            </button>
          </div>
        </div>
      </div>
      {showFilePreview && (
        <PDFPreview file={url} showFilePreview={setShowFilePreview} />
      )}
    </div>
  );
}

export default App;
