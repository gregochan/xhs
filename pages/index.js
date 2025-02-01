import { useState } from "react";
import { marked } from "marked";

export default function Home() {
    const [type, setType] = useState("product");
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [wordCount, setWordCount] = useState(130);
    const [temperature, setTemperature] = useState(0.6);
    const [output, setOutput] = useState("");

    const generateCopy = async () => {
        if (!productName || !productDescription) {
            alert("请填写所有字段！");
            return;
        }

        const response = await fetch("/api/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                type,
                product_name: productName,
                product_description: productDescription,
                word_count: wordCount,
                temperature
            })
        });

        const data = await response.json();
        setOutput(marked.parse(data.text || "生成失败，请稍后重试。"));
    };

    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
            <h2>小红书文案生成器</h2>
            <label>
                <input type="radio" name="type" value="product" checked={type === "product"} onChange={() => setType("product")} /> 产品文案
            </label>
            <label>
                <input type="radio" name="type" value="event" checked={type === "event"} onChange={() => setType("event")} /> 活动物案
            </label>
            <br /><br />
            <label>产品/活动名称：</label>
            <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="请输入名称" />
            <br /><br />
            <label>产品/活动描述：</label>
            <textarea value={productDescription} onChange={(e) => setProductDescription(e.target.value)} rows="4" placeholder="请输入描述"></textarea>
            <br /><br />
            <label>字数要求：</label>
            <input type="number" min="130" max="300" value={wordCount} onChange={(e) => setWordCount(e.target.value)} />
            <br /><br />
            <label>温度 (Temperature)：</label>
            <input type="range" min="0.1" max="1.0" step="0.05" value={temperature} onChange={(e) => setTemperature(e.target.value)} />
            <span> {temperature} </span>
            <br /><br />
            <button onClick={generateCopy}>生成文案</button>
            <h3>生成的文案：</h3>
            <div dangerouslySetInnerHTML={{ __html: output }}></div>
        </div>
    );
}
