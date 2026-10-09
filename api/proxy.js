export default async function handler(req, res) {
  // CORS-Header setzen, damit GitHub Pages zugreifen darf
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { first, second } = req.query;

  if (!first || !second) {
    return res.status(400).json({ error: "Fehlende Parameter" });
  }

  const randomToken = crypto.randomUUID();
  const targetUrl = `https://neal.fun/api/infinite-craft/pair?first=${encodeURIComponent(first)}&second=${encodeURIComponent(second)}&token=${randomToken}`;

  try {
    const apiResponse = await fetch(targetUrl, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:140.0) Gecko/20100101 Firefox/140.0",
        "Accept": "*/*",
        "Accept-Language": "de,en-US;q=0.7,en;q=0.3",
        "Referer": "https://neal.fun/infinite-craft/",
        "Cookie": "cf_clearance=DEIN_AKTUELLER_COOKIE_HIER_EINTRAGEN",
        "x-craft-session": "901a4d60-dfa6-4625-8a46-f6c0eabe9e65"
      },
    });

    const data = await apiResponse.json();
    return res.status(apiResponse.status).json(data);

  } catch (err) {
    return res.status(502).json({ error: "Fehler beim Proxy-Aufruf", details: err.message });
  }
}
