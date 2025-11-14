/**
 * Get the full image path with basePath prefix
 *
 * This utility ensures images are correctly served when the app is deployed
 * with a basePath (e.g., GitHub Pages sub-path deployment).
 *
 * @param path - The image path relative to /public (e.g., "/images/photo.jpg")
 * @returns The full path with basePath prefix
 *
 * @example
 * ```tsx
 * import { getImagePath } from '@/utils/getImagePath'
 *
 * <Image src={getImagePath("/images/photo.jpg")} ... />
 * // In dev: "/website-v1/images/photo.jpg"
 * // In prod: "/website-v1/images/photo.jpg"
 * ```
 */
export function getImagePath(path: string): string {
  // Get basePath from environment variable
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

  // Return path as-is if:
  // - No basePath configured
  // - Path is already absolute (http/https)
  // - Path is empty
  if (!basePath || !path || path.startsWith('http')) {
    return path
  }

  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`

  // Return basePath + path
  return `${basePath}${normalizedPath}`
}
