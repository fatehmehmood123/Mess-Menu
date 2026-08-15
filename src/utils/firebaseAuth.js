import { auth } from "../firebaseConfig";

/**
 * Resolve the current Firebase user, waiting for the SDK to restore its session.
 *
 * `auth.currentUser` is null until Firebase finishes reading its stored session,
 * which happens asynchronously after page load. Reading it directly means a user
 * who taps quickly gets null and the request fails for no good reason.
 *
 * Returns null once auth has genuinely settled with nobody signed in - that is a
 * real answer, not a timing artefact, and callers should treat it as "signed
 * out" rather than retrying.
 *
 * @param {number} timeoutMs - safety net so a stalled SDK cannot hang a request
 */
export function waitForFirebaseUser(timeoutMs = 5000) {
  if (auth.currentUser) return Promise.resolve(auth.currentUser);

  return new Promise((resolve) => {
    let settled = false;

    const finish = (user) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      if (typeof unsubscribe === "function") unsubscribe();
      resolve(user);
    };

    const timer = setTimeout(() => finish(auth.currentUser || null), timeoutMs);

    // Fires once Firebase has restored (or confirmed the absence of) a session
    const unsubscribe = auth.onAuthStateChanged(
      (user) => finish(user),
      () => finish(null)
    );
  });
}

/**
 * Fresh ID token for the signed-in user, or null if there is no session.
 * Never throws, so callers can branch instead of catching.
 */
export async function getIdTokenSafely() {
  const user = await waitForFirebaseUser();
  if (!user) return null;

  try {
    return await user.getIdToken();
  } catch (error) {
    console.warn("Could not get Firebase ID token:", error);
    return null;
  }
}
