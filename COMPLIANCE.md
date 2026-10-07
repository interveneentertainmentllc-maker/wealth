# Compliance audit — Wealthy test app

Audit date: October 6, 2026. Covers the web app in this repository and the Supabase database setup (`wealthy-setup`, steps 1–11).

This is an engineering record, not legal advice. Have a lawyer who works with fintech and consumer privacy review the four policies and this record before real accounts open.

## Summary

| # | Requirement | Status | Where |
| --- | --- | --- | --- |
| 1 | Privacy Policy | Done; placeholders to fill | `privacy.html` |
| 2 | Terms of Service | Done; placeholders to fill | `terms.html` |
| 3 | Refund Policy | Done (free app: no charges, so no refunds) | `refunds.html` |
| 4 | Cookie Policy | Done | `cookies.html` |
| 5 | Cookie consent banner | Done | App, first visit |
| 6 | Form consents | Done | Sign-up step 1 |
| 7 | No unnecessary data | Done | App and database step 10 |
| 8 | Third-party SDK audit | Done (none in use) | Section 8 below |
| 9 | Dark patterns removed | Done | Section 9 below |
| 10 | No hidden fees | Done (Wealthy is free) | Terms §4, Refund Policy |
| 11 | No fake reviews | Done | Section 11 below |
| 12 | No unsupported claims | Done | Section 12 below |
| 13 | Alt text | Done | Section 13 below |
| 14 | Color contrast | Done | Section 14 below |
| 15 | Keyboard navigation | Done | Section 15 below |
| 16 | Business details | Done; placeholders to fill | `business.js`, About screen |
| 17 | Adults 18+ only | Done | Sign-up, Terms §2, Privacy §8 |
| 18 | Unsubscribe links | Done in app and database; email sending not built yet | Section 18 below |
| 19 | Font and image licenses | Done | `LICENSES.md` |
| 20 | Data deletion requests | Done in app and database; server job not built yet | Section 20 below |
| 21 | Liability protection | Done, within legal limits | Section 21 below |

## 1–4. Policies

Four policy pages share one source of business details, `business.js`. Fill in each `[BRACKETED]` value there once and every page updates. The Privacy Policy's partner table also has bracketed vendor names to fill in as vendors are chosen. Terms and Privacy are version 1.1; the app records which version each member accepted.

Every promise in the policies is backed by the product:

| Promise | Backed by |
| --- | --- |
| Date of birth not stored | App discards it after the age check; database has no birth date column (step 10) |
| Street address not stored after verification | `residences.address_line` removed (step 10) |
| Daily balances kept 400 days | Monthly retention job (steps 10–11) |
| Resolved reports kept up to 2 years; deletion records 3 years | Monthly retention job (step 11) |
| Bank tokens destroyed on disconnect or deletion | Database trigger on `private.connections` (step 10) |
| Leaderboards off until you turn them on | App default and database default (step 10) |
| Global Privacy Control honored | App treats the signal as "Essential only" |
| Download your data | App: Settings → Your data; database: `export_my_data()` |
| Delete your data | App: Settings → Your data; database: `request_account_deletion()` and `complete_account_deletion()` |

## 5. Cookie consent banner

- Appears on the first visit, before any optional storage.
- "Essential only" and "Allow analytics" have identical size and style. Neither is pre-selected.
- Plain description of what's stored, plus a link to the Cookie Policy.
- Choice is saved for 12 months, then asked again.
- Can be changed anytime: Settings → Legal → Cookie choices, or the analytics switch.
- A browser's Global Privacy Control signal is treated as "Essential only" without showing the banner.
- No analytics tool is installed. `loadAnalytics()` in `index.html` is the single place one could be added, and it only runs after consent.

## 6. Form consents

Sign-up asks for:

| Field or box | Required? | Default | Recorded as |
| --- | --- | --- | --- |
| Date of birth | Yes | Empty | Not stored. Only "18+ confirmed at [time]" |
| "I agree to the Terms of Service and have read the Privacy Policy" | Yes | Unticked | Terms version, Privacy version, timestamp |
| "Send me product news by email" | No | Unticked | Opt-in flag and timestamp; unsubscribing clears both |

Errors are shown next to the field, announced, and focus moves to the first problem. The policy links open in a new tab, so the form isn't lost.

## 7. Data minimization

| Data | Before | Now |
| --- | --- | --- |
| Date of birth | Stored in `identities` | Not stored anywhere |
| Home street address | Stored in `residences` | Removed; only city, metro, state and country kept |
| Display name | Pre-filled with a stranger's sample name | Empty until you type one |
| Linked-account flags | Two pre-marked as linked | None marked |
| Follower counts on your profile | Made-up numbers | Real counts (start at zero) |
| Profile photos | — | Re-encoded on the device, which strips location and camera metadata |
| Email address | — | Not collected in the test version |

