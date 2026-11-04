import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "ultyv3bs",
  api_key: process.env.CLOUDINARY_API_KEY || "881713659487356",
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export default cloudinary;

/**
 * Uploads a base64 or buffer image to Cloudinary in a specific folder.
 */
export async function uploadToCloudinary(
  fileBase64OrUrl: string,
  folder = "vuvuwear/products"
) {
  try {
    const uploadResponse = await cloudinary.uploader.upload(fileBase64OrUrl, {
      folder,
      resource_type: "image",
      transformation: [
        { quality: "auto", fetch_format: "auto" }, // Automatic WebP/AVIF format & compression
      ],
    });

    return {
      success: true,
      url: uploadResponse.secure_url,
      publicId: uploadResponse.public_id,
      width: uploadResponse.width,
      height: uploadResponse.height,
    };
  } catch (error: any) {
    console.error("Cloudinary Upload Error:", error);
    return {
      success: false,
      error: error.message || "Failed to upload to Cloudinary",
    };
  }
}

/**
 * Constructs an optimized Cloudinary delivery URL with dynamic resizing and automatic compression.
 */
export function getOptimizedImageUrl(
  publicId: string,
  options?: {
    width?: number;
    height?: number;
    crop?: string;
  }
) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "ultyv3bs";
  const { width, height, crop = "fill" } = options || {};

  const transformations: string[] = ["f_auto", "q_auto"];
  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (width || height) transformations.push(`c_${crop}`);

  const transformString = transformations.join(",");
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformString}/${publicId}`;
}

