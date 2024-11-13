// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
import { MapperType } from "./serializer";
export function isStreamOperation(operationSpec) {
    var result = false;
    for (var statusCode in operationSpec.responses) {
        var operationResponse = operationSpec.responses[statusCode];
        if (operationResponse.bodyMapper &&
            operationResponse.bodyMapper.type.name === MapperType.Stream) {
            result = true;
            break;
        }
    }
    return result;
}
//# sourceMappingURL=operationSpec.js.map