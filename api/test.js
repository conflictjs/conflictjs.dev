import fetch from 'node-fetch';

export default async function (req, res) {
    const isConflictCluster = req.headers.host.endsWith('.conflictjs.dev');
    const isDiscordInteractions = req.headers['user-agent'].toLowerCase().includes('discord-interactions');
    
    if (!isConflictCluster) return res.status(401).json({ error: 'Not a conflict cluster' });

    const app = req.headers.host.substring(0, req.headers.host.indexOf('.conflictjs.dev'));

    const url = 'https://vercel-conflict-bot.vercel.app/discord';

    const headersToSend = {
        'x-signature-ed25519': req.headers['x-signature-ed25519'],
        'x-signature-timestamp': req.headers['x-signature-timestamp']
    };

    if (isDiscordInteractions) {
        const response = await fetch(url, {
            method: req.method,
            headers: headersToSend,
            body: req.body
        });
        
        for (const header in response.headers) {
            try {
                res.setHeader(header, response.headers[header]);
            } catch (err) {
                console.error(err);
            }
        }

        const text = await response.text();
        const data = {
            method: req.method,
            headers: headersToSend,
            responseHeaders: response.headers,
            status: response.status,
            responseBody: text,
            requestBody: req.body,
            url,
            response
        };

        console.log(data);

        // await fetch(process.env.WEBHOOK, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         content: JSON.stringify([req.headers['user-agent'], app, 3, data], null, 4)
        //     })
        // });

        res.status(response.status).send(text);


        return;
    }

    res.status(200).json({ app });
}
