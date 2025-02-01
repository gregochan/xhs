import { useState } from "react";
import { marked } from "marked";
import styles from "../styles/Home.module.css"; // Import a CSS module for better styling

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
        let formattedText = data.text || "生成失败，请稍后重试。";

        // Stylize <think> sections
        formattedText = formattedText.replace(/<think>(.*?)<\/think>/g, '<span class="think-style">$1</span>');

        setOutput(marked.parse(formattedText));
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>小红书文案生成器</h2>
            <div className={styles.flexContainer}>
                <div className={styles.inputSection}>
                    <label className={styles.radioLabel}>
                        <input type="radio" name="type" value="product" checked={type === "product"} onChange={() => setType("product")} /> 产品文案
                    </label>
                    <label className={styles.radioLabel}>
                        <input type="radio" name="type" value="event" checked={type === "event"} onChange={() => setType("event")} /> 活动物案
                    </label>
                    <br /><br />
                    <label className={styles.label}>产品/活动名称：</label>
                    <input type="text" className={styles.input} value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="请输入名称" />
                    <br /><br />
                    <label className={styles.label}>产品/活动描述：</label>
                    <textarea className={styles.textarea} value={productDescription} onChange={(e) => setProductDescription(e.target.value)} rows="4" placeholder="请输入描述"></textarea>
                    <br /><br />
                    <label className={styles.label}>字数要求：</label>
                    <input type="number" className={styles.input} min="130" max="300" value={wordCount} onChange={(e) => setWordCount(e.target.value)} />
                    <br /><br />
                    <label className={styles.label}>温度 (Temperature)：</label>
                    <input type="range" className={styles.slider} min="0.1" max="1.0" step="0.05" value={temperature} onChange={(e) => setTemperature(e.target.value)} />
                    <span className={styles.tempValue}> {temperature} </span>
                    <br /><br />
                    <button className={styles.button} onClick={generateCopy}>生成文案</button>
                </div>
                <div className={styles.outputSection}>
                    <h3 className={styles.subtitle}>生成的文案：</h3>
                    <div className={styles.output} dangerouslySetInnerHTML={{ __html: output }}></div>
                </div>
            </div>
        </div>
    );
}
