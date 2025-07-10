const fetch = require("node-fetch");

module.exports = async function videotwing(req, res) {
  const twitterUrl = req.query.url;

  if (
    !twitterUrl ||
    !(twitterUrl.includes("twitter.com") || twitterUrl.includes("x.com"))
  ) {
    return res
      .status(400)
      .json({ error: "有効なTwitterまたはXのURLを指定してください" });
  }

  const fxApiUrl = twitterUrl.replace(/(x|twitter)\.com/, "api.fxtwitter.com");

  try {
    const response = await fetch(fxApiUrl);
    if (!response.ok) {
      return res
        .status(500)
        .json({ error: "fxtwitter APIからの取得に失敗しました" });
    }

    const data = await response.json();

    const variants = data?.tweet?.media?.videos?.[0]?.variants;
    if (!variants || !Array.isArray(variants)) {
      return res
        .status(404)
        .json({ error: "動画のバリアントが見つかりませんでした" });
    }

    const mp4s = variants.filter((v) => v.content_type === "video/mp4");
    if (mp4s.length === 0) {
      return res.status(404).json({ error: "mp4動画がありません" });
    }

    const bestMp4 = mp4s.reduce((best, current) =>
      (current.bitrate || 0) > (best.bitrate || 0) ? current : best
    );

    return res.json({
      thumbnail: data.tweet.media.videos?.[0]?.thumbnail_url || null,
      mp4: bestMp4.url,
      q: bestMp4.bitrate,
      text: data.tweet.text,
      author: data.tweet.author.screen_name,
    });
  } catch (error) {
    console.error("取得エラー:", error);
    return res.status(500).json({ error: "サーバー内部エラー" });
  }
};
