export default function (req, res) {
    const isConflictCluster = req.headers.host.endsWith('.conflictjs.dev');

    if (!isConflictCluster) return res.status(401).json({ error: 'Not a conflict cluster' });

    const app = req.headers.host.split('.').reverse()[2];

    res.status(200).json({ app });
}