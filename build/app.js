"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var dotenv_1 = __importDefault(require("dotenv"));
var mongoose_1 = __importDefault(require("mongoose"));
// ENV CONFIG
dotenv_1.default.config();
// Express
var app = express_1.default();
// Routes
var articles_1 = __importDefault(require("./routes/articles"));
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use("/articles", articles_1.default);
app.use("/users", function (req, res, next) {
    console.log("Users middleware");
    next();
});
// Routes
app.get("/", function (req, res) {
    res.send("Hello World!");
});
app.get("/users", function (req, res) {
    res.send("Users!");
});
var MONGO_URI = process.env.MONGO_URI;
mongoose_1.default.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, function () { return console.log("Connected to DB"); });
app.use("/static", express_1.default.static(path_1.default.join(__dirname, "public")));
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () { return console.log("Listening on port " + PORT); });
