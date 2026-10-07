# Wealthy — test app

A clickable test version of Wealthy that runs in any phone browser: a load-in screen, sign-up with an age check, rankings, an X/Threads-style feed with illustrated milestones, your wealth, your profile, and settings.

It uses sample data. No real accounts are connected, and nothing leaves the phone: your test name, photo, settings and posts are saved only in that phone's browser.

## What's in this folder

| File | What it is |
| --- | --- |
| `index.html` | The whole app |
| `business.js` | **Your business details. Edit this one file** and the app's About screen and all four policies update |
| `privacy.html`, `terms.html`, `refunds.html`, `cookies.html` | Privacy Policy, Terms of Service, Refund Policy, Cookie Policy |
| `legal.css` | Styling for the policy pages |
| `fonts/` | The Montserrat font and its license |
| `icons/` | Money bag home-screen icons |
| `manifest.webmanifest` | Lets phones add the app to the home screen |
| `COMPLIANCE.md` | Audit record: privacy, consent, accessibility, licenses, and what's left before launch |
| `LICENSES.md` | Licenses for fonts, images and icons |
| `.nojekyll` | Tells GitHub Pages to serve the files as they are |

## Before you publish

Open `business.js` and replace every `[BRACKETED]` value: company legal name, state, mailing address, support and privacy emails, governing state, court venue and the policies' effective date. Then read `COMPLIANCE.md`, and have a lawyer review the policies before real accounts open.

## Put it on GitHub Pages

1. Sign in to github.com and click **New repository**. Name it `wealthy`. GitHub Pages is free for **Public** repositories; private ones need a paid plan.
2. On the new repository's page, click **uploading an existing file**. Drag in everything *inside* this folder, including the `fonts` and `icons` folders, so `index.html` sits at the top level. Click **Commit changes**.
   - On a Mac, `.nojekyll` is hidden. Press Cmd + Shift + . in Finder to show it, or skip it; the app works without it.
3. Go to **Settings → Pages**. Under **Build and deployment**, set **Source** to **Deploy from a branch**, choose the **main** branch and the **/ (root)** folder, and click **Save**.
4. Wait a minute or two, then refresh the Pages settings. Your link appears at the top, in the form `https://YOUR-USERNAME.github.io/wealthy/`. Your policies live at the same address plus `/privacy.html`, `/terms.html` and so on, which is what app stores ask for.

## Test it on your phone

1. Open the link in Safari (iPhone) or Chrome (Android).
2. Add it to your home screen so it opens full screen like an app:
   - **iPhone:** tap the Share button, then **Add to Home Screen**.
   - **Android:** tap the ⋮ menu, then **Add to Home screen** or **Install app**.
3. The money load-in plays once per visit. Open the Feed and wait a few seconds: a **Show new posts** button appears and new milestones pop in when you tap it. Tap **+** to post your own milestone.
4. To start over: Profile → settings button (top right) → **Delete my account and data**.

## Update it later

Upload the changed files to the same repository the same way (GitHub replaces files with the same name), and commit. The site updates within a few minutes.

## Keep the database files separate

The Supabase setup folder (`wealthy-setup`) belongs in its own **private** repository, not this public one.
