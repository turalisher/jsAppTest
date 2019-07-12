const API_URL = `https://mgrinko.github.io/js-20190426/api`

export const getAll = () => {
    return fetch(`${API_URL}/phones.json`)
        .then((res) => res.json());
};

export const getById = (phoneId) => {
    return fetch(`${API_URL}/phones/${phoneId}.json`)
        .then(res => res.json());
};