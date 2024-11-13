// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
import * as xml2js from "xml2js";
export function stringifyXML(obj, opts) {
    var builder = new xml2js.Builder({
        rootName: (opts || {}).rootName,
        renderOpts: {
            pretty: false,
        },
    });
    return builder.buildObject(obj);
}
export function parseXML(str) {
    var xmlParser = new xml2js.Parser({
        explicitArray: false,
        explicitCharkey: false,
        explicitRoot: false,
    });
    return new Promise(function (resolve, reject) {
        if (!str) {
            reject(new Error("Document is empty"));
        }
        else {
            xmlParser.parseString(str, function (err, res) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res);
                }
            });
        }
    });
}
//# sourceMappingURL=xml.js.map