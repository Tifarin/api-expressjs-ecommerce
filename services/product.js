import * as productRepository from '../repository/product.js';
import {successResponse, errorResponse} from '../utils/response.js';

export const getProducts = async (req, res, next) => {
    try {
        const [result] = await productRepository.getData();
        return successResponse(res,"ok", result);
    } catch (error) {
        next(error);
    }
}

export const getProduct = async (req, res, next) => {
    try {
        let id = req.params.id;
        const [result] = await productRepository.getDataById(id);
        if(result.length > 0) {
            successResponse(res, "Ok", result[0])
        } else {
            errorResponse(res, "data tidak ditemukan", 404);
        }
    } catch (error) {
        next(error);
    }
}

export const createProduct = async (req, res, next) => {
    try {
        const { name, description, price, stock, category_id } = req.body;

        const result = await productRepository.addData(name, description, price, stock, category_id);
        
        if (typeof result === 'string' && result.startsWith("Category ID not found")) {
            return errorResponse(res, 400, result);
        }

        successResponse(res, "Data berhasil ditambahkan", result.insertId);
    } catch (error) {
        next(error);
    }
}

export const updateProduct = async (req, res, next) => {
    try {
        let id = req.params.id;
        let product = req.body;
        const [result] = await productRepository.updateData(id, product);
        if(result.affectedRows > 0) {
            successResponse(res, "berhasil mengubah data", result.affectedRows)
        } else {
            errorResponse(res, "data tidak ditemukan", 404);
        }
    } catch (error) {
        next(error);
    }
}

export const deleteProduct = async (req, res, next) => {
    try {
        let id = req.params.id;
        const [result] = await productRepository.deleteData(id);
        if(result.affectedRows > 0) {
            successResponse(res, "berhasil menghapus data", result.affectedRows)
        } else {
            errorResponse(res, "data tidak ditemukan", 404);
        }
    } catch (error) {
        next(error);
    }
}