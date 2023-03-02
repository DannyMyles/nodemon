"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const connect_db_1 = require("./db/connect-db");
const auth_api_1 = __importDefault(require("./routes/auth.api"));
const role_api_1 = __importDefault(require("./routes/role.api"));
const image_api_1 = __importDefault(require("./routes/image.api"));
const app = (0, express_1.default)();
const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
    optionSuccessStatus: 200,
};
dotenv_1.default.config();
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use('/static', express_1.default.static('public/uploads'));
connect_db_1.sequelize
    .sync()
    .then(() => 'Connected to DB!')
    .catch((err) => console.log(err, 'DB ERROR!!!'));
app.use('/auth', auth_api_1.default);
app.use('/role', role_api_1.default);
app.use('/user', image_api_1.default);
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}.`);
});
//# sourceMappingURL=main.js.map