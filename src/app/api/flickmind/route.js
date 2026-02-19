import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    // Basic Origin Check: Only allow requests from your domain
    const origin = req.headers.get("origin");
    if (process.env.NODE_ENV === "production" && origin !== "https://www.14flick.live") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { prompt } = await req.json();
    if (!prompt || prompt.length > 300) throw new Error("Invalid Prompt");

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: { responseMimeType: "application/json" },
    });

    const systemPrompt = `You are a movie recommendation expert for tmdb. Suggest ONE movie or TV show. Return ONLY JSON: {"title": "string", "year": "string", "type": "movie"|"tv", "reason": "one summary paragraph"}`;

    const result = await model.generateContent([systemPrompt, prompt]);
    const aiResponse = JSON.parse(result.response.text());

    // Use a long-term cache for the AI's TMDB search to save CPU
    const tmdbSearch = await fetch(
      `https://api.themoviedb.org/3/search/${aiResponse.type}?api_key=${process.env.TMDB_API_KEY}&query=${encodeURIComponent(aiResponse.title)}&primary_release_year=${aiResponse.year || ""}`,
      { next: { revalidate: 604800 } } // Cache this search result for 1 week
    );
    
    const tmdbData = await tmdbSearch.json();
    const bestMatch = tmdbData.results?.[0];

    if (!bestMatch) throw new Error("Not found");

    return NextResponse.json({ ...bestMatch, aiReason: aiResponse.reason, media_type: aiResponse.type });
  } catch (error) {
    return NextResponse.json({ error: "AI temporary unavailable" }, { status: 500 });
  }
}