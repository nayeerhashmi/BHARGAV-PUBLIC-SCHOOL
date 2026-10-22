export async function onRequestPost({ request, env }) {
  const headers = { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" };
  const reply = (status, body) => new Response(JSON.stringify(body), { status, headers });
  if (!env.MSG91_AUTHKEY || !env.FEEDBACK_DB) return reply(503, { error: "Feedback verification is not configured yet. Please contact the school." });
  let data;
  try { data = await request.json(); } catch { return reply(400, { error: "Invalid request." }); }
  const name = String(data.name || "").trim();
  const phone = String(data.phone || "");
  const otp = String(data.otp || "").trim();
  const type = String(data.type || "").trim();
  const message = String(data.message || "").trim();
  if (name.length < 2 || name.length > 80) return reply(400, { error: "Enter a name between 2 and 80 characters." });
  if (!/^\+91[6-9]\d{9}$/.test(phone)) return reply(400, { error: "Enter a valid Indian mobile number." });
  if (!/^\d{4,8}$/.test(otp)) return reply(400, { error: "Enter the verification code from your SMS." });
  if (!["Appreciation", "Suggestion", "Concern", "General feedback"].includes(type)) return reply(400, { error: "Choose a feedback category." });
  if (message.length < 5 || message.length > 2000) return reply(400, { error: "Feedback must be between 5 and 2000 characters." });
  try {
    const verifyUrl = "https://control.msg91.com/api/v5/otp/verify?mobile=" + encodeURIComponent(phone.slice(1)) + "&otp=" + encodeURIComponent(otp);
    const verified = await fetch(verifyUrl, { method: "GET", headers: { authkey: env.MSG91_AUTHKEY, accept: "application/json" } });
    const result = await verified.json().catch(() => ({}));
    const success = verified.ok && (String(result.type || "").toLowerCase() === "success" || String(result.message || "").toLowerCase().includes("verified") || String(result.status || "").toLowerCase() === "success");
    if (!success) return reply(400, { error: "That code could not be verified. Check it and try again." });
    await env.FEEDBACK_DB.prepare("INSERT INTO feedback (name, phone, category, message, created_at) VALUES (?, ?, ?, ?, datetime('now'))").bind(name, phone, type, message).run();
    return reply(200, { ok: true });
  } catch {
    return reply(502, { error: "Verification or submission failed. Please try again later." });
  }
}