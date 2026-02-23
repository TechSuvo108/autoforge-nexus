export async function generateRequirements(prompt: string) {
  const response = await fetch('/api/ai/requirements', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to generate requirements');
  }

  const data = await response.json();
  return data.text;
}

export async function generateCode(requirement: string, language: 'python' | 'cpp' | 'rust' = 'python') {
  const response = await fetch('/api/ai/code', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ requirement, language })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to generate code');
  }

  const data = await response.json();
  return data.text;
}
