import React, { useRef, useEffect, forwardRef } from "react";
import JsBarcode from "jsbarcode";

const barcodeFormats = [
  { value: "CODE128", label: "CODE128" },
  { value: "CODE39", label: "CODE39" },
  { value: "EAN-13", label: "EAN-13" },
  { value: "EAN-8", label: "EAN-8" },
  { value: "UPC-A", label: "UPC-A" },
  { value: "UPC-E", label: "UPC-E" },
  { value: "CODABAR", label: "Codabar" },
  { value: "ITF", label: "ITF-14" },
  { value: "MSI", label: "MSI" },
  { value: "PHARMACODE", label: "Pharmacode" },
];

const BarcodeGenerator = forwardRef(({ value, format }, ref) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (svgRef.current && value) {
      try {
        JsBarcode(svgRef.current, value, {
          format: format || "CODE128",
          width: 2,
          height: 80,
          displayValue: true,
          font: "monospace",
          fontSize: 16,
          margin: 10,
          background: "#ffffff",
        });
      } catch (e) {
        console.error("Barcode generation error:", e);
      }
    }
  }, [value, format]);

  return (
    <div
      ref={ref}
      id="barcode"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: 160,
      }}
    >
      {value ? (
        <svg ref={svgRef} />
      ) : (
        <span style={{ color: "#86868b", fontSize: 14 }}>
          Enter content to generate barcode
        </span>
      )}
    </div>
  );
});

export { barcodeFormats };
export default BarcodeGenerator;
