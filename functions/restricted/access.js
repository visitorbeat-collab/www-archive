const CHALLENGE_VERSION = "restricted-gate-v1";
const ACCESS_VERSION = "restricted-access-v1";

const CHALLENGE_MAX_AGE_MS = 5 * 60 * 1000;


/*
  Server-side canonical interpretation.

  0 = innermost
  1 = second
  2 = third
  3 = outermost
*/

const TARGET_CLASS = {
  A: 2,
  B: 0,
  C: 1,
  D: 2,
  E: 3,
  F: 0,
  G: 1,
  H: 0,
  I: 2
};


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


function randomHex(byteCount = 24) {
  const bytes =
    new Uint8Array(byteCount);

  crypto.getRandomValues(bytes);

  return hexFromBytes(bytes);
}


async function importSigningKey(secret) {
  const encoder =
    new TextEncoder();

  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    {
      name: "HMAC",
      hash: "SHA-256"
    },
    false,
    ["sign"]
  );
}


async function signValue(
  secret,
  value
) {
  const encoder =
    new TextEncoder();

  const key =
    await importSigningKey(
      secret
    );

  const signature =
    await crypto.subtle.sign(
      "HMAC",
      key,
      encoder.encode(value)
    );

  return hexFromBytes(
    new Uint8Array(signature)
  );
}


async function signAccess(secret) {
  return signValue(
    secret,
    ACCESS_VERSION
  );
}


async function signChallenge(
  secret,
  nonce,
  issuedAt
) {
  const value =
    `${CHALLENGE_VERSION}|${nonce}|${issuedAt}`;

  return signValue(
    secret,
    value
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


function jsonResponse(
  data,
  status = 200,
  extraHeaders = {}
) {
  return new Response(
    JSON.stringify(data),
    {
      status,

      headers: {
        "Content-Type":
          "application/json; charset=UTF-8",

        "Cache-Control":
          "no-store",

        ...extraHeaders
      }
    }
  );
}


/* ---------------------------------------------------------
   GET

   Issue a short-lived signed assessment challenge.
   --------------------------------------------------------- */

export async function onRequestGet(context) {
  const secret =
    context.env.RESTRICTED_COOKIE_SECRET;

  if (!secret) {
    return jsonResponse(
      {
        ok: false,
        error:
          "restricted configuration unavailable"
      },
      500
    );
  }


  const nonce =
    randomHex(24);

  const issuedAt =
    Date.now();


  const signature =
    await signChallenge(
      secret,
      nonce,
      issuedAt
    );


  return jsonResponse({
    ok: true,

    challenge: {
      nonce,
      issuedAt,
      signature
    }
  });
}


/* ---------------------------------------------------------
   POST

   Verify:
   - challenge authenticity
   - challenge age
   - complete radial interpretation

   If valid, issue the existing restricted_access cookie.
   --------------------------------------------------------- */

export async function onRequestPost(context) {
  const secret =
    context.env.RESTRICTED_COOKIE_SECRET;

  if (!secret) {
    return jsonResponse(
      {
        ok: false,
        error:
          "restricted configuration unavailable"
      },
      500
    );
  }


  let body;


  try {
    body =
      await context.request.json();
  } catch (error) {
    return jsonResponse(
      {
        ok: false
      },
      400
    );
  }


  const challenge =
    body?.challenge;

  const interpretation =
    body?.interpretation;


  if (
    !challenge ||
    typeof challenge.nonce !== "string" ||
    typeof challenge.issuedAt !== "number" ||
    typeof challenge.signature !== "string" ||
    !interpretation ||
    typeof interpretation !== "object"
  ) {
    return jsonResponse(
      {
        ok: false
      },
      400
    );
  }


  /* -------------------------------------------------------
     VERIFY CHALLENGE SIGNATURE
     ------------------------------------------------------- */

  const expectedSignature =
    await signChallenge(
      secret,
      challenge.nonce,
      challenge.issuedAt
    );


  if (
    !safeEqual(
      challenge.signature,
      expectedSignature
    )
  ) {
    return jsonResponse(
      {
        ok: false
      },
      403
    );
  }


  /* -------------------------------------------------------
     VERIFY CHALLENGE AGE
     ------------------------------------------------------- */

  const now =
    Date.now();

  const age =
    now -
    challenge.issuedAt;


  if (
    age < 0 ||
    age >
      CHALLENGE_MAX_AGE_MS
  ) {
    return jsonResponse(
      {
        ok: false,
        expired: true
      },
      403
    );
  }


  /* -------------------------------------------------------
     VERIFY COMPLETE INTERPRETATION
     ------------------------------------------------------- */

  const profileIds =
    Object.keys(
      TARGET_CLASS
    );


  const complete =
    profileIds.every(
      profileId =>
        Number.isInteger(
          interpretation[
            profileId
          ]
        )
    );


  if (!complete) {
    return jsonResponse(
      {
        ok: false
      },
      403
    );
  }


  const coherent =
    profileIds.every(
      profileId =>
        interpretation[
          profileId
        ] ===
        TARGET_CLASS[
          profileId
        ]
    );


  if (!coherent) {
    return jsonResponse(
      {
        ok: false
      },
      403
    );
  }


  /* -------------------------------------------------------
     ISSUE EXISTING ACCESS TOKEN
     ------------------------------------------------------- */

  const accessToken =
    await signAccess(
      secret
    );


  return jsonResponse(
    {
      ok: true,

      location:
        "/restricted/archive/"
    },
    200,
    {
      "Set-Cookie":
        `restricted_access=${accessToken}; ` +
        `Path=/restricted; ` +
        `HttpOnly; ` +
        `Secure; ` +
        `SameSite=Lax; ` +
        `Max-Age=86400`
    }
  );
}