## 8. Third-party SDK audit

**Today, the site loads nothing from any third party.** No analytics, advertising, social, tracking or font services, and no content delivery networks. The font is bundled (Google Fonts was removed), and every image is drawn in code.

Planned for the full service:

| SDK or service | Purpose | Data shared | Before launch |
| --- | --- | --- | --- |
| Supabase (supabase-js) | Database, sign-in, storage | Everything stored in the service | Sign Supabase's data processing agreement |
| Plaid Link | Bank linking | Bank login (entered with Plaid), account data | Complete Plaid's security questionnaire; link to Plaid's End User Privacy Policy (done in Privacy and Terms) |
| Identity verification vendor | Identity and age | Name, ID image | Choose vendor; confirm it deletes ID images; add to Privacy §5 |
| Property, vehicle and crypto data providers | Valuations, ownership checks | Addresses, VINs, wallet addresses | Choose vendors; server-side only; add to Privacy §5 |
| Email provider | Service and opt-in email | Email address | Choose vendor; support one-click unsubscribe headers |
| Error reporting (e.g. Sentry) | Crash reports | Technical data | Turn off IP collection and session replay, or ask consent; add to Privacy §5 |
| Analytics (e.g. PostHog) | Optional | Usage | Only behind the consent banner; update Cookie Policy table first |

## 9. Dark patterns

| Pattern | Fix |
| --- | --- |
| Public by default | Leaderboards are off until you switch them on |
| Pre-ticked boxes | No box starts ticked |
| Uneven consent buttons | "Essential only" and "Allow analytics" are identical |
| Hard to leave | Delete my account and data is two taps from Settings, with no extra steps |
| Destructive default | The delete dialog focuses "Keep my account"; Escape closes it |
| "Log in" skipping consent | Log in no longer bypasses the age check and agreements |
| Retry after an age block | Under-18 users can't simply re-enter a different date. (The test version shows a reset link so testers aren't stuck; remove it in the real app.) |
| Confirmshaming, fake urgency, countdowns | None anywhere |
| Unprompted feed jumps | New posts wait behind a "Show new posts" button; the feed never shifts by itself |
| Unskippable intro | The load-in screen lasts about two seconds, plays once per visit, and can be skipped by tapping or pressing Enter, Space or Escape |

## 10. Fees

Wealthy is free: no fees, subscriptions, in-app purchases or payment details, anywhere. Terms §4 and the Refund Policy say so plainly, warn members that anyone asking them to pay "Wealthy" is a scammer, and promise that if anything paid is ever offered, the price and terms will be shown and agreed to first, with nothing charged automatically.

## 11. Fake reviews and testimonials

- No reviews, ratings, testimonials or "as seen in" claims exist anywhere.
- Every sample member, post, rank and amount is labeled: a "Test version" bar on every screen, "Sample post" on each feed post, and "Sample members" on leaderboards.
- No sample post praises Wealthy itself.
- Don't use screenshots of sample data in app store listings or ads without labeling them as illustrative.

## 12. Unsupported claims

| Before | After | Why |
| --- | --- | --- |
| "Know exactly where you stand." | "See where you stand." | Ranks and percentiles are estimates |
| "Account numbers and addresses are never shown to anyone." | "They never see your account numbers, banks or addresses." | Staff and the server can access data |
| "Verified net worth" on sample screens | "Sample net worth for testing" | Nothing is verified in the test version |
| "Anything we can link counts toward your rank." | "In the full app, linked and valued items count toward your rank…" | Not true of the test version |
| Bank login and security claims on test screens | "This test version doesn't connect to real accounts." | The test version has no bank connection |

## 13. Alt text and non-text content

- Milestone illustrations each have a description, such as "Illustration of a house with a sold sign and a key."
- Your profile photo is described ("Profile photo of [name]"). Avatars next to a visible name are hidden from screen readers to avoid repetition.
- Icon-only buttons have labels ("Search", "Write a post", "Share post"). Decorative icons are hidden.
- Button names match what's visible ("Cheer, 1.5K cheers").
- Rank movement arrows have spoken text ("Up 3").
- The asset-mix bar is backed by a text list with percentages.

## 14. Color contrast (WCAG 2.2 AA)

| Pair | Light | Dark | Needed |
| --- | --- | --- | --- |
| Secondary text on page | 5.60 | 7.27 | 4.5 |
| Secondary text on cards | 6.05 | 6.70 | 4.5 |
| Secondary text in notes | 5.13 | 5.92 | 4.5 |
| Unselected tab text | 4.95 | 6.32 | 4.5 |
| Accent text on page | 5.24 | 9.06 | 4.5 |
| Button text | 15.56 | 15.90 | 4.5 |
| Switch track (off) | 3.29 | 3.94 | 3 |
| Text field border | 3.55 | 3.63 | 3 |

