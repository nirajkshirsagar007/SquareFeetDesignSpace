import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

/**
 * GET /api/revalidate?secret=<token>&path=<path>
 *
 * On-demand ISR revalidation endpoint.
 * Called by the backend Express server after any project mutation
 * (create, update, delete) so the public website refreshes immediately
 * instead of waiting up to 60 seconds.
 *
 * Security: protected by a shared secret (REVALIDATION_SECRET env var).
 * The backend sends the same secret — if they don't match, we return 401.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const path = searchParams.get("path");

  // Validate the secret
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json(
      { success: false, message: "Invalid revalidation secret" },
      { status: 401 }
    );
  }

  // Validate that a path was provided
  if (!path) {
    return NextResponse.json(
      { success: false, message: "Missing path parameter" },
      { status: 400 }
    );
  }

  // Trigger the revalidation
  revalidatePath(path);

  return NextResponse.json({
    success: true,
    revalidated: true,
    path,
    timestamp: new Date().toISOString(),
  });
}
