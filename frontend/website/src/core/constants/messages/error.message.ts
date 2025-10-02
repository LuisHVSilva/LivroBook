export const errorMessage = {
    serviceError: {
        internalServerError: 'serviceError.internalServerError',
    },
    conflictError: {
        generic: 'conflictError.generic',
    },
    notFoundError: {
        userTokenValue: 'notFoundError.userTokenValue',
        userData: 'notFoundError.userData',
    },
    validationError: {
        invalidDatas: 'validationError.invalidDatas',
    },
    nullFieldError: {
        required: "nullFieldError.required",
    },
    appError: {
        api: {
            get: 'appError.api.get',
        },
        auth: {
            loginError: 'appError.auth.loginError',
            sessionExpired: 'appError.auth.sessionExpired',
            unauthorizedUser: 'appError.auth.unauthorizedUser',
        }
    },
};


//const msg = errorMessages.validation.nullFieldRequired('email');