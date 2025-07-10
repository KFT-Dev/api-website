module.exports = async function lookmp4upUser(req, res) {
  const mp4 = req.query.url;

  const HTML = `
    <!DOCTYPE html>
<head>
<meta property="og:title" content="ChatGPT">
  <meta property="og:type" content="video.other" />
  <meta property="og:video" content="${mp4}" />
  <meta property="og:video:type" content="video/mp4" />
</head>

    `;
  res.send(HTML);
};
