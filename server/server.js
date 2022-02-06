import { MongoClient } from "mongodb";
import { Server } from "socket.io";

const uri =
    "mongodb+srv://teste:teste@ultimatetictactoe.t8160.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(uri);

await client.connect();

const db = client.db("UltimateTicTacToe");

const col = db.collection("games");

async function createGame() {
    const result = await col.insertOne({
        password: Math.random().toString(36).slice(-8),
        over: false,
        playing: "X",
    });

    return result["insertedId"].toHexString();
}

async function endGame(id) {
    const result = await col.updateOne({ _id: id }, { $set: { over: true } });
}

// Socket io only from here and beyond

const io = new Server(3600, {
    cors: {
        origin: "*",
    },
});

io.on("connection", (socket) => {
    console.log(socket.id);

    socket.on("create", async (callback) => {
        const gameId = await createGame();
        console.log(`Created game with id ${gameId}`);
        callback(gameId);
    });
});