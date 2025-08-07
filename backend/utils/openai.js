import "dotenv/config";

const getOpenAIAPIResponse = async (message) => {
  const options = {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    },
    body: JSON.stringify({
      model: "mistralai/mistral-small-24b-instruct-2501:free",
      messages: [
        {
          role: "user",
          content: message
        }
      ]
    })
  };

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", options);
    const data = await response.json();
    return data?.choices?.[0]?.message?.content || "No response."; 
  } catch (err) {
    console.error("Error fetching from OpenRouter:", err);
    return { error: "Failed to fetch from OpenRouter" };
  }
};

export default getOpenAIAPIResponse;
