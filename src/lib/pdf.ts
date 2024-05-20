import jsPDF from "jspdf";
import { PDFDocument } from "pdf-lib";

// merge multiple PDF
export const mergePDF = async (pdfsToMerges: ArrayBuffer[]) => {
  const mergedPdf = await PDFDocument.create();
  const actions = pdfsToMerges.map(async (pdfBuffer) => {
    const pdf = await PDFDocument.load(pdfBuffer);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  });
  await Promise.all(actions);
  const mergedPdfFile = await mergedPdf.save();
  return mergedPdfFile;
};

// create new PDF
export const createPDF = async (
  input: HTMLElement | null,
  setNewPDF: React.Dispatch<React.SetStateAction<ArrayBuffer | null>>
) => {
  if (!input) return;
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "px",
    format: "a4",
  });
  doc.html(input, {
    callback: function (doc) {
      setNewPDF(doc.output("arraybuffer"));
    },
    x: 10,
    y: 10,
  });
};

// convert file to arrayBuffer
export const fileToArrayBuffer = async (file: File) => {
  const reader = new FileReader();
  reader.readAsArrayBuffer(file);
  return new Promise<ArrayBuffer>((resolve) => {
    reader.onload = () => {
      resolve(reader.result as ArrayBuffer);
    };
  });
};
