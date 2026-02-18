import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    // 1. Initialize Gemini Flash
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: { responseMimeType: "application/json" },
    });

    const systemPrompt = `You are a movie recommendation expert for a movie database tmdb. Based on the user's request, suggest ONE movie or TV show. 
    Return ONLY a JSON object with: {"title": "string", "year": "string", "type": "a string of the exact word 'movie' or 'tv' depending on which one you suggested", "reason": "one summary paragraph"}`;

    const result = await model.generateContent([systemPrompt, prompt]);
    const aiResponse = JSON.parse(result.response.text());

    // 2. Bridge to TMDB to get real data (Posters/IDs)
    const tmdbSearch = await fetch(
      `https://api.themoviedb.org/3/search/${aiResponse.type}?api_key=${process.env.TMDB_API_KEY}&query=${encodeURIComponent(aiResponse.title)}&primary_release_year=${aiResponse.year || ""}`,
    );
    const tmdbData = await tmdbSearch.json();
    const bestMatch = tmdbData.results?.[0];


    if (!bestMatch) throw new Error("Movie not found in database");

    return NextResponse.json({
      ...bestMatch,
      aiReason: aiResponse.reason,
      media_type: aiResponse.type,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "FlickMind is resting. Try again!" },
      { status: 500 },
    );
  }
}
