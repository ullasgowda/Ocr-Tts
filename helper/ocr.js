const { createWorker } = require('tesseract.js'),
    worker = createWorker();

exports.ocr = async (imagePath) => {
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const { data: { text } } = await worker.recognize(imagePath);
    // await worker.terminate();
    return text;
}