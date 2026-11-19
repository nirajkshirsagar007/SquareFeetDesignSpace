/**
 * revalidate.ts
 *
 * Called by the backend after any project mutation (create/update/delete).
 * Sends a request to Next.js to immediately revalidate the affected pages
 * rather than waiting for the 60-second ISR interval.
 *
 * This means: when the admin adds or edits a project, the public website
 * reflects the change within seconds, not up to a minute later.
 */
export async function revalidateProjectPages(slug?: string): Promise<void> {
  const secret = process.env.REVALIDATION_SECRET;
  const frontendUrl = process.env.FRONTEND_URL ?? "http://localhost:3000";

  if (!secret) {
    console.warn(
      "[revalidate] REVALIDATION_SECRET not set — skipping revalidation"
    );
    return;
  }

  // Paths to revalidate after any project change
  const paths = ["/projects", "/", "/about", "/services"];
  if (slug) paths.push(`/projects/${slug}`);

  const revalidationCalls = paths.map((path) =>
    fetch(
      `${frontendUrl}/api/revalidate?secret=${secret}&path=${encodeURIComponent(path)}`,
      { method: "GET" }
    ).catch((err) => {
      // Don't fail the main request if revalidation fails
      console.error(`[revalidate] Failed to revalidate ${path}:`, err.message);
    })
  );

  await Promise.allSettled(revalidationCalls);
}
