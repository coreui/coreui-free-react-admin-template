// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
/**
 * The format that will be used to join an array of values together for a query parameter value.
 */
export var QueryCollectionFormat;
(function (QueryCollectionFormat) {
    QueryCollectionFormat["Csv"] = ",";
    QueryCollectionFormat["Ssv"] = " ";
    QueryCollectionFormat["Tsv"] = "\t";
    QueryCollectionFormat["Pipes"] = "|";
    QueryCollectionFormat["Multi"] = "Multi";
})(QueryCollectionFormat || (QueryCollectionFormat = {}));
//# sourceMappingURL=queryCollectionFormat.js.map