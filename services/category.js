import * as categoryRepository from '../repository/category.js';
import {successResponse, errorResponse} from '../utils/response.js';

export const getAllCategories = async (req, res, next) => {
    try {
        const [result] = await categoryRepository.getData();
        successResponse(res, "Ok",result)
    } catch (error) {
        next(error)
    }
}

export const getCategoryById = async (req, res, next) => {
    try {
        let id = req.params.id;

        const [result] = await categoryRepository.getDataById(id);
        if(result.length > 0) {
            successResponse(res, "Ok", result[0])
        } else {
            errorResponse(res, "data tidak ditemukan", 404);
        }
    } catch (error) {
        next(error)
    }
}

export const getCategoryByName = async (req, res, next) => {
    try {
        let name = req.params.name;

        const [result] = await categoryRepository.getDataByName(name);
        if(result.length > 0) {
            successResponse(res, "Ok", result[0])
        } else {
            errorResponse(res, "data tidak ditemukan", 404);
        }
    } catch (error) {
        next(error)
    }
}

export const createCategories = async (req, res, next) => {
    try {
        let name = req.body.name;

        const [result] = await categoryRepository.addData(name);
        successResponse(res, "berhasil menambahkan data", result.insertId)
            
    } catch(error) {
        next(error);
    }
}

export const updateCategories = async (req, res, next) => {
    try {
        let id = req.params.id;
        let name = req.body.name;

        const [result] = await categoryRepository.updateData(name, id);
        if(result.affectedRows > 0) {
            successResponse(res, "berhasil mengubah data", result.affectedRows)
        } else {
            errorResponse(res, "data tidak ditemukan", 404);
        }
    } catch(error) {
        next(error);
    }
}

export const deleteCategories = async (req, res, next) => {
    try {
        let id = req.params.id;

        const [result] = await categoryRepository.deleteData(id);
        if(result.affectedRows > 0) {
            successResponse(res, "berhasil menghapus data", result.affectedRows)
        } else {
            errorResponse(res, "data tidak ditemukan", 404);
        }
    } catch(error) {
        next(error);
    }
}
