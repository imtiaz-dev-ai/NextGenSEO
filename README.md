<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/temp/1

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Automatic blog SEO updates

The production build prerenders blog pages and updates the sitemap from Supabase. To refresh those static files automatically whenever a blog is created, edited, or deleted:

1. In Vercel, open the project settings and create a production Deploy Hook for the branch used by production.
2. Add the generated URL as the `VERCEL_DEPLOY_HOOK_URL` environment variable in the Vercel project's Production environment. Keep this URL server-side; do not add a `VITE_` prefix.
3. Redeploy once so the admin API receives the new environment variable.

After that, blog changes made in the admin panel trigger a Vercel deployment. The admin panel reports whether the deployment started; changes can take effect after the build completes.
