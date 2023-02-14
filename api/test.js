export default function (req, res) {
    res.status(200).json({ host: req.headers.host });
}