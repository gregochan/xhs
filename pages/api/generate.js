import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Only POST requests allowed" });
    }

    try {
        const { type, product_name, product_description, word_count, temperature } = req.body;

        if (!type || !product_name || !product_description || !word_count || !temperature) {
            return res.status(400).json({ error: "Missing parameters." });
        }

        let prompt = type === "product"
            ? `# 产品文案助理\n请为产品“${product_name}”撰写一篇小红书风格的产品文案。\n${product_description}\n\n## 要求\n- 文案字数不少于${word_count}字\n- 加入emoji和吸引用户的元素\n- 结尾包含5-10个合适的#标签`
            : `# 活动文案助理\n请为活动“${product_name}”撰写一篇小红书风格的活动文案。\n${product_description}\n\n## 要求\n- 文案字数不少于${word_count}字\n- 加入emoji和吸引用户的元素\n- 结尾包含5-10个合适的#标签`;

        console.log("Sending prompt to Groq:", prompt);

        const chatCompletion = await groq.chat.completions.create({
            model: "deepseek-r1-distill-llama-70b",
            messages: [{ role: "user", content: prompt }],
            temperature: parseFloat(temperature),
            max_tokens: 4096,
            top_p: 0.95,
            stream: false // Disable streaming to handle response properly
        });

        console.log("Groq API Response:", chatCompletion);

        const generatedText = chatCompletion.choices?.[0]?.message?.content || "生成失败，请稍后重试。";

        return res.status(200).json({ text: generatedText });

    } catch (error) {
        console.error("API Error:", error);
        return res.status(500).json({ error: "API 调用失败", details: error.message });
    }
}
