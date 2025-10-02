export const authServiceUrl = {
    login: "/auth/login",
    register: "/admin/user/user/create",
}

export const locationServiceUrl = {
    getCountries: "/admin/location/country/findAll",
    getStates: "/admin/location/state/findAll",
    getCities: "/admin/location/city/findAll",
}

export const documentServiceUrl = {
    getDocumentType: "/admin/documentType/findAll",
}

export const phoneServiceUrl = {
    getPhoneType: "/admin/phone/phoneType/findAll",
    getPhoneCode: "/admin/phone/phoneCode/findAll",
}

export const adminServiceUrl = {
    getAllEntitiesNames: "/metadata/getAllEntitiesNames",
    getModelAttributes: "/metadata/getAttribute",
}