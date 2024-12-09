import { LangChainAdapter } from 'ai';

import { getLyricsFromUserPrompt } from '@/app/lib/get-lyrics';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { prompt }: { prompt: string } = await req.json();
  
  try {
    const stream = await getLyricsFromUserPrompt(prompt);

    return LangChainAdapter.toDataStreamResponse(stream);
  } catch(e) {
    console.error(e);
    return Response.error();
  }
}