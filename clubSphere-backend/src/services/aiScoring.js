const Groq = require('groq-sdk');
const client = new Groq({ apiKey: process.env.GROQ_API_KEY });
async function scoreCV(cvText, requirements) {
  try {
    const response = await client.chat.completions.create({
     model: 'llama-3.1-8b-instant',
      messages: [
        {
          role: 'user',
          content: `
You are evaluating a student CV.

Club Requirements:
${requirements}

Student CV:
${cvText}

Return ONLY JSON:
{
  "score": number (0-100),
  "feedback": "short explanation"
}
`
        }
      ]
    });

    const rawText = response.choices[0].message.content;

    console.log("RAW AI RESPONSE:", rawText);

    // ✅ Extract JSON safely
    const match = rawText.match(/\{[\s\S]*\}/);

    if (!match) {
      throw new Error("AI did not return valid JSON");
    }

    const parsed = JSON.parse(match[0]);

    // ✅ Safety check
    return {
      score: parsed.score || 0,
      feedback: parsed.feedback || "No feedback provided"
    };

 } catch (error) {
  console.error("AI SCORING ERROR:", error.message);
  console.error("Full error:", JSON.stringify(error, null, 2));
   

    // ✅ Fallback (important for production)
    return {
      score: 0,
      feedback: "AI evaluation failed"
    };
  }
}

module.exports = { scoreCV };