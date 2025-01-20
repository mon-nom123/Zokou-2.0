const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'Zokou-MD-WHATSAPP-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUU9wSXd0WjRMaVEydSt4UDNaamVTWFZ2bWhTR1NqTHhTR1VGQVA2cG5XST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV29XM1ZqVDdpaGI1NWgrVzBNU2dXbmhyTmFMbW01bUhnUnZHMkNFMG9Dcz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJSUdPR21PRnRKY0lPSjVnd1NqQ2p0NUs2QnpXRUdhTUJaKytVU2o5K21RPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjdWJ1NGVtUHZXMUJKMWNEc2NwQU1BcHkyeEh0K1NNRjhSSUpJSThLK2hvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVHNVl1T3J4R3V2RThjYU1FTGJleGViQ3pxNzVOM25FTG9oOVRLUFN3WDQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImkyYjc2RzFUTVlkb0JwWmlKUTIvU0sxaE4rRFExdGUzRjM1ZEdlV3lBelE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUJOdTNOczRvamRaNTBiR1NIMk9EL2RlRGNwSFlrWVVYcnZ5dVQvM3Exbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSjZsenRQWWxPTkMxeWpVVmttZnh5NWV1RHR4Wi9GWWF2eml3dmxNdWJTYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9ZMGVhS0g2cFhIaGJ0ZWduSkkyR3dpWDFJSkNHZG1MQlRoWWdxV1dIVUg0MXJqNC9rbUljN211WEhnZjIzeXZuSW1DR2VMZHptWDZwQ3d1MURiOEFnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTU0LCJhZHZTZWNyZXRLZXkiOiJoSlBlcGdkOGF4djlzTy82NjREWHRtOUdlTUNMUTBaaGRYMlZKeFdSVEhZPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6NjEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjo2MSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6ZmFsc2UsImFjY291bnQiOnsiZGV0YWlscyI6IkNMTFkwL0VKRU0yNHVyd0dHQU1nQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJzRlJ3TGlka1Q4cUVLd05qdTVLUEs4aUszYUsxcHRaQlhlL1F4ZjAzcGpNPSIsImFjY291bnRTaWduYXR1cmUiOiI4OGZNRmdDMG1NUC9UdUd2NVUrU2grSW00MzNCd2JEcC9Edi9taHBPdmFHb0FwaGZ4K29PdS9QZWVWWnRDeTFpb3hqZmJPTDAxVEYwZWRIR2hPV2VBdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiRmk3NXJaa2w1aUZ2Tnl5dnBoMHRnc2lmYmIrWnU0dDdPdmVUelp6OUdmVmd5dG1Ga3pDQVpEb2ptQmR5M3FINkhTR21MZ3dYVFg3VHg0QmdPUnRPQmc9PSJ9LCJtZSI6eyJpZCI6IjIyMTc3NDEyMzUyOToyOUBzLndoYXRzYXBwLm5ldCIsImxpZCI6IjE3OTc3MDMzNTY5OTAyODoyOUBsaWQifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjIxNzc0MTIzNTI5OjI5QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmJCVWNDNG5aRS9LaENzRFk3dVNqeXZJaXQyaXRhYldRVjN2ME1YOU42WXoifX1dLCJwbGF0Zm9ybSI6ImlwaG9uZSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0EwSUJRPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzM3Mzk5Mzc3LCJsYXN0UHJvcEhhc2giOiIyRzRBbXUiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUxxMSJ9',
     ETAT:process.env.ETAT,
    PREFIXE: process.env.PREFIXE,
    NOM_OWNER: process.env.NOM_OWNER || "Zokou-Md",
    NUMERO_OWNER : process.env.NUMERO_OWNER,              
    LECTURE_AUTO_STATUS: process.env.LECTURE_AUTO_STATUS || "non",
    TELECHARGER_AUTO_STATUS: process.env.TELECHARGER_AUTO_STATUS || 'non',
    MODE: process.env.MODE_PUBLIC,
    PM_PERMIT: process.env.PM_PERMIT || 'non',
    BOT : process.env.NOM_BOT || 'Zokou_MD',
    URL : process.env.LIENS_MENU || 'https://static.animecorner.me/2023/08/op2.jpg',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    //GPT : process.env.OPENAI_API_KEY,
    DP : process.env.STARTING_BOT_MESSAGE || 'oui',
    ATD : process.env.ANTI_DELETE_MESSAGE || 'non',            
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
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
