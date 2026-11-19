import { Request, Response } from "express";
import { cloudinaryV2 } from "../lib/cloudinary";
import { asyncHandler, sendSuccess, sendError } from "../lib/response";

// POST /api/upload/signature  (admin only)
//
// Generates a Cloudinary signed upload signature.
// The admin panel uses this signature to upload files DIRECTLY
// to Cloudinary — the image never passes through our server.
//
// Returns: { signature, timestamp, cloudName, apiKey, folder }
//
export const getUploadSignature = asyncHandler(
  async (req: Request, res: Response) => {
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;

    if (!apiSecret || !cloudName || !apiKey) {
      sendError(res, "Cloudinary is not configured on the server", 500);
      return;
    }

    const folder = (req.body.folder as string) || "squarefeet/projects";
    const timestamp = Math.round(Date.now() / 1000);

    // Sign the upload params — only params included here are enforced
    const signature = cloudinaryV2.utils.api_sign_request(
      { timestamp, folder },
      apiSecret
    );

    sendSuccess(res, {
      signature,
      timestamp,
      cloudName,
      apiKey,
      folder,
    });
  }
);
