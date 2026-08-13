import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { topic, details, style } = body;

    // -----------------------------
    // VALIDATION
    // -----------------------------

    if (!topic || typeof topic !== "string" || !topic.trim()) {
      return NextResponse.json(
        { error: "Post topic is required." },
        { status: 400 }
      );
    }

    // -----------------------------
    // PROMPT
    // -----------------------------

    const prompt = `
You are an expert Instagram content strategist and social media copywriter.

Create Instagram content based ONLY on the information provided by the user.

POST TOPIC:
${topic}

EXTRA DETAILS:
${details || "No additional details provided."}

CAPTION STYLE:
${style || "Engaging"}

Generate exactly:

1. 5 Instagram caption ideas
2. 10 relevant Instagram hashtags

IMPORTANT RULES:

- Do not invent facts about the user's post.
- Do not claim something happened if the user did not provide that information.
- Keep captions natural and human-like.
- Make captions suitable for Instagram.
- Follow the requested style.
- Avoid unnecessary explanations.
- Hashtags must be relevant to the topic.
- Do not put numbers before hashtags.
- Every hashtag must begin with #.
- Return ONLY valid JSON.
- Do not use Markdown.
- Do not use code fences.
- Do not add text before or after the JSON.

Use EXACTLY this JSON structure:

{
  "captions": [
    "Caption idea 1",
    "Caption idea 2",
    "Caption idea 3",
    "Caption idea 4",
    "Caption idea 5"
  ],
  "hashtags": [
    "#hashtag1",
    "#hashtag2",
    "#hashtag3",
    "#hashtag4",
    "#hashtag5",
    "#hashtag6",
    "#hashtag7",
    "#hashtag8",
    "#hashtag9",
    "#hashtag10"
  ]
}
`;

    // -----------------------------
    // GEMINI
    // -----------------------------

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text;

    console.log("AI RESPONSE:", text);

    if (!text) {
      throw new Error("Gemini returned an empty response.");
    }

    // -----------------------------
    // PARSE AI JSON
    // -----------------------------

    let parsed;

    try {
      parsed = JSON.parse(text);
    } catch (parseError) {
      console.error("JSON PARSE ERROR:", parseError);
      console.error("RAW GEMINI RESPONSE:", text);

      throw new Error("AI returned an invalid response format.");
    }

    // -----------------------------
    // VALIDATE RESULT
    // -----------------------------

    const captions = Array.isArray(parsed?.captions)
      ? parsed.captions.filter(
          (item: unknown): item is string =>
            typeof item === "string" && item.trim().length > 0
        )
      : [];

    const hashtags = Array.isArray(parsed?.hashtags)
      ? parsed.hashtags
          .filter(
            (item: unknown): item is string =>
              typeof item === "string" && item.trim().length > 0
          )
          .map((tag: string) => {
            const cleaned = tag.trim();

            return cleaned.startsWith("#")
              ? cleaned
              : `#${cleaned.replace(/^#+/, "")}`;
          })
      : [];

    if (captions.length === 0) {
      throw new Error("No caption ideas were generated.");
    }

    if (hashtags.length === 0) {
      throw new Error("No hashtags were generated.");
    }

    // -----------------------------
    // SEND TO FRONTEND
    // -----------------------------

    return NextResponse.json({
      success: true,
      result: {
        captions,
        hashtags,
      },
    });
  } catch (error) {
    console.error("INSTAGRAM GENERATION ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unable to generate Instagram content.",
      },
      { status: 500 }
    );
  }
}