import * as AddressRepository from '../repository/address.js';
import {successResponse, errorResponse} from '../utils/response.js';

export const getAllAddress = async (req, res, next) => {
    try {
        const [result] = await AddressRepository.getData();
        successResponse(res, "Ok",result)
    } catch (error) {
        next(error)
    }
}

export const getAddressByIdUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const [result] = await AddressRepository.getDataByIdUser(id);
        if(result.length > 0) {
            successResponse(res, "Ok", result)
        } else {
            errorResponse(res, "data tidak ditemukan", 404);
        }
    } catch (error) {
        next(error)
    }
}

export const createAddress = async (req, res, next) => {
    try {
        const { user_id, street_address, city, postal_code } = req.body;
        const [result] = await AddressRepository.createData(user_id, street_address, city, postal_code);
        successResponse(res, "Data berhasil ditambahkan", result.insertId);
    } catch (error) {
        next(error)
    }
}

export const updateAddress = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { user_id, street_address, city, postal_code } = req.body;
        const [result] = await AddressRepository.updateData(id, user_id, street_address, city, postal_code);
        if(result.affectedRows > 0) {
            successResponse(res, "berhasil mengubah data", result.affectedRows)
        } else {
            errorResponse(res, "data tidak ditemukan", 404);
        }
    } catch (error) {
        next(error)
    }
}

export const deleteAddress = async (req, res, next) => {
    try {
        const id = req.params.id;
        const [result] = await AddressRepository.deleteData(id);
        if(result.affectedRows > 0) {
            successResponse(res, "berhasil mengubah data", result.affectedRows)
        } else {
            errorResponse(res, "data tidak ditemukan", 404);
        }
    } catch (error) {
        next(error)
    }
}