import { Client, GatewayIntentBits, EmbedBuilder } from 'discord.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Configuration
const config = {
    prefix: '!',
    colors: {
        primary: '#0099ff',
        success: '#57F287',
        error: '#ED4245'
    },
    emojis: {
        dice: '🎲',
        coin: '🪙',
        rps: '🪨',
        success: '✅',
        error: '❌'
    }
};

// Create a new client instance
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences
    ]
});

// When the client is ready, run this code
client.once('ready', () => {
    console.log('Bot is ready!');
});

// Listen for messages
client.on('messageCreate', (message) => {
    // Ignore messages from other bots
    if (message.author.bot) return;

    // Check if message starts with prefix
    if (!message.content.startsWith(config.prefix)) return;

    // Get command and arguments
    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // Roll command
    if (command === 'roll') {
        let max = 100; // Default value

        // If there's an argument, try to parse it
        if (args[0]) {
            const parsedMax = parseInt(args[0]);
            if (isNaN(parsedMax) || parsedMax <= 0) {
                const errorEmbed = new EmbedBuilder()
                    .setColor(config.colors.error)
                    .setTitle(`${config.emojis.error} Erreur`)
                    .setDescription('Veuillez entrer un nombre valide supérieur à 0 !');
                return message.reply({ embeds: [errorEmbed] });
            }
            max = parsedMax;
        }

        // Generate random number
        const result = Math.floor(Math.random() * max) + 1;

        // Create embed
        const embed = new EmbedBuilder()
            .setColor(config.colors.primary)
            .setTitle(`${config.emojis.dice} Lancer de dé`)
            .setDescription(`**${message.author.username}** a lancé un dé !`)
            .addFields(
                { name: 'Résultat', value: `\`${result}\``, inline: true },
                { name: 'Maximum', value: `\`${max}\``, inline: true }
            )
            .setTimestamp();

        // Send the embed
        message.reply({ embeds: [embed] });
    }

    // Coinflip command
    if (command === 'coinflip') {
        // Generate random result (true = Pile, false = Face)
        const isHeads = Math.random() < 0.5;
        const result = isHeads ? 'Pile' : 'Face';
        const emoji = isHeads ? '🪙' : '🪙';

        // Create embed
        const embed = new EmbedBuilder()
            .setColor(config.colors.primary)
            .setTitle(`${config.emojis.coin} Lancer de pièce`)
            .setDescription(`**${message.author.username}** a lancé une pièce !`)
            .addFields(
                { name: 'Résultat', value: `${emoji} \`${result}\`` }
            )
            .setTimestamp();

        // Send the embed
        message.reply({ embeds: [embed] });
    }

    // Rock Paper Scissors command
    if (command === 'rps') {
        // Get the argument
        const choice = args[0]?.toLowerCase();
        
        // Valid choices
        const choices = ['pierre', 'papier', 'ciseaux'];
        
        // Check if the argument is valid
        if (!choice || !choices.includes(choice)) {
            const errorEmbed = new EmbedBuilder()
                .setColor(config.colors.error)
                .setTitle(`${config.emojis.error} Erreur`)
                .setDescription('Veuillez choisir entre `pierre`, `papier` ou `ciseaux` !');
            return message.reply({ embeds: [errorEmbed] });
        }

        // Bot's choice
        const botChoice = choices[Math.floor(Math.random() * choices.length)];

        // Determine the winner
        let result, resultEmoji;
        if (choice === botChoice) {
            result = 'Égalité !';
            resultEmoji = '🤝';
        } else if (
            (choice === 'pierre' && botChoice === 'ciseaux') ||
            (choice === 'papier' && botChoice === 'pierre') ||
            (choice === 'ciseaux' && botChoice === 'papier')
        ) {
            result = 'Tu as gagné !';
            resultEmoji = '🎉';
        } else {
            result = 'J\'ai gagné !';
            resultEmoji = '😎';
        }

        // Emojis for each choice
        const emojis = {
            'pierre': '🪨',
            'papier': '📄',
            'ciseaux': '✂️'
        };

        // Create embed
        const embed = new EmbedBuilder()
            .setColor(config.colors.primary)
            .setTitle(`${config.emojis.rps} Pierre-Papier-Ciseaux`)
            .setDescription(`**${message.author.username}** a joué contre le bot !`)
            .addFields(
                { name: 'Ton choix', value: `${emojis[choice]} \`${choice}\``, inline: true },
                { name: 'Mon choix', value: `${emojis[botChoice]} \`${botChoice}\``, inline: true },
                { name: 'Résultat', value: `${resultEmoji} ${result}` }
            )
            .setTimestamp();

        // Send the embed
        message.reply({ embeds: [embed] });
    }
});

// Login to Discord with your client's token
client.login(process.env.DISCORD_TOKEN); 