// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
/**
 * Get the path to this parameter's value as a dotted string (a.b.c).
 * @param parameter The parameter to get the path string for.
 * @returns The path to this parameter's value as a dotted string.
 */
export function getPathStringFromParameter(parameter) {
    return getPathStringFromParameterPath(parameter.parameterPath, parameter.mapper);
}
export function getPathStringFromParameterPath(parameterPath, mapper) {
    var result;
    if (typeof parameterPath === "string") {
        result = parameterPath;
    }
    else if (Array.isArray(parameterPath)) {
        result = parameterPath.join(".");
    }
    else {
        result = mapper.serializedName;
    }
    return result;
}
//# sourceMappingURL=operationParameter.js.map