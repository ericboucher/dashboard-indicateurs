export const API_CONFIG = {
    BASE_URL: 'https://api.indicateurs.ecologie.gouv.fr/cubejs-api/v1',
    TOKEN: 'lalala.eyJREPLACEME',
    ENDPOINTS: {
        META: '/meta',
        LOAD: '/load',
        SQL: '/sql'
    }
};

export const HEADERS = {
    Authorization: `Bearer ${API_CONFIG.TOKEN}`,
    'Content-Type': 'application/json'
}; 