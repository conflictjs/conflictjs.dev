import fetch from 'node-fetch';

export default async function (req, res) {
    const isConflictCluster = req.headers.host.endsWith('.conflictjs.dev');
    const isDiscordInteractions = req.headers['user-agent'].toLowerCase().includes('discord-interactions');
    
    if (!isConflictCluster) return res.status(401).json({ error: 'Not a conflict cluster' });

    const app = req.headers.host.substring(0, req.headers.host.indexOf('.conflictjs.dev'));

    if (isDiscordInteractions) {
        const response = await fetch('https://vercel-bot-pi.vercel.app/api', {
            method: 'POST',
            headers: req.headers,
            body: req.body
        });
        
        for (const header in response.headers) {
            res.setHeader(header, response.headers[header]);
        }

        const text = await response.text();

        res.status(response.status).send(text);


        await fetch(process.env.WEBHOOK, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: JSON.stringify([req.headers['user-agent'], app, 3, {
                    headers,
                    responseHeaders: response.headers,
                    status: response.status,
                    responseBody: text,
                    requestBody: req.body
                }], null, 4)
            })
        });

        return;
    }

    res.status(200).json({ app });
}
