const express = require('express');
const {insert,read} = require('../middleware/random');

const router = express.Router();

module.exports = (links) => {
    router.post('/create', async (req, res) => {
        try {
            const a = req.body.shortener;
            console.log(a);
            const response = await fetch(a);
            if (response.status === 200) {
                const response=await insert(links,a);
                res.status(200).json({ "shortenedLink":response });
            } else {
                res.status(400).json({ message: "error2"}); 
            }
        } catch (err) {
            res.status(500).json({ error: "internal server error", message: err.message });
        }
    });
    router.get('/visit/:short', async (req, res) => {
        try {
            const a = req.params.short;
            const response=await read(links,a);
            if (response) {
                res.redirect(response.url);
            }
            else {
                res.status(400).json({ message: "error2"}); 
            }
        } catch (err) {
            res.status(500).json({ error: "internal server error", message: err.message });
        }
    });
    return router;
};
