import Viish from '../../base/Client.js';
import type { Event } from '../../interfaces/Events.js';

export default {
  name: 'error',
  run: async (_client: Viish, error: Error) => {
    await handleError(error);
  }
} satisfies Event<'error'>;

process.on('uncaughtException', handleError);
process.on('unhandledRejection', (reason) => handleError(reason));

async function handleError(error: any) {
  try {
    const detailedMessage = formatStackTrace(error);
    await sendErrorMessage(detailedMessage);
  } catch (err) {
    console.error('Error handling failed:', err);
  }
}

async function sendErrorMessage(errorMessage: string | string[]) {
  try {
    console.error(errorMessage);
  } catch (error) {
    console.error('Failed to send error message to webhook:', error);
  }
}

function formatStackTrace(error: { message: string; stack: string }) {
  if (error instanceof Error) {
    return `Error: ${error.message}\nStack Trace:\n${error.stack}`;
  } else if (error.stack) {
    return `Warning: ${error.message}\nStack Trace:\n${error.stack}`;
  } else if (typeof error === 'string') {
    return error;
  } else {
    return `Unhandled rejection or error: ${JSON.stringify(error)}`;
  }
}
