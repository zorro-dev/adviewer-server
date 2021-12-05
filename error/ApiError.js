class ApiError extends Error {

    constructor(status, errorCode, message) {
        super();
        this.status = status
        this.errorCode = errorCode
        this.message = message
    }

    static UNEXPECTED_ERROR(err) {
        return ApiError.sendErrorCode(1000, 'Непредвиденная ошибка [' + err + ']')
    }

    static REQUIRED_FIELD_EMPTY(fieldName) {
        return ApiError.sendErrorCode(1001, 'Не передано обязательное поле [' + fieldName + ']')
    }

    static REQUIRED_OBJECT_NOT_FOUND(objectName) {
        return ApiError.sendErrorCode(1002, 'Не был найден объект [' + objectName + ']')
    }

    static sendErrorCode(errorCode, message) {
        return new ApiError(500, errorCode, message)
    }

    static badRequest(message) {
        return new ApiError(404, message)
    }

    static internal(message) {
        return new ApiError(500, message)
    }

    static forbidden(message) {
        return new ApiError(403, message)
    }

}

module.exports = ApiError