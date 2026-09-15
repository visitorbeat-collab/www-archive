const COOKIE_NAME = "restricted_access";
const COOKIE_PAYLOAD = "restricted-access-v1";


function base64UrlEncode(buffer) {
  const bytes =
    new Uint8Array(buffer);

  let binary = "";

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}


async function hmacSign(
  secret,
  value
) {
  const encoder =
    new TextEncoder();

  const key =
    await crypto.subtle.importKey(
      "raw",
      encoder.encode(secret),
      {
        name: "HMAC",
        hash: "SHA-256"
      },
      false,
      ["sign"]
    );

  const signature =
    await crypto.subtle.sign(
      "HMAC",
      key,
      encoder.encode(value)
    );

  return base64UrlEncode(
    signature
  );
}


function safeEqual(
  left,
  right
) {
  if (
    typeof left !== "string" ||
    typeof right !== "string" ||
    left.length !== right.length
  ) {
    return false;
  }

  let difference = 0;

  for (
    let i = 0;
    i < left.length;
    i += 1
  ) {
    difference |=
      left.charCodeAt(i) ^
      right.charCodeAt(i);
  }

  return difference === 0;
}


export async function onRequestGet(
  context
) {
  const {
    request,
    env
  } = context;


  /*
    Both secrets must exist.

    RESTRICTED_COOKIE_SECRET is the existing signing secret.

    RESTRICTED_DEV_TOKEN is a new, separate secret used only
    for this development entry route.
  */

  if (
    !env.RESTRICTED_COOKIE_SECRET ||
    !env.RESTRICTED_DEV_TOKEN
  ) {
    return new Response(
      "Not found.",
      {
        status: 404
      }
    );
  }


  const url =
    new URL(
      request.url
    );

  const suppliedToken =
    url.searchParams.get(
      "token"
    ) || "";


  /*
    Invalid requests deliberately look like a missing page.
  */

  if (
    !safeEqual(
      suppliedToken,
      env.RESTRICTED_DEV_TOKEN
    )
  ) {
    return new Response(
      "Not found.",
      {
        status: 404
      }
    );
  }


  /*
    Generate exactly the same cookie signature expected by
    the restricted archive middleware.
  */

  const cookieValue =
    await hmacSign(
      env.RESTRICTED_COOKIE_SECRET,
      COOKIE_PAYLOAD
    );


  const headers =
    new Headers();

  headers.set(
    "Location",
    "/restricted/archive/"
  );

  headers.append(
    "Set-Cookie",
    [
      `${COOKIE_NAME}=${cookieValue}`,
      "Path=/restricted",
      "HttpOnly",
      "Secure",
      "SameSite=Lax",
      "Max-Age=86400"
    ].join("; ")
  );


  return new Response(
    null,
    {
      status: 302,
      headers
    }
  );
}