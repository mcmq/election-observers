export function getFileExtensionFromBase64(base64: string): string | null {
  // Regular expression to extract MIME type from base64 string
  const mimeTypeMatch = base64.match(/^data:(.+);base64,/)

  if (!mimeTypeMatch) {
    return null
  }

  // MIME type is the first capturing group in the regex match
  const mimeType = mimeTypeMatch[1]

  // Map of MIME types to file extensions
  const mimeTypes: { [key: string]: string } = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
    'image/bmp': 'bmp',
    'image/svg+xml': 'svg',
    'application/pdf': 'pdf',
    'text/plain': 'txt',
    'text/html': 'html',
    'application/json': 'json',
    // Add more mappings as needed
  }

  // Return the corresponding file extension or null if not found
  return mimeTypes[mimeType] || null
}

export function dataURLtoFile(dataurl: string, filename: string) {
  const arr = dataurl.split(',')
  const mime = arr[0].match(/:(.*?);/)?.[1]
  const bstr = atob(arr[arr.length - 1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  
  return new File([u8arr], filename, { type: mime })
}