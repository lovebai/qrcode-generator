import React, { useState } from "react";
import { Card, Tabs, Input, Button } from "antd";
import QRCode from "qrcode.react";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";

const { TextArea } = Input;

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [selectedKey, setSelectedKey] = useState("1");
  const [temp, setTemp] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleInputChange1 = (e) => {
    setTemp(e.target.value);
  };

  const handleTabChange = (key) => {
    setSelectedKey(key);
    setInputValue("");
  };

  const handleKey4=()=>{
    if (selectedKey==="3"){
      return `tel:${inputValue}`
    }else if(selectedKey==="4"){
      // if(/^\d{3,16}$/.test(inputValue)){
      //   setTemp(inputValue)
      // }
     return`sms:${inputValue}?body=${encodeURIComponent(temp)}`
    }else {
      return inputValue
    }

  }

  // const qrValue =
  //   selectedKey === "3"
  //     ? `tel:${inputValue}`
  //     : selectedKey === "4"
  //     ? `smsto:${inputValue}:${inputValue}`
  //     : inputValue;
  const qrValue = handleKey4()

  const tabItems = [
    {
      key: "1",
      label: "文本",
      children: (
        <div>
        <TextArea
          rows={8}
          value={inputValue}
          onChange={handleInputChange}
          placeholder="请输入文本内容"
        />
        </div>
        
      ),
    },
    {
      key: "2",
      label: "链接",
      children: (
        <div>
        <Input
          value={inputValue}
          onChange={handleInputChange}
          placeholder="请输入链接地址"
        />
        </div>
        
      ),
    },
    {
      key: "3",
      label: "拨号",
      children: (
        <div>
        <Input
          value={inputValue}
          onChange={handleInputChange}
          placeholder="请输入电话号码"
        />
        </div>
        
      ),
    },
     {
      key: "4",
      label: "短信",
      disabled:false,
      children: (
        <div>
        <Input
          value={inputValue}
          onChange={handleInputChange}
          placeholder="请输入电话号码"
        />
        <TextArea rows={6} placeholder="请输入短信内容"
        value={temp}
        onChange={handleInputChange1}
        style={{marginTop:'1rem'}} />
        </div>
      ),
    },
  ];

    const handleSave = () => {
    const qrCodeNode = document.getElementById("qr-code");
    // 将 QRCode 转换成图片
    html2canvas(qrCodeNode).then(function (canvas) {
      // 提供下载链接
      canvas.toBlob(function (blob) {
        saveAs(blob, "qrcode.png");
      });
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "24px",
      }}
    >
      <Card style={{ width: "100%" }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
        <Tabs
          style={{ width: "60%" }}
          defaultActiveKey="1"
          activeKey={selectedKey}
          onChange={handleTabChange}
          items={tabItems}
        />
        <div style={{ width: "50%", paddingLeft: "16px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <div
              style={{display: "flex",flexDirection: "column",margin: "14px"
      }}>
                <QRCode id="qr-code" value={qrValue} size={230} />
                <div
                style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "1rem"
              }}
                ><Button type="primary" onClick={handleSave}>保存二维码</Button></div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default App;
