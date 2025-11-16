import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;

export const openai = apiKey
  ? new OpenAI({ apiKey })
  : {
      chat: {
        completions: {
          create: async () => {
            throw new Error(
              "OPENAI_API_KEY is missing. Set the env var to enable OpenAI features."
            );
          },
        },
      },
    } as unknown as OpenAI;