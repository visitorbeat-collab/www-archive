function getCookie(request, name) {
  const cookieHeader = request.headers.get("Cookie");

  if (!cookieHeader) {
    return null;
  }

  const cookies = cookieHeader.split(";");

  for (const cookie of cookies) {
    const [key, ...valueParts] = cookie.trim().split("=");

    if (key === name) {
      return valueParts.join("=");
    }
  }

  return null;
}


async function signAccess(secret) {
  const encoder = new TextEncoder();

  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    {
      name: "HMAC",
      hash: "SHA-256"
    },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode("restricted-access-v1")
  );

  return Array.from(new Uint8Array(signature))
    .map(byte => byte.toString(16).padStart(2, "0"))
    .join("");
}


export async function onRequest(context) {
  const secret = context.env.RESTRICTED_COOKIE_SECRET;

  if (!secret) {
    return new Response(
      "restricted configuration unavailable",
      {
        status: 500,
        headers: {
          "Content-Type": "text/plain; charset=UTF-8"
        }
      }
    );
  }

  const expectedToken = await signAccess(secret);

  const suppliedToken = getCookie(
    context.request,
    "restricted_access"
  );

  if (suppliedToken !== expectedToken) {
    return Response.redirect(
      new URL("/restricted/", context.request.url),
      302
    );
  }

  return context.next();
}