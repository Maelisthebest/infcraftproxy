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
        "Cookie": "cf_clearance=MeuKZ2mkBQHcCdpkDlArbWNIcksD8kbeg1pRznbXrQE-1791546453-1.2.1.1-ldEvtWy6omJyewKWIynPhb.xBatQS_XMf06PnwLXW87yTPy7NLqj3MwdX.YYqvo3kR2jpdwmxwd_zWflVUGQHKR1tNWcP5Yr.Y8kuEN7LdKiAtgDfWJoxxzX6wwjIm9QZzZEMk__2pTREYRSdj9MiLaqTyvM2vPtI7llMjANGioSiv8SKwk.pi2LP.QicxmdULUWgHruIRuU0iw882N_xn7_OfLldDV33mM0XZocyVfNJZuIyT79aC_6hCfAPNIf8t2rCmG4K3R817j0PtvMspuBVdii.CglHlrXbL0qkcyWIwy_IgNDNX_3nW3gkXKr9txRrOgcJaCLWx5dXu.qkcrKt9u30qWoiALhPd_As7EvwBV5GekJ8R.bRN9ke_KETHjAVrrkkY_6iAuLlgL5HYfurVOElUeBUdkc_n5.mh446AJIGB.hJSN8E2B0pcLXYUUvAfW.a7I3pMxz.L1TnYsBtWhJwTbGQPJCqkD3E5VN0naxNDWofgL0Galdrq.Yrz8WMO2ZMweKOOp7RM.T3A",
        "x-craft-session": "901a4d60-dfa6-4625-8a46-f6c0eabe9e65"
      },
    });

    const data = await apiResponse.json();
    return res.status(apiResponse.status).json(data);

  } catch (err) {
    return res.status(502).json({ error: "Fehler beim Proxy-Aufruf", details: err.message });
  }
}
