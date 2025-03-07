export default {
    name: 'error',
    run: async (_client, error) => {
        console.log(error);
    }
};
process.on('uncaughtException', (error) => {
    console.log(error);
});
process.on('unhandledRejection', (reason) => {
    console.log(reason);
});
