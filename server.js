// import { DatabaseMemory } from "./database-memory.js";
import express from "express";
import { DatabasePostgres } from "./database-postgres.js";
const server = express();
const database = new DatabasePostgres();

// middleware para o express entender o corpo da requisição como JSON
server.use(express.json());

server.get("/videos", async (req, res) => {
	const search = req.query.search;
	const allVideos = await database.list(search);
	return res.send(allVideos);
});

server.post("/videos", async (req, res) => {
	const { title, description, duration } = req.body;
	await database.create({
		title,
		description,
		duration,
	});
	return res.status(201).send();
});

server.put("/videos/:id", async (req, res) => {
	const videoID = req.params.id;
	const { title, description, duration } = req.body;
	await database.update(videoID, { title, description, duration });
	return res.status(204).send();
});

server.delete("/videos/:id", async (req, res) => {
	const videoID = req.params.id;
	await database.delete(videoID);

	return res.status(204).send();
});

server.listen(process.env.PORT ?? 2222, "0.0.0.0");
