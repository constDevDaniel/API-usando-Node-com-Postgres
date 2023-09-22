import { randomUUID } from "node:crypto";

export class DatabaseMemory {
	#videos = new Map(); // #videos is a private property

	//Set (não aceita valores duplicados), Map (chave e valor)

	list() {
		return Array.from(this.#videos.entries()).map((videoArray) => {
			const id = videoArray[0];
			const data = videoArray[1];

			return {id, ...data};
		});
	}

	//adicionando os videos ao array de videos (salvando os videos)
	create(video) {
		const videoID = randomUUID(); //criando um id para cada video
		this.#videos.set(videoID, video);
	}

	update(id, video) {
		this.#videos.set(id, video);
	}

	delete(id) {
		this.#videos.delete(id);
	}
}
