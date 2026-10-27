# Bhargav Public School website instructions

This repository is the Bhargav Public School website, built with static HTML, shared CSS and JavaScript, plus Cloudflare Pages Functions.

- Read the relevant existing files before making changes. Prefer small, focused edits.
- The website is deployed from the repository root. Keep wrangler.toml's pages_build_output_dir set to "." unless the deployment setup is intentionally changed and tested.
- Shared assets are assets/css/style.css, assets/js/main.js and bhargav-logo.png.
- Keep the existing e-book catalogue workflow in .github/workflows/main.yml intact. Create separate workflows for website validation.
- Do not remove existing content or navigation unless requested.
- Do not invent school details. Mark unconfirmed facts for the owner to verify.
- Keep forms accessible and mobile-friendly. Do not expose private student data, SMS provider credentials, OTPs or API secrets in client-side code.
- When editing HTML, verify local asset paths and key links. When editing Functions, check the matching D1 binding and migrations.
- Report changed files and testing performed honestly. A passing GitHub check does not by itself prove Cloudflare deployed every asset.
