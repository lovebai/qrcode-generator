import React, { useState } from "react";
import { Card, Tabs, Input, Button, ConfigProvider, theme } from "antd";
import QRCode from "qrcode.react";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import { v4 as uuid } from "uuid";

const { TextArea } = Input;

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [selectedKey, setSelectedKey] = useState("1");
  const [temp, setTemp] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleSmsNumberChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleSmsBodyChange = (e) => {
    setTemp(e.target.value);
  };

  const handleTabChange = (key) => {
    setSelectedKey(key);
    setInputValue("");
  };

  const handleKey4 = () => {
    if (selectedKey === "3") {
      return `tel:${inputValue}`;
    } else if (selectedKey === "4") {
      return `sms:${inputValue}?body=${encodeURIComponent(temp)}`;
    } else {
      return inputValue;
    }
  };

  const qrValue = handleKey4();

  const tabItems = [
    {
      key: "1",
      label: "Text",
      children: (
        <div>
          <TextArea
            rows={8}
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter text content"
          />
        </div>
      ),
    },
    {
      key: "2",
      label: "Link",
      children: (
        <div>
          <Input
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter URL"
          />
        </div>
      ),
    },
    {
      key: "3",
      label: "Phone",
      children: (
        <div>
          <Input
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter phone number"
          />
        </div>
      ),
    },
    {
      key: "4",
      label: "SMS",
      children: (
        <div>
          <Input
            value={inputValue}
            onChange={handleSmsNumberChange}
            placeholder="Enter phone number"
          />
          <TextArea
            rows={6}
            placeholder="Enter message body"
            value={temp}
            onChange={handleSmsBodyChange}
            style={{ marginTop: "12px" }}
          />
        </div>
      ),
    },
  ];

  const handleSave = () => {
    const qrCodeNode = document.getElementById("qr-code");
    html2canvas(qrCodeNode).then(function (canvas) {
      canvas.toBlob(function (blob) {
        saveAs(blob, `qrcode-${uuid()}.png`);
      });
    });
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: "#007aff",
          colorBgContainer: "#ffffff",
          colorBgElevated: "#ffffff",
          colorText: "#1d1d1f",
          colorTextSecondary: "#424245",
          colorBorder: "#d2d2d7",
          borderRadius: 8,
          fontFamily:
            '"IBM Plex Mono", "Berkeley Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
        },
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "24px",
          minHeight: "100vh",
          boxSizing: "border-box",
          backgroundColor: "#ffffff",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "90%",
            /**maxWidth: "960px",**/
          }}
        >
          <div style={{ marginBottom: "40px" }}>
            <h1
              style={{
                color: "#1d1d1f",
                fontSize: "28px",
                fontWeight: 500,
                margin: 0,
                letterSpacing: "-0.02em",
              }}
            >
              QR Code Generator
            </h1>
            <p
              style={{
                color: "#6e6e73",
                fontSize: "14px",
                margin: "8px 0 0 0",
              }}
            >
              Generate QR codes from text, links, and phone numbers
            </p>
          </div>
          <Card
            style={{
              width: "100%",
              backgroundColor: "#ffffff",
              border: "1px solid #d2d2d7",
              borderRadius: 8,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: "24px",
              }}
            >
              <div style={{ flex: "1 1 300px", minWidth: 0 }}>
                <Tabs
                  defaultActiveKey="1"
                  activeKey={selectedKey}
                  onChange={handleTabChange}
                  items={tabItems}
                />
              </div>
              <div
                style={{
                  flex: "0 0 auto",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  maxWidth: "280px",
                  margin: "0 auto",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "20px",
                  }}
                >
                  <QRCode
                    id="qr-code"
                    value={qrValue || " "}
                    size={230}
                    bgColor="#ffffff"
                  />
                  <Button
                    type="primary"
                    onClick={handleSave}
                    style={{
                      width: "100%",
                      height: 40,
                      fontSize: 14,
                      fontWeight: 500,
                      borderRadius: 8,
                      fontFamily: '"IBM Plex Mono", "Berkeley Mono", ui-monospace, monospace',
                    }}
                  >
                    Save QR Code
                  </Button>
                </div>
              </div>
            </div>
          </Card>
          <div
            style={{
              textAlign: "center",
              marginTop: "32px",
              color: "#86868b",
              fontSize: "12px",
            }}
          >
         Hope you have a happy day every day.  
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default App;
