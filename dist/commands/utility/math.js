export default {
    name: 'math',
    aliases: ['m'],
    run: async (_client, message, args) => {
        const input = args.join('');
        try {
            const result = eval(input);
            await message.reply({ content: `${result}` });
        }
        catch { }
    }
};
