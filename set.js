const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaURMTlI4OVZjWXlGamZEa0Y2SWgwekc5ZEcraVNxd1dMQkxUOEJCd3UwTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR2lTL2k3aGxOMTViY2ZUVUdnenJ1YXpzV0JGWUNwUUcrL1lQdE9zdVRtZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVTGxPUHF3K01QR1dON1FHUHIvQkUvVk82MEx0VGlkZWhTa3RVL05IMmxnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvMDhZaDRiKzZVWDZUbFIxK0NKbG56Z3hQU3JaSUVoZHVPUkhPM0lUb1R3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1GalpoNmFPdXk5Zlh1QzFwSjZYeTVlSVhXQkV3aGIwMnZYVmdRNlMwWHc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlAydnBsMzJIS250a21LZUdQdllISDJzcm5BTWtuRm5ZU09kbmwrNGZhbDg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV0FJbTlENlFKU3Avbm5WbDdYUDlBZzhSbk1oaUVZVjV4YmkrQmRsZHFWWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZjZSWjBFdnE4Tnh0YnN1VFpRR2lvZWlqK2toZG8wK0pkQ3BheGEzcVFHMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Imt1SjEyWlkzUjZidUNwYlB6ZmJ2Z3VkOE5ldW5LQjVwRzZFcHdXUTE3azZQZXlhNkdGT2tFbVJvbExtZXdaS0lmbjMxZFZrUG9BMVFQM1FRSExyOUJnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTgzLCJhZHZTZWNyZXRLZXkiOiJydjltV01pcUpLSWVuMFlSNFhzMGg3c2NVeDJuUmw5YUNaclluUGtuRnVZPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJneW50NXdLN1RxMjlSaXFOTnU5dmhBIiwicGhvbmVJZCI6IjNmMDQ1NGVjLWY5OWUtNDBhMS04MmY5LTMzNjBmMmEzM2QzMSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJkZzdNSWtzRHhLVGtYRklacWUxTXJXOHp0ZTA9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaHRiYmdEanovMm9xbmN1RXlkSndkMmRlT2x3PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6Ik5LUVQ0MUM5IiwibWUiOnsiaWQiOiI5MjMzNDY2OTAyMzk6MTJAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiTXVza2FuIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNNVy9xWklDRU03K29yWUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJYeWVDZk16QzYvSFlNVkNOaHBWck9BYmdiUVZwUVVtVERicnZmYUZxNlVBPSIsImFjY291bnRTaWduYXR1cmUiOiI5bVhEcUZXOG84S25hdUxBSlNwY0c2RDhSS1JITmcxVGd5YWo4anA2K1JVYTlMc0V1dHVNeFM2aGlmd2VyQzFybWh5Rmpiak5JS0QrTUtuTHJSWVhEUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoidGV5M2J0SUVkeWZIbDY0Y0FDYXZ2NzJoNkxQSW5qWUgxU1l6WmVEMUtpUUZGMmNyMUtWMDUyL0RjVlJXQ2w1eXljUmFPQWZpSGcvVDNlL0xzMThDQUE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI5MjMzNDY2OTAyMzk6MTJAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVjhuZ256TXd1dngyREZRallhVmF6Z0c0RzBGYVVGSmt3MjY3MzJoYXVsQSJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyNDQzMjIxOX0=,
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "France King",
    OWNER_NUMBER : process.env.OWNER_NUMBER || "923346690239", 
    A_REACT : process.env.AUTO_REACTION || 'on',     
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
CHATBOT: process.env.CHAT_BOT || "on",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    BOT : process.env.BOT_NAME || 'FLASH-MD',
    //OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || '',
    MODE: process.env.BOT_MODE || "public",
    PM_PERMIT: process.env.PM_PERMIT || 'off',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_MESSAGE || "on",
//    ADM : process.env.ANTI_DELETE_MESSAGE || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd" : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

