/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as books from "../books.js";
import type * as ideas from "../ideas.js";
import type * as inquiries from "../inquiries.js";
import type * as media from "../media.js";
import type * as mediaKits from "../mediaKits.js";
import type * as milestones from "../milestones.js";
import type * as newsletter from "../newsletter.js";
import type * as quotes from "../quotes.js";
import type * as seed from "../seed.js";
import type * as siteSettings from "../siteSettings.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  books: typeof books;
  ideas: typeof ideas;
  inquiries: typeof inquiries;
  media: typeof media;
  mediaKits: typeof mediaKits;
  milestones: typeof milestones;
  newsletter: typeof newsletter;
  quotes: typeof quotes;
  seed: typeof seed;
  siteSettings: typeof siteSettings;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
