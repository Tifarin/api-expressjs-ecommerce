import * as UserRepo from '../repository/user.js';
import { successResponse, errorResponse } from '../utils/response.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_AT = "KELAS.COM";  
const SECRET_RT = "apaajabolehlahya";

export const getAllUser = async (request, response, next) => {
    try {
        const [result] = await UserRepo.getData();
        successResponse(response, "Ok",result)
    } catch (error) {
        next(error)
    }
}

export const createUser = async (request, response, next) => {
    try {
        let name = request.body.name;
        let email = request.body.email;
        let password = request.body.password;
        let saldRound = 10;
        let hashPassword = "";
        bcrypt.hash(password, saldRound, async (err, hash) => {
            hashPassword = hash;
            const [result] = await UserRepo.createData(name, email, hashPassword);
            successResponse(response, "berhasil menambahkan data", result.insertId)
        })
            
    } catch(error) {
        next(error);
    }
}

export const getUserById = async(request, response, next) => {
    try {
        let id = request.params.id;
        const [result] = await UserRepo.getDataById(id);
        console.log(result);
        if(result.length > 0) {
            successResponse(response, "Ok", result[0])
        } else {
            errorResponse(response, "data tidak ditemukan", 404);
        }
    } catch(error) {
        next(error)
    }
}

export const updateUser = async(request, response, next) => {
    try {
        let id = request.params.id;
        let name = request.body.name;
        let email = request.body.email;
        let password = request.body.password;
        let saldRound = 10;
        let hashPassword = "";
        bcrypt.hash(password, saldRound, async (err, hash) => {
            hashPassword = hash;
            const [result] = await UserRepo.updateData(name, email, hashPassword, id);
            if(result.affectedRows > 0) {
                successResponse(response, "berhasil mengubah data", result.affectedRows)
            } else {
                errorResponse(response, "data tidak ditemukan", 404);
            }
        })
        
    } catch(error) {
        next(error)
    }
}

export const deleteUser = async(request, response, next) => {
    try {
        let id = request.params.id;
        const [result] = await UserRepo.deleteData(id);
        if(result.affectedRows > 0) {
            successResponse(response, "berhasil menghapus data", result.affectedRows)
        } else {
            errorResponse(response, "data tidak ditemukan", 404);
        }
    } catch(error) {
        next(error)
    }
}

export const authUser = async (request, response, next) => {
    try {
        let email = request.body.email;
        let pass = request.body.password;
        const [result] = await UserRepo.getDataByEmail(email);
        const user = result[0];

        if (result.length > 0) {
            bcrypt.compare(pass, user.password, (err, result) => {
                if (result) {
                    delete user.password;
                    let claims = {
                        id: user.id,
                        email: user.email
                    };
                    const accessToken = jwt.sign(claims, SECRET_AT, { expiresIn: '15m' });
                    const refreshToken = jwt.sign(claims, SECRET_RT, { expiresIn: '30m' });
                    let respData = {
                        user: user,
                        access_token: accessToken,
                        refresh_token: refreshToken
                    };
                    successResponse(response, "Ok", respData);
                } else {
                    errorResponse(response, "password salah", 401);
                }
            });
        } else {
            errorResponse(response, "email salah", 401);
        }        
    } catch(error) {
        next(error)
    }
}

export const authenticateToken = (request, response, next) => {
    const token = request.headers.authorization;
    if (!token) {
        return errorResponse(response, 'Token tidak ditemukan', 401);
    }

    jwt.verify(token, SECRET_AT, (err, decoded) => {
        if (err) {
            return errorResponse(response, 'Token tidak valid', 401);
        }

        // Pastikan decoded data pengguna ada sebelum mengirim respons sukses
        if (decoded && decoded.id && decoded.email) {
            const user = decoded;
            request.user = user;
            // successResponse(response, "Ok", user);
            next()
        } else {
            errorResponse(response, 'Data pengguna tidak valid dalam token', 401);
        }
    });
};

