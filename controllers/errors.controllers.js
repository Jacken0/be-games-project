exports.notARoute = (req, res) => {
    res.status(404).send({ message: "Invalid URL" });
};