"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const compression_1 = __importDefault(require("compression"));
const connect_db_1 = require("./db/connect-db");
const auth_api_1 = __importDefault(require("./routes/auth.api"));
const role_api_1 = __importDefault(require("./routes/role.api"));
const user_api_1 = __importDefault(require("./routes/user.api"));
const image_api_1 = __importDefault(require("./routes/image.api"));
const gameDifficulty_api_1 = __importDefault(require("./routes/gameDifficulty.api"));
const parentCategory_api_1 = __importDefault(require("./routes/parentCategory.api"));
const errorHandler_1 = __importDefault(require("./core/errorHandler/errorHandler"));
const app = (0, express_1.default)();
const logger = require('morgan');
app.use(logger('dev'));
const PORT = process.env.PORT || 8080;
const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:5175'],
    credentials: true,
    optionSuccessStatus: 200,
};
dotenv_1.default.config();
app.set('showStackError', true);
app.use((0, compression_1.default)());
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use('/static', express_1.default.static('public/uploads'));
connect_db_1.sequelize
    .sync()
    .then(() => 'Connected to DB!')
    .catch((err) => console.log(err, 'DB ERROR!!!'));
app.use('/user', user_api_1.default);
app.use('/auth', auth_api_1.default);
app.use('/role', role_api_1.default);
app.use('/image', image_api_1.default);
app.use('/difficulty_levels', gameDifficulty_api_1.default);
app.use('/parent_categories', parentCategory_api_1.default);
(0, errorHandler_1.default)(app);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
//# sourceMappingURL=main.js.map