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

const db = client.db("UltimateTicTacToe");

const games = db.collection("games");
const accounts = db.collection("accounts");

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
        "creation-date": `${today.getFullYear()}-${
            today.getMonth() + 1
        }-${today.getDate()}`,
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
    console.log(socket.id);
});
