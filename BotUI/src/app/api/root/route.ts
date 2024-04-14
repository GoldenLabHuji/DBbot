import { QueryWords } from "@/app/general/interfaces";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const url = process.env.api_url;
    const wordsParams: QueryWords = await request.json();
    const wordsLimit = 10;

    const response = await fetch(`${url}/${wordsLimit}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            age_of_aquisition: wordsParams?.age_of_aquisition,
            n_phon: wordsParams?.number_of_phon,
            n_syll: wordsParams?.number_of_syll,
            start_with: wordsParams?.start_with,
            sound_like: wordsParams?.sound_like,
        }),
    });

    const data = await response.json();

    return NextResponse.json({ data });
}
