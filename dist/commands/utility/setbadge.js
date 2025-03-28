export default {
    name: 'setbadge',
    run: async (client, message, args) => {
        if (!args[0]) {
            return message.reply('Please provide a valid badge field.');
        }
        const badgenumber = parseInt(args[0], 10);
        if (isNaN(badgenumber) || badgenumber < 0 || badgenumber > 3) {
            return message.reply('Please provide a number between 0 and 3.');
        }
        const hypeSquadTypes = ['HOUSE_BRAVERY', 'HOUSE_BRILLIANCE', 'HOUSE_BALANCE', 'LEAVE'];
        const hypeSquadType = hypeSquadTypes[badgenumber] ?? 0;
        await client.user?.setHypeSquad(hypeSquadType);
        await message.react('✅');
        return;
    }
};
