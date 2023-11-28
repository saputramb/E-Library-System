import client from "@/core/http-base/api-base";

const request = async ({ method, url, params, cancelToken, data }) => {
    try {
        const response = await client.request({
            timeout: 10000,
            method,
            url,
            params,
            cancelToken,
            data,
        });

        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const GET = async ({
    url,
    params,
    cancelToken,
    data
}) => {
    return request({
        method: 'GET',
        url,
        params,
        cancelToken,
        data,
    });
}

export const POST = async ({
    url,
    params,
    cancelToken,
    data
}) => {
    return request({
        method: 'POST',
        url,
        params,
        cancelToken,
        data,
    });
}

export const DELETE = async ({
    url,
    params,
    cancelToken,
    data
}) => {
    return request({
        method: 'DELETE',
        url,
        params,
        cancelToken,
        data,
    });
}