import axios from "axios";

 const aiAssistantReply = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ message: "Prompt is required" });
  }

  try {
    const response = await axios.post("https://api.openai.com/v1/chat/completions",{
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const aiReply = response.data.choices[0].message.content;

    return res.status(200).json({ reply: aiReply });

  } catch (error) {
    console.log("AI Error:", error.message);
    return res.status(500).json({ message: "AI failed", error: error.message });
  }
};


export default aiAssistantReply