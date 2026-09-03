const ACCESS_VERSION =
  "restricted-access-v1";


function getCookie(
  request,
  name
) {
  const cookieHeader =
    request.headers.get(
      "Cookie"
    );


  if (!cookieHeader) {
    return null;
  }


  const cookies =
    cookieHeader.split(";");


  for (
    const cookie
    of cookies
  ) {
    const [
      key,
      ...valueParts
    ] =
      cookie
        .trim()
        .split("=");


    if (key === name) {
      return valueParts.join(
        "="
      );
    }
  }


  return null;
}


function hexFromBytes(bytes) {
  return Array.from(bytes)
    .map(
      byte =>
        byte
          .toString(16)
          .padStart(2, "0")
    )
    .join("");
}


async function signAccess(secret) {
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
      encoder.encode(
        ACCESS_VERSION
      )
    );


  return hexFromBytes(
    new Uint8Array(
      signature
    )
  );
}


function safeEqual(a, b) {
  if (
    typeof a !== "string" ||
    typeof b !== "string" ||
    a.length !== b.length
  ) {
    return false;
  }


  let difference = 0;


  for (
    let i = 0;
    i < a.length;
    i += 1
  ) {
    difference |=
      a.charCodeAt(i) ^
      b.charCodeAt(i);
  }


  return difference === 0;
}


export async function onRequest(
  context
) {
  const secret =
    context.env.RESTRICTED_COOKIE_SECRET;


  if (!secret) {
    return new Response(
      "restricted configuration unavailable",
      {
        status: 500,

        headers: {
          "Content-Type":
            "text/plain; charset=UTF-8"
        }
      }
    );
  }


  const expectedToken =
    await signAccess(
      secret
    );


  const suppliedToken =
    getCookie(
      context.request,
      "restricted_access"
    );


  if (
    !safeEqual(
      suppliedToken,
      expectedToken
    )
  ) {
    return Response.redirect(
      new URL(
        "/restricted/",
        context.request.url
      ),
      302
    );
  }


  return context.next();
}