# Discord Gamers Bot 🎮

Un bot Discord simple et amusant avec des commandes de jeux pour animer vos serveurs !

## Fonctionnalités

- 🎲 `!roll [max]` - Lance un dé entre 1 et le nombre maximum spécifié (100 par défaut)
- 🪙 `!coinflip` - Lance une pièce (Pile ou Face)
- 🪨 `!rps [pierre|papier|ciseaux]` - Joue au Pierre-Papier-Ciseaux contre le bot

## Installation

1. Clonez le dépôt :
```bash
git clone https://github.com/HansHemsey/discord_gamers-bot.git
cd discord_gamers-bot
```

2. Installez les dépendances :
```bash
npm install
```

3. Créez un fichier `.env` à la racine du projet et ajoutez votre token Discord :
```
DISCORD_TOKEN=votre_token_ici
```

4. Lancez le bot :
```bash
npm start
```

## Configuration

Le bot utilise les intents suivants qui doivent être activés dans le [Portail Développeur Discord](https://discord.com/developers/applications) :
- PRESENCE INTENT
- SERVER MEMBERS INTENT
- MESSAGE CONTENT INTENT

## Commandes

### !roll
- Usage : `!roll` ou `!roll [nombre]`
- Description : Lance un dé entre 1 et le nombre spécifié
- Exemple : `!roll 50` (lance un dé entre 1 et 50)

### !coinflip
- Usage : `!coinflip`
- Description : Lance une pièce (Pile ou Face)
- Exemple : `!coinflip`

### !rps
- Usage : `!rps [pierre|papier|ciseaux]`
- Description : Joue au Pierre-Papier-Ciseaux contre le bot
- Exemple : `!rps pierre`

## Dépendances

- discord.js ^14.14.1
- dotenv ^16.4.1

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche pour votre fonctionnalité
3. Commiter vos changements
4. Pousser vers la branche
5. Ouvrir une Pull Request

## Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails. 