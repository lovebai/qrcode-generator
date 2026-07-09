import React, { useState, useRef } from "react";
import { Upload, message, Spin, Tag } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import jsQR from "jsqr";

const { Dragger } = Upload;

const CodeDecoder = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [decoding, setDecoding] = useState(false);
  const [result, setResult] = useState(null);
  const canvasRef = useRef(null);

  const decodeImage = (dataUrl) => {
    setDecoding(true);
    setResult(null);

    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      let width = img.naturalWidth;
      let height = img.naturalHeight;

      const maxSize = 1024;
      if (width > maxSize || height > maxSize) {
        const ratio = Math.min(maxSize / width, maxSize / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      const imageData = ctx.getImageData(0, 0, width, height);

      const decodeWithDelay = setTimeout(async () => {
        let decodedResult = null;

        const qrCode = jsQR(imageData.data, imageData.width, imageData.height);
        if (qrCode) {
          decodedResult = {
            type: "QR Code",
            value: qrCode.data,
          };
        }

        if (!decodedResult) {
          try {
            const Quagga = await import("@ericblade/quagga2");
            const barcodeResult = await new Promise((resolve) => {
              Quagga.default.decodeSingle(
                {
                  decoder: {
                    readers: [
                      "code_128_reader",
                      "ean_reader",
                      "ean_8_reader",
                      "code_39_reader",
                      "upc_reader",
                      "upc_e_reader",
                      "codabar_reader",
                      "i2of5_reader",
                    ],
                  },
                  locate: true,
                  src: dataUrl,
                },
                (res) => {
                  resolve(res);
                }
              );
            });
            if (barcodeResult && barcodeResult.codeResult) {
              decodedResult = {
                type: mapBarcodeFormat(barcodeResult.codeResult.format),
                value: barcodeResult.codeResult.code,
              };
            }
          } catch (e) {
            console.error("Barcode decoding error:", e);
          }
        }

        setDecoding(false);
        if (decodedResult) {
          setResult(decodedResult);
          message.success("Decoded successfully!");
        } else {
          setResult(null);
          message.warning(
            "No QR code or barcode detected in the image. Try a clearer image."
          );
        }
      }, 100);

      return () => clearTimeout(decodeWithDelay);
    };
    img.onerror = () => {
      setDecoding(false);
      message.error("Failed to load image");
    };
    img.src = dataUrl;
  };

  const mapBarcodeFormat = (format) => {
    const formatMap = {
      code_128: "CODE128",
      code_39: "CODE39",
      ean_13: "EAN-13",
      ean_8: "EAN-8",
      upc_a: "UPC-A",
      upc_e: "UPC-E",
      codabar: "Codabar",
      i2of5: "ITF",
    };
    return formatMap[format] || (format ? format.toUpperCase() : "Barcode");
  };

  const handleFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      setImageUrl(dataUrl);
      decodeImage(dataUrl);
    };
    reader.readAsDataURL(file);
    return false;
  };

  return (
    <div>
      <Dragger
        name="file"
        multiple={false}
        showUploadList={false}
        beforeUpload={handleFile}
        accept="image/png,image/jpeg,image/webp,image/bmp,image/gif"
        style={{ marginBottom: 16 }}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag an image here to decode
        </p>
        <p className="ant-upload-hint">
          Supports PNG, JPEG, WebP, BMP, GIF
        </p>
      </Dragger>

      <canvas
        ref={canvasRef}
        style={{ display: "none" }}
      />

      {decoding && (
        <div style={{ textAlign: "center", padding: "24px 0" }}>
          <Spin tip="Decoding..." />
        </div>
      )}

      {imageUrl && !decoding && (
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <img
            src={imageUrl}
            alt="Uploaded"
            style={{
              maxWidth: "100%",
              maxHeight: 240,
              borderRadius: 8,
              border: "1px solid #d2d2d7",
            }}
          />
        </div>
      )}

      {result && (
        <div
          style={{
            padding: 12,
            border: "1px solid #d2d2d7",
            borderRadius: 8,
            backgroundColor: "#f5f5f7",
          }}
        >
          <div style={{ marginBottom: 8 }}>
            <Tag color="blue">{result.type}</Tag>
          </div>
          <div
            style={{
              fontSize: 14,
              color: "#1d1d1f",
              wordBreak: "break-all",
            }}
          >
            {result.value}
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeDecoder;
