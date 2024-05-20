import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

import { useState } from "react";
import { Document, Page } from "react-pdf";
import { Close } from "../constants/Icons";

export function PDFPreview({
  file,
  showFilePreview,
}: {
  file: File | string | undefined | null;
  showFilePreview: (show: boolean) => void;
}) {
  const [numPages, setNumPages] = useState<number>();
  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  return (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 h-screen overflow-auto p-10 bg-gray-300">
      <div
        onClick={() => showFilePreview(false)}
        className="cursor-pointer inline-block"
      >
        <Close className="h-10 w-10" />
      </div>

      <Document file={file} onLoadSuccess={onDocumentLoadSuccess} className="">
        {[...Array(numPages)]
          .map((_, i) => i + 1)
          .map((pageNumber) => (
            <Page
              key={pageNumber}
              pageNumber={pageNumber}
              renderAnnotationLayer={false}
              renderTextLayer={false}
            />
          ))}
      </Document>
    </div>
  );
}
