const https = require('https');
const fs = require('fs');
const path = require('path');
const url = require('url');

const fontsUrl = "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap";
const userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

const outDir = path.join(__dirname, 'public', 'fonts');
const cssOutFile = path.join(__dirname, 'public', 'fonts.css');

if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

function fetchText(requestUrl, headers) {
    return new Promise((resolve, reject) => {
        https.get(requestUrl, { headers }, (res) => {
            if (res.statusCode !== 200) {
                return reject(new Error(`Failed to fetch ${requestUrl}: ${res.statusCode}`));
            }
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
}

function fetchFile(requestUrl, destPath) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(destPath);
        https.get(requestUrl, (res) => {
            if (res.statusCode !== 200) {
                return reject(new Error(`Failed to fetch ${requestUrl}: ${res.statusCode}`));
            }
            res.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', (err) => {
            fs.unlink(destPath, () => reject(err));
        });
    });
}

async function run() {
    console.log("Fetching CSS from Google Fonts...");
    let cssText = await fetchText(fontsUrl, { 'User-Agent': userAgent });
    
    // Find all url(...) matches
    const urlRegex = /url\((https:\/\/[^)]+)\)/g;
    let match;
    const downloads = [];
    
    let modifiedCss = cssText;
    
    while ((match = urlRegex.exec(cssText)) !== null) {
        let fontUrl = match[1];
        let fontFilename = path.basename(url.parse(fontUrl).pathname);
        let destPath = path.join(outDir, fontFilename);
        
        console.log(`Queueing download: ${fontUrl} -> ${fontFilename}`);
        downloads.push(fetchFile(fontUrl, destPath));
        
        // Replace in CSS to point to local folder
        modifiedCss = modifiedCss.replace(fontUrl, `fonts/${fontFilename}`);
    }
    
    console.log(`Waiting for ${downloads.length} fonts to download...`);
    await Promise.all(downloads);
    
    console.log("Downloading completed. Writing local fonts.css...");
    fs.writeFileSync(cssOutFile, modifiedCss);
    console.log("Done.");
}

run().catch(console.error);
