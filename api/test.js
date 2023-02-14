export default function (req, res) {

    console.log({ req, res });

    res.status(200).json({ name: 'John Doe' });
}