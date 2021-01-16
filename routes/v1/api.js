require('rootpath')();

const ocrHelper = require('helper/ocr'),
    ttsHelper = require('helper/tts'),
    express = require('express'),
    router = express.Router(),
    Gtts = require('gtts');

router.get('/convert', async (req, res, next) => {
    try {
        console.log("Get request to convert!");

        let imagePath = req.query.src;
        const text = await ocrHelper.ocr(imagePath),
            gtts = new Gtts(text, 'en');
        res.writeHead(200, {
            'Content-Type': 'audio/mpeg'
        });
        return gtts.stream().pipe(res);
    } catch (err) {
        return res.status(500).json({
            message: err.toString()
        })
    }
});

router.post('/convert', async (req, res, next) => {
    try {
        console.log("Post request to convert!");
        let data = req.body,
            type = data.type,
            text = data.text;

        switch (type) {
            case 'TEXT' || 'text' || 1:
                text = data.text;
                break;
            case 'FILE' || 'file' || 2:
                // @todo : identify format, parse file , save file
                // @todo extract text from file
                break;
        }
        const gtts = new Gtts(text, 'en');
        res.writeHead(200, {
            'Content-Type': 'audio/mpeg'
        });
        return gtts.stream().pipe(res);
    } catch (err) {
        return res.status(500).json({
            message: err.toString()
        })
    }
});


module.exports = router;
