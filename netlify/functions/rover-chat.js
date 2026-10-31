const SYSTEM = `You are Rover, a calm outdoor-assistance demo robot. Keep replies short, clear, and safety-focused. You are not a medic and must not diagnose. Ask one useful follow-up question at a time. If someone describes an immediate life-threatening emergency, tell them to contact local emergency services and nearby people immediately. This is a project demonstration, not an emergency-response service.`;

function extractText(data) {
  if (typeof data.output_text === 'string') return data.output_text;
  const parts = [];
  for (const item of data.output || []) {
    for (const content of item.content || []) {
      if (typeof content.text === 'string') parts.push(content.text);
    }
  }
  return parts.join('\n').trim();
}

export default async (request) => {
  if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 });
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return Response.json({
      reply: "Rover demo is online, but the OpenAI API key has not been configured on this deployment yet.",
      demo: true
    });
  }

  try {
    const { messages = [] } = await request.json();
    const clean = messages.slice(-12).map(m => ({ role: m.role, content: String(m.content || '').slice(0, 3000) }));
    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-6-luna',
        instructions: SYSTEM,
        input: clean,
        max_output_tokens: 220
      })
    });

    if (!response.ok) {
      const body = await response.text();
      console.error('OpenAI error', response.status, body);
      return Response.json({ error: 'Conversation service is temporarily unavailable.' }, { status: 502 });
    }

    const data = await response.json();
    const reply = extractText(data) || 'I am here. Tell me what you need help with.';
    return Response.json({ reply });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Unable to process the conversation.' }, { status: 500 });
  }
};
