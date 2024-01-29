import axios from "axios"
const gg = async (variables) => {

    async function getBasicAuthData(id) {
        const data = await axios.get(`https://test-ebl-api-h7duexlbuq-el.a.run.app/func/Wbo5Eao9l3v6?id=${id}`)
        return data?.data
    }
    let context = { "req": "", "res": { "funcL8upV": { "subscriber": { "id": 2412350053, "first_name": "shivam", "email_address": "shivamkoolwal14@gmail.com", "state": "active", "created_at": "2023-11-17T10:29:02.000Z", "fields": {} } }, "Subscriber_details": { "subscriber": { "id": 2412350053, "first_name": "shivam", "email_address": "shivamkoolwal14@gmail.com", "state": "active", "created_at": "2023-11-17T10:29:02.000Z", "fields": {} } }, "funchpl02": "Request failed with status code 500" }, "vals": { "sdfghj": "652a8de5ea0e8e001f30bebc" }, "authData": {}, "inputData": { "List_Subscribers": 2412350053, "teamId": "${context?.vals?.sdfghj}﻿", "content": "sdfghjkl" } }

    async function plugin() {
        try {

            let authData = await getBasicAuthData("basicMRpLsZX");

            context = { ...context, ['authData']: authData };
            context = { ...context, ['inputData']: { "content": `sdfghjkl`, "teamId": `${context?.vals?.sdfghj}` } };
            // test api url
            const testApiUrl = `https://api.intospace.io/chat/message?authKey=${context.authData.authKey}`
            const response = await axios.post(testApiUrl, {
                content: context.inputData.content,
                teamId: context.inputData.teamId
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response.data, 111);
            return response.data
        } catch (error) {
            console.log("some error occur in plugin Plug", error)
            return error?.message;
        }
    }

    return plugin()
};
gg()