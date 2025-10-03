/**
 * Utility functions for response formatting and CORS handling.
 *
 * @module utils
 */

/**
 * Creates a JSON response with given data and status.
 * Adds appropriate headers for content type and CORS.
 *
 * @param {any} data - Data to be serialized as JSON in the response body.
 * @param {number} [status=200] - HTTP status code.
 * @returns {Response} - The HTTP response object.
 */
export function jsonResponse(data: any, status = 200) {
    return new Response(JSON.stringify(data), {
      status,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }
  
  /**
 * Handles CORS preflight requests (OPTIONS method).
 * Returns a response with CORS headers if the request method is OPTIONS, otherwise returns null.
 *
 * @param {Request} req - The incoming HTTP request.
 * @returns {Response|null} - CORS response or null if not an OPTIONS request.
 */
  export function handleCors(req: Request) {
    if (req.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }
    return null;
  }
  