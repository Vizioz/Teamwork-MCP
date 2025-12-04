import logger from './logger.js';

/**
 * Extracts a helpful error message from an Axios error or generic error
 * This provides much more context than just "Request failed with status code XXX"
 */
export function formatApiError(error: any, context: string = 'API request'): string {
  // Log the full error for debugging
  logger.error(`Error in ${context}: ${error.message}`);
  
  if (error.stack) {
    logger.error(`Stack trace: ${error.stack}`);
  }

  // Check if this is an Axios error with a response
  if (error.response) {
    const { status, statusText, data } = error.response;
    
    logger.error(`API response error: ${JSON.stringify({
      status,
      statusText,
      data
    })}`);

    // Build a helpful error message
    let message = `${context} failed (HTTP ${status}`;
    if (statusText) {
      message += ` ${statusText}`;
    }
    message += ')';

    // Extract useful information from the response data
    if (data) {
      // Teamwork API often returns error messages in these formats
      if (typeof data === 'string') {
        message += `: ${data}`;
      } else if (typeof data === 'object') {
        // Helper to extract message from error objects
        const extractErrorMessages = (errors: any[]): string | null => {
          if (!Array.isArray(errors) || errors.length === 0) return null;
          return errors.map(e => {
            if (typeof e === 'string') return e;
            if (typeof e === 'object' && e !== null) {
              return e.message || e.detail || e.error || JSON.stringify(e);
            }
            return String(e);
          }).join(', ');
        };

        // Check common error message fields used by Teamwork API
        let errorMessage: string | null = null;
        
        if (data.message) {
          errorMessage = data.message;
        } else if (data.error) {
          errorMessage = typeof data.error === 'string' ? data.error : JSON.stringify(data.error);
        } else if (data.MESSAGE) {
          errorMessage = data.MESSAGE;
        } else if (data.errors) {
          errorMessage = extractErrorMessages(data.errors);
        } else if (data.details) {
          errorMessage = typeof data.details === 'string' ? data.details : JSON.stringify(data.details);
        } else if (Array.isArray(data) && data.length > 0) {
          errorMessage = extractErrorMessages(data);
        }
        
        if (errorMessage) {
          message += `: ${errorMessage}`;
        } else {
          // If no standard error field, stringify the data (truncated)
          const dataStr = JSON.stringify(data);
          if (dataStr.length > 200) {
            message += `: ${dataStr.substring(0, 200)}...`;
          } else if (dataStr !== '{}') {
            message += `: ${dataStr}`;
          }
        }
      }
    }

    // Add hints for common status codes
    switch (status) {
      case 400:
        message += '\n\nHint: Check that all required parameters are provided and have valid values.';
        break;
      case 401:
        message += '\n\nHint: Authentication failed. Check your TEAMWORK_USERNAME and TEAMWORK_PASSWORD credentials.';
        break;
      case 403:
        message += '\n\nHint: You do not have permission to perform this action.';
        break;
      case 404:
        message += '\n\nHint: The requested resource was not found. Check that the ID exists.';
        break;
      case 422:
        message += '\n\nHint: The request data was invalid. Check the field values.';
        break;
      case 429:
        message += '\n\nHint: Rate limit exceeded. Please wait before making more requests.';
        break;
      case 500:
      case 502:
      case 503:
        message += '\n\nHint: Teamwork server error. Please try again later.';
        break;
    }

    return message;
  }

  // Check if this is an Axios error without a response (network error)
  if (error.request) {
    logger.error(`Network error (no response received): ${error.message}`);
    return `${context} failed: No response received from server. Please check your network connection and TEAMWORK_DOMAIN setting.`;
  }

  // Generic error
  return `${context} failed: ${error.message}`;
}

/**
 * Creates a standard MCP error response object
 */
export function createErrorResponse(error: any, context: string = 'API request') {
  return {
    content: [{
      type: "text",
      text: formatApiError(error, context)
    }]
  };
}

export default {
  formatApiError,
  createErrorResponse
};

