const UPLOADTHING_API_URL = 'https://api.uploadthing.com';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function callUploadThingApi(endpoint: string, method: 'GET' | 'POST' | 'DELETE' = 'GET') {
  const response = await fetch(`${UPLOADTHING_API_URL}${endpoint}`, {
    method,
    headers: {
      'Authorization': `Bearer ${process.env.UPLOADTHING_SECRET}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`UploadThing API error: ${response.statusText}`);
  }

  return response.json();
}

// ... rest of the code remains the same