The switch track (was 1.6:1) and text field borders (was 1.4:1) failed before this audit. Automated checks with axe-core report **zero violations** on every app screen in light and dark mode and on all four policy pages.

## 15. Keyboard and screen readers

- "Skip to main content" link on every page.
- Visible focus outline on everything you can tab to.
- On each new screen, focus moves to its heading. After an action, focus returns to the control you used.
- Dialogs keep focus inside, close with Escape, and return focus to the button that opened them.
- All controls are real buttons, links, radios, checkboxes and switches, with no clickable divs.
- New posts, follows and loading are announced through a polite live region.
- With reduced motion turned on, there's no falling money, shimmer or pop-in.

Still to do: manual testing with VoiceOver (iPhone) and TalkBack (Android).

## 16. Business details

Fill in `business.js`: legal name, state of formation, mailing address, support email, privacy email, governing state, court venue and effective date. They appear on the About screen (Settings → Legal → About Wealthy) and in all four policies.

## 17. Adults only

- Date-of-birth check at sign-up. Under 18 is blocked with no way to retry by changing the date (apart from the testers' reset link, which the real app must not have).
- The full service confirms age again during identity verification (`identities.age_verified_at`).
- Terms §2 and Privacy §8 state the rule, and how to report a minor.

## 18. Unsubscribe

- In the app: Settings → Email and analytics → Product news by email.
- In the database: each member has an unsubscribe token, and `unsubscribe_marketing(token)` turns off email with one call (server only).
- Opt-in time is recorded, and cleared on unsubscribe.

Every marketing email must end with this footer and send `List-Unsubscribe` and `List-Unsubscribe-Post: List-Unsubscribe=One-Click` headers:

```
You're getting this because you asked for product news from Wealthy.
Unsubscribe in one click: https://YOUR-SITE/unsubscribe?token={{email_unsubscribe_token}}
[COMPANY LEGAL NAME], [MAILING ADDRESS]
```

Still to build: the email sender and the small unsubscribe page that calls `unsubscribe_marketing`.

## 19. Licenses

See `LICENSES.md`. Montserrat is bundled under the SIL Open Font License with its license file. All images, icons and the logo are original. Gotham is not included.

## 20. Data deletion requests

- **In the app:** Settings → Your data → Delete my account and data. The test version erases everything on the device at once.
- **Full service:** `request_account_deletion()` hides the member from everyone immediately and records the request. A server job must then revoke their Plaid connections and call `complete_account_deletion()`, which erases the account, destroys bank tokens and marks the request completed.
- **By email:** privacy requests go to the address in `business.js`; respond within 45 days.
- **Download:** Settings → Your data → Download my data (test version: a JSON file of everything on the device; full service: `export_my_data()`).

Still to build: the server job that processes deletion requests within 30 days.

## 21. Liability protection

The Terms (version 1.1) now give Wealthy the strongest protection that's generally enforceable for a free consumer app:

| Protection | Where |
| --- | --- |
| Service provided "as is", with all warranties disclaimed | Terms §14 |
| Not liable for data breaches or unauthorized access, beyond what the law requires | Terms §13, Privacy §9 |
| Not liable for other members' conduct or content, online or offline, with a release of claims (including California Civil Code §1542) | Terms §8 |
| Members choose what to share and accept the risks of sharing wealth information | Terms §7, Privacy §4 |
| Not liable for members' financial decisions or their outcomes; estimates aren't advice | Terms §5 |
| Total liability capped at $50, with no indirect or punitive damages | Terms §15 |
| Members cover Wealthy's costs for claims caused by their content or conduct | Terms §16 |
| Individual arbitration, class action and jury waiver, with a 30-day opt-out; shown at sign-up | Terms §18, sign-up checkbox |
| One-year time limit to bring claims | Terms §19 |

**What no policy can do.** These clauses apply "to the fullest extent the law allows." They can't remove duties the law imposes, including:
- notifying members and regulators after a breach;
- keeping "reasonable security," which, if breached, can support statutory damages under California's privacy law;
- consumer-protection enforcement by the FTC and state attorneys general;
- in many states, liability for gross negligence or willful misconduct.

The real protection against those risks is strong security, honest policies, the LLC structure, and **cyber liability insurance**.

## Before real accounts open

1. Lawyer review of all four policies, especially the liability, release and arbitration sections (Terms §§13–19), and whether GLBA rules apply.
2. Fill in `business.js` and the vendor names in Privacy §5.
3. Get quotes for cyber liability insurance.
4. Build the deletion job, the email sender with unsubscribe page, and choose vendors (with data processing agreements).
5. Manual screen reader testing on iPhone and Android.
6. App Store privacy labels and Google Play Data safety form, matching the Privacy Policy.
7. Trademark search for "Wealthy".
