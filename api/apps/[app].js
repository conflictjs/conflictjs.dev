export default async function app (req, res) {
    const app = req.query.app;

    const data = {
        status: 'up',
        name: app,
        endpoint: 'https://vercel-conflict-bot.vercel.app/discord'
    };

    return res.status(200).json(data);
}