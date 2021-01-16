const gTTS = require('gtts');
const fs = require('fs')

exports.tts = async (text) => {

    const filePath = 'P:\\NodeJS\\Tesseract\\mark1\\voices/Voice-' + Math.random() + '.mp3';
    fs.closeSync(fs.openSync(filePath, 'w'))

    var gtts = new gTTS(text, 'en');
    gtts.save(filePath, function (err, result) {
        if (err) { throw new Error(err); }
        console.log("Text to speech converted!");
        return filePath;    
    });
    
}
