import { MongoClient, ObjectId } from "mongodb";
import { Server } from "socket.io";

const smallBoardEmpty = ["", "", "", "", "", "", "", "", ""];
const bigBoardEmpty = [
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
];

const uri =
    "mongodb+srv://teste:teste@ultimatetictactoe.t8160.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(uri);

await client.connect();
console.log("Connected to mongoDB database...");

const db = client.db("UltimateTicTacToe");

const games = db.collection("games");
const accounts = db.collection("accounts");

async function gameList(playerID) {
    const result = await games
        .find(
            { $or: [{ pX: ObjectId(playerID) }, { pO: ObjectId(playerID) }] },
            {
                _id: 1,
                pX: 1,
                status: 1,
                winner: 1,
            }
        )
        .sort({ "creation-date": -1 })
        .limit(15)
        .toArray();

    return result;
}

async function createAccount(name) {
    const result = await accounts.insertOne({
        name: name,
        wins: 0,
        losses: 0,
        ties: 0,
    });

    return result["insertedId"].toHexString();
}

async function createGame(playerId) {
    const today = new Date();

    const result = await games.insertOne({
        pX: ObjectId(playerId),
        pO: null,
        status: false,
        winner: null,
        bigBoard: bigBoardEmpty,
        smallBoard: smallBoardEmpty,
        "creation-date": new Date(
            `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
        ),
    });

    return result["insertedId"].toHexString();
}

/*
###################################
Socket.io only from here and beyond
###################################
*/

const io = new Server(3600, {
    cors: {
        origin: "*",
    },
});

io.on("connection", (socket) => {
    console.log(`Received connection with id ${socket.id}`);

    socket.on("create-account", async (name, callback) => {
        callback(await createAccount(name));
    });

    socket.on("game-list", async (playerID, callback) => {
        callback(await gameList(playerID));
    });

    socket.on("create-game", async (playerID, callback) => {
        callback(await createGame(playerID));
    });
});
