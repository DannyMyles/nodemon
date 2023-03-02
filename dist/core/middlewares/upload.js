"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
function default_1() {
    let uploader = (0, multer_1.default)({ dest: `./public/uploads/` });
    const storage = multer_1.default.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path_1.default.join(__dirname + `/../../../public/uploads`));
        },
        filename: function (req, file, cb) {
            return __awaiter(this, void 0, void 0, function* () {
                const metadata = yield (0, sharp_1.default)(file.originalname).metadata();
                console.log(metadata);
                cb(null, file.originalname);
            });
        },
    });
    uploader = (0, multer_1.default)({
        storage: storage,
        limits: { fileSize: 200000 },
    });
    return uploader;
}
exports.default = default_1;
//# sourceMappingURL=upload.js.map