import '../lib/pagesCollection.js';
import '../lib/portfolioCollection.js';
/*
import { Meteor } from 'meteor/meteor';

WebApp.connectHandlers.use('/file', (req, res) => {
    res.setHeader("Access-Control-Allow-Methods", "PUT");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    } else if (req.method === 'PUT') {
        if (!req.headers['content-type'].startsWith('image')) {
            res.writeHead(400);
            res.end();
        }
        
        let getFile = Meteor.wrapAsync(done => {
            let chunks = [];
            req.on('readable', () => {
                chunks.push(req.read());
            });
            req.on('end', () => {
                done(undefined, Buffer.concat(chunks));
            });
        });

        let buffer = getFile();

        res.writeHead(200);
        res.end();
    }
});
*/



