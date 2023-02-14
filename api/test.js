import fetch from 'node-fetch';

export default async function (req, res) {
    const isConflictCluster = req.headers.host.endsWith('.conflictjs.dev');
    const isDiscordInteractions = req.headers['user-agent'].toLowerCase().includes('discord-interactions');
    
    if (!isConflictCluster) return res.status(401).json({ error: 'Not a conflict cluster' });

    const app = req.headers.host.split('.').reverse()[2];

    await fetch(process.env.WEBHOOK, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content: JSON.stringify([req.headers['user-agent'], app])
        })
    });

    if (isDiscordInteractions) return res.redirect('https://vercel-bot-pi.vercel.app/api');

    res.status(200).json({ app });
}
