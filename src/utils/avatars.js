/**
 * Review avatars
 *
 * Reviews are shown under a generated username instead of a real name, and each
 * one gets a stock avatar picked deterministically from that username. Keying
 * the avatar off the username rather than the comment means a given person
 * looks the same everywhere, which is the point of having a username at all.
 *
 * No real profile photos are ever loaded.
 */

import avatar1 from "../images/avatars/avatar-1.png";
import avatar2 from "../images/avatars/avatar-2.jpeg";
import avatar3 from "../images/avatars/avatar-3.jpeg";
import avatar4 from "../images/avatars/avatar-4.jpeg";
import avatar5 from "../images/avatars/avatar-5.jpeg";
import avatar6 from "../images/avatars/avatar-6.jpeg";

export const AVATARS = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];

// Shown when a commenter has no generated username yet
export const ANONYMOUS_NAME = "hostelite";

/**
 * Pick a stable avatar for a username.
 * @param {string} name - The commenter's generated username
 */
export function getAvatarForId(name) {
  if (!name) return AVATARS[0];

  let hash = 0;
  for (let i = 0; i < name.length; i += 1) {
    // Simple deterministic string hash - no cryptographic need here, this only
    // spreads users evenly across the avatar set.
    hash = (hash * 31 + name.charCodeAt(i)) % 100003;
  }

  return AVATARS[hash % AVATARS.length];
}
