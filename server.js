// import { DatabaseMemory } from "./database-memory.js";
import express from "express";
import { DatabasePostgres } from "./database-postgres.js";
const server = express();
const database = new DatabasePostgres();

// middleware para o express entender o corpo da requisição como JSON
server.use(express.json());

server.get("/videos", async (req, res) => {
	const search = req.query.search;

	// usando o banco de dados em memoria para listar todos os videos
	const allVideos = await database.list(search);

	return res.send(allVideos);
});

server.post("/videos", async(req, res) => {
	const { title, description, duration } = req.body;
	// usando o banco de dados em memoria para criar um novo video
	await database.create({
		title,
		description,
		duration
	});
	return res.status(201).send(); 
});

server.put("/videos/:id", (req, res) => {
	const videoID = req.params.id;
	const { title, description, duration } = req.body;
	database.update(videoID, { title, description, duration });
	return res.status(204).send();
});

server.delete("/videos/:id", (req, res) => {
	const videoID = req.params.id
	database.delete(videoID);

	return res.status(204).send();
});

server.listen(2222, () => {
	console.log("Server is running on port 2222");
});
