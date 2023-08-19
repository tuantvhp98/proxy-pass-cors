const axios = require("axios");
const HOST = process.env.HOST_REVERSED;
const headersDefault = {
    Accept: "*/*",
    "Accept-Language": "en-US,en;q=0.9",
    Connection: "keep-alive",
    Origin: process.env.ORIGIN,
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1823.82",
    "content-type": "application/json",
    "sec-ch-ua":
        '"Not.A/Brand";v="8", "Chromium";v="114", "Microsoft Edge";v="114"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
};

const getData = async (pathString, req) => {
    try {
        return new Promise(async (resolve, reject) => {
            try {
                const abortController = new AbortController();
                const id = setTimeout(() => {
                    abortController.abort();
                    reject({
                        error: "Timeout!",
                    });
                }, 10000);
                const pathAndQueryString = pathString.split("?");
                const path = pathAndQueryString[0];
                const queryParams = pathAndQueryString[1]?.split("&");
                const queryStringList = [];
                queryParams?.map((e) => {
                    const queryParamValue = e?.split("=");
                    if (queryParamValue[1]) {
                        const queryTemp = `${
                            queryParamValue[0]
                        }=${encodeURIComponent(queryParamValue[1])}`;
                        queryStringList.push(queryTemp);
                    } else {
                        queryStringList.push(queryParamValue);
                    }
                });
                let paramOther = "";
                Object.keys(req.query || {}).map((key) => {
                    if (key && key !== "path")
                        paramOther += `&${key}=${req.query[key]}`;
                });
                const url = `${HOST}${path}?${queryStringList}${paramOther}`;
                console.log("url request GET", url);
                const data = await axios.get(url, {
                    signal: abortController.signal,
                    headers: {
                        ...headersDefault,
                        Authorization: req.headers.authorization,
                    },
                });
                clearTimeout(id);
                if (data.data) {
                    resolve(data.data);
                } else {
                    reject(new Error());
                }
            } catch (error) {
                console.log(error);
                console.log("error", error?.response?.data);
                if (error.response?.data) {
                    reject(error.response.data);
                } else {
                    reject({});
                }
            }
        });
    } catch (error) {
        console.log("error", error?.messsage);
    }
};

const postData = async (path, headers, body) => {
    try {
        return new Promise(async (resolve, reject) => {
            try {
                const abortController = new AbortController();
                const id = setTimeout(() => {
                    abortController.abort();
                    reject({
                        error: "Timeout!",
                    });
                }, 20000);
                const url = `${HOST}${path}`;
                console.log("url request POST", url);
                const data = await axios.post(url, body, {
                    signal: abortController.signal,
                    headers: {
                        ...headersDefault,
                        authorization: headers.authorization,
                    },
                });
                clearTimeout(id);
                if (data.data) {
                    resolve(data.data);
                } else {
                    reject({});
                }
            } catch (error) {
                console.log("error", error?.response?.data);
                if (error?.response?.data) {
                    reject(error?.response?.data);
                } else {
                    reject({});
                }
            }
        });
    } catch (error) {
        console.log("error");
    }
};

const putData = async (path, headers, body) => {
    try {
        return new Promise(async (resolve, reject) => {
            try {
                const abortController = new AbortController();
                const id = setTimeout(() => {
                    abortController.abort();
                    console.log(1111111111);
                    reject({
                        error: "Timeout!",
                    });
                }, 20000);
                const url = `${HOST}${path}`;
                console.log("url request POST", url);
                const data = await axios.put(url, body, {
                    signal: abortController.signal,
                    headers: {
                        ...headersDefault,
                        authorization: headers.authorization,
                    },
                });
                console.log(data);
                clearTimeout(id);
                if (data.data) {
                    resolve(data.data);
                } else {
                    reject(new Error());
                }
            } catch (error) {
                console.log("error", error?.response?.data);
                if (error?.response?.data) {
                    reject(error?.response?.data);
                } else {
                    reject({});
                }
            }
        });
    } catch (error) {
        console.log("error");
    }
};

module.exports = {
    getData,
    postData,
    putData,
};
