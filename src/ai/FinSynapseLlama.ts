// 🔐 FinSynapseLlama.ts
// Secure local interface to talk to your private LLaMA model via Ollama

import fetch from 'node-fetch'

const LLA MA_ENDPOINT = 'http://localhost:11434/api/generate'

export async function talkToFinSynapse(prompt: string): Promise<string> {
  try {
    const response = await fetch(LLAMA_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama3', // Change this to your Ollama model name if different
        prompt: prompt,
        stream: false
      })
    })

    const data = await response.json()

    if (!data || !data.response) {
      throw new Error('No response from LLaMA.')
    }

    return data.response.trim()
  } catch (err) {
    console.error('[FinSynapseLlama] Error:', err)
    return '⚠️ Local LLaMA communication failed.'
  }
}
