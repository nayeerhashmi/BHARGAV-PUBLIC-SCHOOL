export async function onRequestPost({ request, env }) {
  const headers = { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" };
  const reply = (status, body) => new Response(JSON.stringify(body), { status, headers });
  if (!env.MSG91_AUTHKEY || !env.MSG91_OTP_TEMPLATE_ID) return reply(503, { error: "SMS verification is not configured yet. Please contact the school." });
  let data;
  try { data = await request.json(); } catch { return reply(400, { error: "Invalid request." }); }
  const phone = String(data.phone || "");
  if (!/^\+91[6-9]\d{9}$/.test(phone)) return reply(400, { error: "Enter a valid Indian mobile number." });
  try {
    const response = await fetch("https://control.msg91.com/api/v5/otp?template_id=" + encodeURIComponent(env.MSG91_OTP_TEMPLATE_ID) + "&mobile=" + encodeURIComponent(phone.slice(1)) + "&otp_length=6&otp_expiry=5", {
      method: "POST",
      headers: { authkey: env.MSG91_AUTHKEY, "content-type": "application/json", accept: "application/json" },
      body: JSON.stringify({})
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || result.type === "error" || result.status === "error") return reply(502, { error: "The SMS provider could not send a code. Please try again later." });
    return reply(200, { ok: true, message: "OTP request accepted." });
  } catch {
    return reply(502, { error: "Could not reach the SMS provider. Please try again later." });
  }
}