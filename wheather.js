#!/usr/bin/env node

import {getArgs} from "./helpers/args.js";
import {printHelp, printSuccess, printError, printWeather} from "./services/log.service.js";
import {getKeyValue, saveKeyValue, TOKEN_DICTIONARY} from "./services/storage.service.js";
import {getWeather} from "./services/api.service.js";

const saveToken = async (token) => {
    if (!token.length) {
        printError('Не передан токен')
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token)
        printSuccess('Токен сохранен')
    } catch (e) {
        printError(e.message)
    }
}
const saveCity = async (city) => {
    if (!city.length) {
        printError('Не передан город')
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city)
        printSuccess('Город сохранен')
    } catch (e) {
        printError(e.message)
    }
}

const getForCast = async () => {
    try {
        const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city);
        const weather = await getWeather(city);
        printWeather(weather, '')
    } catch (e) {
        if (e?.response?.status === 404) {
            printError('Неверно указан город')
        } else if (e?.response?.status === 401) {
            printError('Неверно указан токен')
        } else {
            printError(e.message)
        }
    }
}

const initCLI = () => {
    const args = getArgs(process.argv)
    if (args.h) {
        return printHelp()
    }
    if (args.s) {
        return saveCity(args.s)
    }
    if (args.t) {
        return saveToken(args.t)
    }
    return getForCast();
};

initCLI();