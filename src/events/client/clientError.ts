/** @format */

import type { Event } from '../../interfaces/Events.js';

export default {
  name: 'error',
  async run(_client, error) {
    console.log(error);
  }
} satisfies Event<'error'>;

process.on('uncaughtException', (error) => {
  console.log(error);
});
process.on('unhandledRejection', (reason) => {
  console.log(reason);
});
