'use strict';

const { Resume, Education, Experience, Portfolio } = require("./database"); // Mongoose models
const { URL } = require("url");

/**
 * @param {import("http").IncomingMessage} req 
 * @param {import("http").ServerResponse} res 
 */
module.exports = async (req, res) => {
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const pathname = parsedUrl.pathname;
    const method = req.method;

    const routeMap = {
        "/resume": { model: Resume, fields: ["summary", "phone", "email", "location"] },
        "/education": { model: Education, fields: ["degree", "start_year", "end_year", "college", "description"] },
        "/experience": { model: Experience, fields: ["title", "start_date", "end_date", "company", "responsibilities"] },
        "/portfolio": { model: Portfolio, fields: ["title", "description", "image", "link"] }
    };

    if (!routeMap[pathname]) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: "Invalid path" }));
        return;
    }

    const { model, fields } = routeMap[pathname];

    let body = '';
    req.on('data', chunk => { body += chunk; });

    req.on('end', async () => {
        let data = {};
        try {
            if (body.trim() !== '') {
                console.log("🔍 Raw body received:", body); // debug log
                data = JSON.parse(body);
            }
        } catch (err) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid JSON', debug: err.message }));
            return;
        }

        try {
            switch (method) {
                case "GET":
                    const all = await model.find({});
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(all));
                    break;

                case "POST":
                    const newRecord = new model(pickFields(data, fields));
                    await newRecord.save();
                    res.writeHead(201, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: `${model.modelName} added`, id: newRecord._id }));
                    break;

                case "PUT":
                    if (!data.id) throw new Error("ID required for update");
                    const existing = await model.findById(data.id);
                    if (!existing) throw new Error("Record not found");
                    Object.assign(existing, pickFields(data, fields));
                    await existing.save();
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: `${model.modelName} updated` }));
                    break;

                case "DELETE":
                    if (!data.id) throw new Error("ID required for delete");
                    const deleted = await model.findByIdAndDelete(data.id);
                    if (!deleted) throw new Error("Record not found");
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: `${model.modelName} deleted` }));
                    break;

                default:
                    res.writeHead(405, { 'Content-Type': 'text/plain' });
                    res.end("Method Not Allowed");
            }
        } catch (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
        }
    });
};

function pickFields(data, fields) {
    const result = {};
    fields.forEach(f => {
        if (data[f] !== undefined) result[f] = data[f];
    });
    return result;
}
