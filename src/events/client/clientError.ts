/** @format */

import type Viish from '../../base/Client.js';
import type { Event } from '../../interfaces/Events.js';

export default {
  name: 'error',
  run: async (_client: Viish, error: Error) => {
    console.log(error);
  }
} satisfies Event<'error'>;

process.on('uncaughtException', (error) => {
  console.log(error);
});
process.on('unhandledRejection', (reason) => {
  console.log(reason);
});
