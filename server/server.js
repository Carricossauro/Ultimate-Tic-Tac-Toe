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

async function joinGame(gameID, playerID) {
    const result = await games
        .find({ _id: ObjectId(gameID), status: false })
        .toArray();
    if (!result) return false;
    const game = result[0];

    if (
        game["pX"].toHexString() === playerID ||
        game["pO"].toHexString() === playerID
    ) {
        return true;
    } else if (game["pO"] === null) {
        games.updateOne(
            { _id: ObjectId(gameID) },
            { $set: { pO: ObjectId(playerID) } }
        );
        return true;
    } else return false;
}

async function gameInfo(gameID) {
    const result = await games.find({ _id: ObjectId(gameID) }).toArray();
    if (!result) return null;
    const game = result[0];

    return game;
}

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

async function playerInfo(playerID) {
    if (!playerID) return null;
    const result = await accounts
        .find({ _id: ObjectId(playerID) }, { name: 1 })
        .toArray();
    if (!result) return null;
    return result[0];
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

    socket.on("join", async (gameID, playerID, callback) => {
        const response = await joinGame(gameID, playerID);

        if (response) {
            socket.join(gameID);
            console.log(
                `Joined connection with id ${socket.id} to room ${gameID}`
            );
        }

        callback(response);
    });

    socket.on("game-info", async (gameID, callback) => {
        if (socket.rooms.has(gameID)) {
            const game = await gameInfo(gameID);
            if (!game["status"]) callback(game);
        } else callback(null);
    });

    socket.on("player-info", async (playerID, callback) => {
        callback(await playerInfo(playerID));
    });
});
