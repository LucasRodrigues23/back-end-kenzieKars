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
const data_source_1 = __importDefault(require("../../data-source"));
const AppError_1 = require("../../errors/AppError");
const user_schema_1 = require("../../schemas/user.schema");
const entities_1 = require("../../entities");
const UpdateUserService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.default.getRepository(entities_1.User);
    const addressRepository = data_source_1.default.getRepository(entities_1.Address);
    const findUser = yield userRepository.findOne({
        where: { id },
        relations: ["address"],
    });
    if (!findUser) {
        throw new AppError_1.AppError("User not found!", 404);
    }
    if (findUser.email == data.email) {
        delete data.email;
    }
    if (findUser.cpf == data.cpf) {
        delete data.cpf;
    }
    if (data.email) {
        const uniqueEmail = yield userRepository.findOneBy({
            email: data.email
        });
        if (uniqueEmail) {
            throw new AppError_1.AppError("Email already registered", 409);
        }
    }
    if (data.cpf) {
        const uniqueCpf = yield userRepository.findOneBy({
            cpf: data.cpf
        });
        if (uniqueCpf) {
            throw new AppError_1.AppError("Cpf already registered", 409);
        }
    }
    const addressInfo = addressRepository.create(Object.assign(Object.assign({}, findUser.address), data.address));
    const updatedUser = userRepository.create(Object.assign(Object.assign(Object.assign({}, findUser), data), { address: addressInfo }));
    yield userRepository.save(updatedUser);
    return user_schema_1.UserReturnSchema.parse(updatedUser);
});
exports.default = UpdateUserService;
