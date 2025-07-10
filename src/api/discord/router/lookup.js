require("dotenv").config();
const fetch = require("node-fetch");

const Token = process.env.DISCORDTOKEN;

const FLAGS = {
  DISCORD_EMPLOYEE: 1,
  PARTNERED_SERVER_OWNER: 2,
  HYPESQUAD_EVENTS: 4,
  BUG_HUNTER_LEVEL_1: 8,
  HOUSE_BRAVERY: 64,
  HOUSE_BRILLIANCE: 128,
  HOUSE_BALANCE: 256,
  EARLY_SUPPORTER: 512,
  TEAM_USER: 1024,
  BUG_HUNTER_LEVEL_2: 16384,
  VERIFIED_BOT: 65536,
  EARLY_VERIFIED_BOT_DEVELOPER: 131072,
  DISCORD_CERTIFIED_MODERATOR: 262144,
  ACTIVE_DEVELOPER: 4194304,
};

module.exports = async function lookupUser(req, res) {
  const userId = req.params.id;

  try {
    const response = await fetch(
      `https://discord.com/api/v10/users/${userId}`,
      {
        headers: {
          Authorization: `Bot ${Token}`,
        },
      }
    );

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: "ユーザーが見つかりません" });
    }

    function parseFlags(flagValue) {
      return Object.entries(FLAGS)
        .filter(([_, bit]) => (flagValue & bit) !== 0)
        .map(([name]) => name);
    }

    const data = await response.json();

    const jsonData = {
      user: {
        id: data.id,
        main_name: data.username,
        profile_name: data.globalname,
        flags: {
          parsed_flags: parseFlags(data.flags || 0),
        },
        avatar: {
          url:
            data.avatar && data.avatar !== "null"
              ? `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png`
              : `https://cdn.discordapp.com/embed/avatars/${
                  parseInt(data.discriminator) % 5
                }.png`,
        },
      },
    };

    res.json(jsonData);
  } catch (error) {
    console.error("API error:", error);
    res.status(500).json({ error: "サーバーエラー" });
  }
};
