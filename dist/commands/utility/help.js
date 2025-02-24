export default {
    name: 'help',
    aliases: ['h'],
    run: async (client, message, args) => {
        const homePage = `# ${client.emoji.util.viish} Viish Cord ${client.emoji.util.viish}
-# .help <module> to see commands.
-# .help all to see all commands.
${client.emoji.util.afk} **[AFK]**
${client.emoji.util.ar} **[ARs]**
${client.emoji.util.currency} **[CURRENCY]**
${client.emoji.util.mod} **[MOD]**
${client.emoji.util.utility} **[UTILITY]**
${client.emoji.util.vc} **[VC]**
${client.emoji.util.vouch} **[VOUCH]**
`;
        const afkPage = `# ${client.emoji.util.viish} Viish Cord ${client.emoji.util.viish}
-# .help all to see all commands.
## ${client.emoji.util.afk} **[AFK]**
### **AFK Commands**:
- \`.afk <reason>\`: Set yourself as AFK with a reason.
- \`.unafk <reason>\`: Unset yourself from AFK.
`;
        const arPage = `# ${client.emoji.util.viish} Viish Cord ${client.emoji.util.viish}
-# .help all to see all commands.
## ${client.emoji.util.ar} **[AR]**
### **Auto-Response Commands**:
- \`.ar add <name> <response>\`: Adds a new auto-response.
- \`.ar remove <name>\`: Removes an auto-response.
- \`.ar config\`: Configures auto-responses.
- \`.ar reset\`: Resets auto-responses to default.

### **Auto React Commands**:
- \`.react add <trigger> <emoji>\`: Adds a new autoreact.
- \`.react remove <trigger>\`: Removes a autoreact.
- \`.react config\`: Configures autoreact.
- \`.react reset\`: Resets autoreact to default.
`;
        const moneyPage = `# ${client.emoji.util.viish} Viish Cord ${client.emoji.util.viish}
-# .help all to see all commands.
## ${client.emoji.util.currency} **[CURRENCY]**
### **Financial & Currency Conversion Commands**:
- \`.bal <addy>\`: Checks the balance for the given address.
- \`.growth\`: Displays LTC growth statistics.
- \`.ltc\`: Displays Litecoin price.
- \`.profit\`: Displays your all time profit.
- \`.c2i <amount>\`: Converts LTC to INR.
- \`.c2u <amount>\`: Converts LTC to USD.
- \`.u2c <amount>\`: Converts USD to LTC.
- \`.u2i <amount>\`: Converts USD to INR.
- \`.i2c <amount>\`: Converts INR to LTC.
- \`.i2u <amount>\`: Converts INR to USD.
- \`.qr <upi/ltc> <amount> <upi/addy>\`: Generates QR code for UPI or Litecoin.
`;
        const modPage = `# ${client.emoji.util.viish} Viish Cord ${client.emoji.util.viish}
-# .help all to see all commands.
## ${client.emoji.util.mod} **[MOD]**
### **Mod Commands**:
- \`.hide <channel>\`: Hides the specified channel.
- \`.unhide <channel>\`: Unhides the specified channel.
- \`.lock <channel>\`: Locks the specified channel.
- \`.unlock <channel>\`: Unlocks the specified channel.
- \`.ban <user>\`: Bans the specified user from the server.
- \`.kick <user>\`: Kicks the specified user from the server.
- \`.mute <user>\`: Mutes the specified user.
- \`.unmute <user>\`: Unmutes the specified user.
- \`.role <role> <user>\`: Assigns a specific role to the specified user.
`;
        const utilityPage = `# ${client.emoji.util.viish} Viish Cord ${client.emoji.util.viish}
-# .help all to see all commands.
## ${client.emoji.util.utility} **[UTILITY]**
### **To-Do Commands**:
- \`.todo add <task>\`: Adds a new to-do task.
- \`.todo remove <index>\`: Removes a to-do task.
- \`.todo config\`: Configures to-do tasks.
- \`.todo reset\`: Resets to-do tasks to default.

### **Server Commands**:
- \`.boost\`: Boost a Server.
- \`.serveravatar\`: Displays the server's avatar URL.
- \`.serverbanner\`: Displays the server's banner URL.

### **Utility & Information Commands**:
- \`.math\`: Performs basic mathematical calculations.
- \`.ping\`: Checks the bot's latency.
- \`.uptime\`: Displays selfbot uptime message.
- \`.help\`: Displays this help message.
- \`.setbadge\`: Sets Hype Squad badge.
- \`.avatar [userID]\`: Fetches a user's avatar URL by their ID.
- \`.banner [userID]\`: Fetches a user's banner URL by their ID.
- \`.checkpromo <link>\`: Checks the validity of a promotion link.
- \`.checktoken <token>\`: Verifies if the token is valid or invalid.
`;
        const vcPage = `# ${client.emoji.util.viish} Viish Cord ${client.emoji.util.viish}
-# .help all to see all commands.
## ${client.emoji.util.vc} **[VC]**
### **VC Commands**:
- \`.join <channel_id>\`: Makes the bot join the specified voice channel by ID, or the voice channel you are in if no ID is provided.
- \`.leave\`: Disconnects the bot from the voice channel it is in, if connected.
`;
        const vouchPage = `# ${client.emoji.util.viish} Viish Cord ${client.emoji.util.viish}
-# .help all to see all commands.
## ${client.emoji.util.vouch} **[VOUCH]**
### **Vouch Commands**:
- \`.vouch <amount> <currency> <product>\`: Generates a Vouch message for a product with amount and currency.
- \`.exvouch <amount> <currency> <product>\`: Generates a Vouch message for a exchange currency with amount and currency.
`;
        switch (args[0]) {
            case 'afk':
                await message.channel.send({ content: afkPage }).then((sentMessage) => {
                    setTimeout(() => {
                        sentMessage.delete().catch((err) => console.error('Failed to delete message:', err));
                    }, 120000);
                });
                break;
            case 'ar':
                await message.channel.send({ content: arPage }).then((sentMessage) => {
                    setTimeout(() => {
                        sentMessage.delete().catch((err) => console.error('Failed to delete message:', err));
                    }, 120000);
                });
                break;
            case 'currency':
            case 'money':
                await message.channel.send({ content: moneyPage }).then((sentMessage) => {
                    setTimeout(() => {
                        sentMessage.delete().catch((err) => console.error('Failed to delete message:', err));
                    }, 120000);
                });
                break;
            case 'mod':
            case 'admin':
                await message.channel.send({ content: modPage }).then((sentMessage) => {
                    setTimeout(() => {
                        sentMessage.delete().catch((err) => console.error('Failed to delete message:', err));
                    }, 120000);
                });
                break;
            case 'utility':
                await message.channel.send({ content: utilityPage }).then((sentMessage) => {
                    setTimeout(() => {
                        sentMessage.delete().catch((err) => console.error('Failed to delete message:', err));
                    }, 120000);
                });
                break;
            case 'vc':
                await message.channel.send({ content: vcPage }).then((sentMessage) => {
                    setTimeout(() => {
                        sentMessage.delete().catch((err) => console.error('Failed to delete message:', err));
                    }, 120000);
                });
                break;
            case 'vouch':
                await message.channel.send({ content: vouchPage }).then((sentMessage) => {
                    setTimeout(() => {
                        sentMessage.delete().catch((err) => console.error('Failed to delete message:', err));
                    }, 120000);
                });
                break;
            case 'all':
                const page1 = `# ${client.emoji.util.viish} Viish Cord ${client.emoji.util.viish}
-# .help all to see all commands.
## ${client.emoji.util.afk} **[AFK]**
### **AFK Commands**:
- \`.afk <reason>\`: Set yourself as AFK with a reason.
- \`.unafk <reason>\`: Unset yourself from AFK.

## ${client.emoji.util.ar} **[AR]**
### **Auto-Response Commands**:
- \`.ar add <name> <response>\`: Adds a new auto-response.
- \`.ar remove <name>\`: Removes an auto-response.
- \`.ar config\`: Configures auto-responses.
- \`.ar reset\`: Resets auto-responses to default.

### **Auto React Commands**:
- \`.react add <trigger> <emoji>\`: Adds a new autoreact.
- \`.react remove <trigger>\`: Removes a autoreact.
- \`.react config\`: Configures autoreact.
- \`.react reset\`: Resets autoreact to default.

## ${client.emoji.util.currency} **[CURRENCY]**
### **Financial & Currency Conversion Commands**:
- \`.bal <addy>\`: Checks the balance for the given address.
- \`.sendltc <addy> <amount>\`: Send Money to the given address.
- \`.growth\`: Displays LTC growth statistics.
- \`.ltc\`: Displays Litecoin price.
- \`.c2i <amount>\`: Converts LTC to INR.
- \`.c2u <amount>\`: Converts LTC to USD.
- \`.u2c <amount>\`: Converts USD to LTC.
- \`.u2i <amount>\`: Converts USD to INR.
- \`.i2c <amount>\`: Converts INR to LTC.
- \`.i2u <amount>\`: Converts INR to USD.
- \`.qr <upi/ltc> <amount> <upi/addy>\`: Generates QR code for UPI or Litecoin.
`;
                const page2 = `## ${client.emoji.util.mod} **[MOD]**
### **Mod Commands**:
- \`.hide <channel>\`: Hides the specified channel.
- \`.unhide <channel>\`: Unhides the specified channel.
- \`.lock <channel>\`: Locks the specified channel.
- \`.unlock <channel>\`: Unlocks the specified channel.

## ${client.emoji.util.utility} **[UTILITY]**
### **To-Do Commands**:
- \`.todo add <task>\`: Adds a new to-do task.
- \`.todo remove <index>\`: Removes a to-do task.
- \`.todo config\`: Configures to-do tasks.
- \`.todo reset\`: Resets to-do tasks to default.

### **Server Commands**:
- \`.boost\`: Boost a Server.
- \`.serveravatar\`: Displays the server's avatar URL.
- \`.serverbanner\`: Displays the server's banner URL.

### **Utility & Information Commands**:
- \`.math\`: Performs basic mathematical calculations.
- \`.ping\`: Checks the bot's latency.
- \`.uptime\`: Displays selfbot uptime message.
- \`.help\`: Displays this help message.
- \`.setbadge\`: Sets Hype Squad badge.
- \`.avatar [userID]\`: Fetches a user's avatar URL by their ID.
- \`.banner [userID]\`: Fetches a user's banner URL by their ID.
- \`.checkpromo <link>\`: Checks the validity of a promotion link.
- \`.checktoken <token>\`: Verifies if the token is valid or invalid.

## ${client.emoji.util.vc} **[VC]**
### **VC Commands**:
- \`.join <channel_id>\`: Makes the bot join the specified voice channel by ID, or the voice channel you are in if no ID is provided.
- \`.leave\`: Disconnects the bot from the voice channel it is in, if connected.

## ${client.emoji.util.vouch} **[VOUCH]**
### **Vouch Commands**:
- \`.vouch <amount> <currency> <product>\`: Generates a Vouch message for a product with amount and currency.
- \`.exvouch <amount> <currency> <product>\`: Generates a Vouch message for a exchange currency with amount and currency.
`;
                await message.channel.send({ content: page1 }).then((sentMessage) => {
                    setTimeout(() => {
                        sentMessage.delete().catch((err) => console.error('Failed to delete message:', err));
                    }, 120000);
                });
                await message.channel.send({ content: page2 }).then((sentMessage) => {
                    setTimeout(() => {
                        sentMessage.delete().catch((err) => console.error('Failed to delete message:', err));
                    }, 120000);
                });
                break;
            default:
                await message.channel.send({ content: homePage }).then((sentMessage) => {
                    setTimeout(() => {
                        sentMessage.delete().catch((err) => console.error('Failed to delete message:', err));
                    }, 120000);
                });
                break;
        }
    }
};
