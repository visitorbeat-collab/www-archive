function normalize(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[.,!?;:]+$/g, "")
    .replace(/\s+/g, " ");
}


function getAcceptedResponses(secretValue) {
  return String(secretValue || "")
    .split("|")
    .map(normalize)
    .filter(Boolean);
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


export async function onRequestPost(context) {
  const formData = await context.request.formData();

  const submitted = normalize(
    formData.get("response")
  );

  const acceptedResponses = getAcceptedResponses(
    context.env.RESTRICTED_PASSWORD
  );

  if (acceptedResponses.length === 0) {
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

  const accepted = acceptedResponses.includes(submitted);

  if (!accepted) {
    return Response.redirect(
      new URL(
        "/restricted/?error=1",
        context.request.url
      ),
      303
    );
  }

  const cookieSecret =
    context.env.RESTRICTED_COOKIE_SECRET;

  if (!cookieSecret) {
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

  const token = await signAccess(cookieSecret);

  return new Response(null, {
    status: 303,

    headers: {
      "Location": "/restricted/archive/",

      "Set-Cookie":
        `restricted_access=${token}; ` +
        `Path=/restricted; ` +
        `HttpOnly; ` +
        `Secure; ` +
        `SameSite=Lax; ` +
        `Max-Age=86400`
    }
  });
}