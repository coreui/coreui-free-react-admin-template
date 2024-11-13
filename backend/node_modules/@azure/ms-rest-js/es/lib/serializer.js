// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
import * as base64 from "./util/base64";
import * as utils from "./util/utils";
var Serializer = /** @class */ (function () {
    function Serializer(modelMappers, isXML) {
        if (modelMappers === void 0) { modelMappers = {}; }
        this.modelMappers = modelMappers;
        this.isXML = isXML;
    }
    Serializer.prototype.validateConstraints = function (mapper, value, objectName) {
        var failValidation = function (constraintName, constraintValue) {
            throw new Error("\"" + objectName + "\" with value \"" + value + "\" should satisfy the constraint \"" + constraintName + "\": " + constraintValue + ".");
        };
        if (mapper.constraints && value != undefined) {
            var _a = mapper.constraints, ExclusiveMaximum = _a.ExclusiveMaximum, ExclusiveMinimum = _a.ExclusiveMinimum, InclusiveMaximum = _a.InclusiveMaximum, InclusiveMinimum = _a.InclusiveMinimum, MaxItems = _a.MaxItems, MaxLength = _a.MaxLength, MinItems = _a.MinItems, MinLength = _a.MinLength, MultipleOf = _a.MultipleOf, Pattern = _a.Pattern, UniqueItems = _a.UniqueItems;
            if (ExclusiveMaximum != undefined && value >= ExclusiveMaximum) {
                failValidation("ExclusiveMaximum", ExclusiveMaximum);
            }
            if (ExclusiveMinimum != undefined && value <= ExclusiveMinimum) {
                failValidation("ExclusiveMinimum", ExclusiveMinimum);
            }
            if (InclusiveMaximum != undefined && value > InclusiveMaximum) {
                failValidation("InclusiveMaximum", InclusiveMaximum);
            }
            if (InclusiveMinimum != undefined && value < InclusiveMinimum) {
                failValidation("InclusiveMinimum", InclusiveMinimum);
            }
            if (MaxItems != undefined && value.length > MaxItems) {
                failValidation("MaxItems", MaxItems);
            }
            if (MaxLength != undefined && value.length > MaxLength) {
                failValidation("MaxLength", MaxLength);
            }
            if (MinItems != undefined && value.length < MinItems) {
                failValidation("MinItems", MinItems);
            }
            if (MinLength != undefined && value.length < MinLength) {
                failValidation("MinLength", MinLength);
            }
            if (MultipleOf != undefined && value % MultipleOf !== 0) {
                failValidation("MultipleOf", MultipleOf);
            }
            if (Pattern) {
                var pattern = typeof Pattern === "string" ? new RegExp(Pattern) : Pattern;
                if (typeof value !== "string" || value.match(pattern) === null) {
                    failValidation("Pattern", Pattern);
                }
            }
            if (UniqueItems &&
                value.some(function (item, i, ar) { return ar.indexOf(item) !== i; })) {
                failValidation("UniqueItems", UniqueItems);
            }
        }
    };
    /**
     * Serialize the given object based on its metadata defined in the mapper
     *
     * @param {Mapper} mapper The mapper which defines the metadata of the serializable object
     *
     * @param {object|string|Array|number|boolean|Date|stream} object A valid Javascript object to be serialized
     *
     * @param {string} objectName Name of the serialized object
     *
     * @returns {object|string|Array|number|boolean|Date|stream} A valid serialized Javascript object
     */
    Serializer.prototype.serialize = function (mapper, object, objectName) {
        var payload = {};
        var mapperType = mapper.type.name;
        if (!objectName) {
            objectName = mapper.serializedName;
        }
        if (mapperType.match(/^Sequence$/gi) !== null) {
            payload = [];
        }
        if (mapper.isConstant) {
            object = mapper.defaultValue;
        }
        // This table of allowed values should help explain
        // the mapper.required and mapper.nullable properties.
        // X means "neither undefined or null are allowed".
        //           || required
        //           || true      | false
        //  nullable || ==========================
        //      true || null      | undefined/null
        //     false || X         | undefined
        // undefined || X         | undefined/null
        var required = mapper.required, nullable = mapper.nullable;
        if (required && nullable && object === undefined) {
            throw new Error(objectName + " cannot be undefined.");
        }
        if (required && !nullable && object == undefined) {
            throw new Error(objectName + " cannot be null or undefined.");
        }
        if (!required && nullable === false && object === null) {
            throw new Error(objectName + " cannot be null.");
        }
        if (object == undefined) {
            payload = object;
        }
        else {
            // Validate Constraints if any
            this.validateConstraints(mapper, object, objectName);
            if (mapperType.match(/^any$/gi) !== null) {
                payload = object;
            }
            else if (mapperType.match(/^(Number|String|Boolean|Object|Stream|Uuid)$/gi) !== null) {
                payload = serializeBasicTypes(mapperType, objectName, object);
            }
            else if (mapperType.match(/^Enum$/gi) !== null) {
                var enumMapper = mapper;
                payload = serializeEnumType(objectName, enumMapper.type.allowedValues, object);
            }
            else if (mapperType.match(/^(Date|DateTime|TimeSpan|DateTimeRfc1123|UnixTime)$/gi) !== null) {
                payload = serializeDateTypes(mapperType, object, objectName);
            }
            else if (mapperType.match(/^ByteArray$/gi) !== null) {
                payload = serializeByteArrayType(objectName, object);
            }
            else if (mapperType.match(/^Base64Url$/gi) !== null) {
                payload = serializeBase64UrlType(objectName, object);
            }
            else if (mapperType.match(/^Sequence$/gi) !== null) {
                payload = serializeSequenceType(this, mapper, object, objectName);
            }
            else if (mapperType.match(/^Dictionary$/gi) !== null) {
                payload = serializeDictionaryType(this, mapper, object, objectName);
            }
            else if (mapperType.match(/^Composite$/gi) !== null) {
                payload = serializeCompositeType(this, mapper, object, objectName);
            }
        }
        return payload;
    };
    /**
     * Deserialize the given object based on its metadata defined in the mapper
     *
     * @param {object} mapper The mapper which defines the metadata of the serializable object
     *
     * @param {object|string|Array|number|boolean|Date|stream} responseBody A valid Javascript entity to be deserialized
     *
     * @param {string} objectName Name of the deserialized object
     *
     * @returns {object|string|Array|number|boolean|Date|stream} A valid deserialized Javascript object
     */
    Serializer.prototype.deserialize = function (mapper, responseBody, objectName) {
        if (responseBody == undefined) {
            if (this.isXML && mapper.type.name === "Sequence" && !mapper.xmlIsWrapped) {
                // Edge case for empty XML non-wrapped lists. xml2js can't distinguish
                // between the list being empty versus being missing,
                // so let's do the more user-friendly thing and return an empty list.
                responseBody = [];
            }
            // specifically check for undefined as default value can be a falsey value `0, "", false, null`
            if (mapper.defaultValue !== undefined) {
                responseBody = mapper.defaultValue;
            }
            return responseBody;
        }
        var payload;
        var mapperType = mapper.type.name;
        if (!objectName) {
            objectName = mapper.serializedName;
        }
        if (mapperType.match(/^Composite$/gi) !== null) {
            payload = deserializeCompositeType(this, mapper, responseBody, objectName);
        }
        else {
            if (this.isXML) {
                /**
                 * If the mapper specifies this as a non-composite type value but the responseBody contains
                 * both header ("$") and body ("_") properties, then just reduce the responseBody value to
                 * the body ("_") property.
                 */
                if (responseBody["$"] != undefined && responseBody["_"] != undefined) {
                    responseBody = responseBody["_"];
                }
            }
            if (mapperType.match(/^Number$/gi) !== null) {
                payload = parseFloat(responseBody);
                if (isNaN(payload)) {
                    payload = responseBody;
                }
            }
            else if (mapperType.match(/^Boolean$/gi) !== null) {
                if (responseBody === "true") {
                    payload = true;
                }
                else if (responseBody === "false") {
                    payload = false;
                }
                else {
                    payload = responseBody;
                }
            }
            else if (mapperType.match(/^(String|Enum|Object|Stream|Uuid|TimeSpan|any)$/gi) !== null) {
                payload = responseBody;
            }
            else if (mapperType.match(/^(Date|DateTime|DateTimeRfc1123)$/gi) !== null) {
                payload = new Date(responseBody);
            }
            else if (mapperType.match(/^UnixTime$/gi) !== null) {
                payload = unixTimeToDate(responseBody);
            }
            else if (mapperType.match(/^ByteArray$/gi) !== null) {
                payload = base64.decodeString(responseBody);
            }
            else if (mapperType.match(/^Base64Url$/gi) !== null) {
                payload = base64UrlToByteArray(responseBody);
            }
            else if (mapperType.match(/^Sequence$/gi) !== null) {
                payload = deserializeSequenceType(this, mapper, responseBody, objectName);
            }
            else if (mapperType.match(/^Dictionary$/gi) !== null) {
                payload = deserializeDictionaryType(this, mapper, responseBody, objectName);
            }
        }
        if (mapper.isConstant) {
            payload = mapper.defaultValue;
        }
        return payload;
    };
    return Serializer;
}());
export { Serializer };
function trimEnd(str, ch) {
    var len = str.length;
    while (len - 1 >= 0 && str[len - 1] === ch) {
        --len;
    }
    return str.substr(0, len);
}
function bufferToBase64Url(buffer) {
    if (!buffer) {
        return undefined;
    }
    if (!(buffer instanceof Uint8Array)) {
        throw new Error("Please provide an input of type Uint8Array for converting to Base64Url.");
    }
    // Uint8Array to Base64.
    var str = base64.encodeByteArray(buffer);
    // Base64 to Base64Url.
    return trimEnd(str, "=").replace(/\+/g, "-").replace(/\//g, "_");
}
function base64UrlToByteArray(str) {
    if (!str) {
        return undefined;
    }
    if (str && typeof str.valueOf() !== "string") {
        throw new Error("Please provide an input of type string for converting to Uint8Array");
    }
    // Base64Url to Base64.
    str = str.replace(/\-/g, "+").replace(/\_/g, "/");
    // Base64 to Uint8Array.
    return base64.decodeString(str);
}
function splitSerializeName(prop) {
    var classes = [];
    var partialclass = "";
    if (prop) {
        var subwords = prop.split(".");
        for (var _i = 0, subwords_1 = subwords; _i < subwords_1.length; _i++) {
            var item = subwords_1[_i];
            if (item.charAt(item.length - 1) === "\\") {
                partialclass += item.substr(0, item.length - 1) + ".";
            }
            else {
                partialclass += item;
                classes.push(partialclass);
                partialclass = "";
            }
        }
    }
    return classes;
}
function dateToUnixTime(d) {
    if (!d) {
        return undefined;
    }
    if (typeof d.valueOf() === "string") {
        d = new Date(d);
    }
    return Math.floor(d.getTime() / 1000);
}
function unixTimeToDate(n) {
    if (!n) {
        return undefined;
    }
    return new Date(n * 1000);
}
function serializeBasicTypes(typeName, objectName, value) {
    if (value !== null && value !== undefined) {
        if (typeName.match(/^Number$/gi) !== null) {
            if (typeof value !== "number") {
                throw new Error(objectName + " with value " + value + " must be of type number.");
            }
        }
        else if (typeName.match(/^String$/gi) !== null) {
            if (typeof value.valueOf() !== "string") {
                throw new Error(objectName + " with value \"" + value + "\" must be of type string.");
            }
        }
        else if (typeName.match(/^Uuid$/gi) !== null) {
            if (!(typeof value.valueOf() === "string" && utils.isValidUuid(value))) {
                throw new Error(objectName + " with value \"" + value + "\" must be of type string and a valid uuid.");
            }
        }
        else if (typeName.match(/^Boolean$/gi) !== null) {
            if (typeof value !== "boolean") {
                throw new Error(objectName + " with value " + value + " must be of type boolean.");
            }
        }
        else if (typeName.match(/^Stream$/gi) !== null) {
            var objectType = typeof value;
            if (objectType !== "string" &&
                objectType !== "function" &&
                !(value instanceof ArrayBuffer) &&
                !ArrayBuffer.isView(value) &&
                !(typeof Blob === "function" && value instanceof Blob)) {
                throw new Error(objectName + " must be a string, Blob, ArrayBuffer, ArrayBufferView, or a function returning NodeJS.ReadableStream.");
            }
        }
    }
    return value;
}
function serializeEnumType(objectName, allowedValues, value) {
    if (!allowedValues) {
        throw new Error("Please provide a set of allowedValues to validate " + objectName + " as an Enum Type.");
    }
    var isPresent = allowedValues.some(function (item) {
        if (typeof item.valueOf() === "string") {
            return item.toLowerCase() === value.toLowerCase();
        }
        return item === value;
    });
    if (!isPresent) {
        throw new Error(value + " is not a valid value for " + objectName + ". The valid values are: " + JSON.stringify(allowedValues) + ".");
    }
    return value;
}
function serializeByteArrayType(objectName, value) {
    if (value != undefined) {
        if (!(value instanceof Uint8Array)) {
            throw new Error(objectName + " must be of type Uint8Array.");
        }
        value = base64.encodeByteArray(value);
    }
    return value;
}
function serializeBase64UrlType(objectName, value) {
    if (value != undefined) {
        if (!(value instanceof Uint8Array)) {
            throw new Error(objectName + " must be of type Uint8Array.");
        }
        value = bufferToBase64Url(value);
    }
    return value;
}
function serializeDateTypes(typeName, value, objectName) {
    if (value != undefined) {
        if (typeName.match(/^Date$/gi) !== null) {
            if (!(value instanceof Date ||
                (typeof value.valueOf() === "string" && !isNaN(Date.parse(value))))) {
                throw new Error(objectName + " must be an instanceof Date or a string in ISO8601 format.");
            }
            value =
                value instanceof Date
                    ? value.toISOString().substring(0, 10)
                    : new Date(value).toISOString().substring(0, 10);
        }
        else if (typeName.match(/^DateTime$/gi) !== null) {
            if (!(value instanceof Date ||
                (typeof value.valueOf() === "string" && !isNaN(Date.parse(value))))) {
                throw new Error(objectName + " must be an instanceof Date or a string in ISO8601 format.");
            }
            value = value instanceof Date ? value.toISOString() : new Date(value).toISOString();
        }
        else if (typeName.match(/^DateTimeRfc1123$/gi) !== null) {
            if (!(value instanceof Date ||
                (typeof value.valueOf() === "string" && !isNaN(Date.parse(value))))) {
                throw new Error(objectName + " must be an instanceof Date or a string in RFC-1123 format.");
            }
            value = value instanceof Date ? value.toUTCString() : new Date(value).toUTCString();
        }
        else if (typeName.match(/^UnixTime$/gi) !== null) {
            if (!(value instanceof Date ||
                (typeof value.valueOf() === "string" && !isNaN(Date.parse(value))))) {
                throw new Error(objectName + " must be an instanceof Date or a string in RFC-1123/ISO8601 format " +
                    "for it to be serialized in UnixTime/Epoch format.");
            }
            value = dateToUnixTime(value);
        }
        else if (typeName.match(/^TimeSpan$/gi) !== null) {
            if (!utils.isDuration(value)) {
                throw new Error(objectName + " must be a string in ISO 8601 format. Instead was \"" + value + "\".");
            }
            value = value;
        }
    }
    return value;
}
function serializeSequenceType(serializer, mapper, object, objectName) {
    if (!Array.isArray(object)) {
        throw new Error(objectName + " must be of type Array.");
    }
    var elementType = mapper.type.element;
    if (!elementType || typeof elementType !== "object") {
        throw new Error("element\" metadata for an Array must be defined in the " +
            ("mapper and it must of type \"object\" in " + objectName + "."));
    }
    var tempArray = [];
    for (var i = 0; i < object.length; i++) {
        tempArray[i] = serializer.serialize(elementType, object[i], objectName);
    }
    return tempArray;
}
function serializeDictionaryType(serializer, mapper, object, objectName) {
    if (typeof object !== "object") {
        throw new Error(objectName + " must be of type object.");
    }
    var valueType = mapper.type.value;
    if (!valueType || typeof valueType !== "object") {
        throw new Error("\"value\" metadata for a Dictionary must be defined in the " +
            ("mapper and it must of type \"object\" in " + objectName + "."));
    }
    var tempDictionary = {};
    for (var _i = 0, _a = Object.keys(object); _i < _a.length; _i++) {
        var key = _a[_i];
        tempDictionary[key] = serializer.serialize(valueType, object[key], objectName + "." + key);
    }
    return tempDictionary;
}
/**
 * Resolves a composite mapper's modelProperties.
 * @param serializer the serializer containing the entire set of mappers
 * @param mapper the composite mapper to resolve
 */
function resolveModelProperties(serializer, mapper, objectName) {
    var modelProps = mapper.type.modelProperties;
    if (!modelProps) {
        var className = mapper.type.className;
        if (!className) {
            throw new Error("Class name for model \"" + objectName + "\" is not provided in the mapper \"" + JSON.stringify(mapper, undefined, 2) + "\".");
        }
        var modelMapper = serializer.modelMappers[className];
        if (!modelMapper) {
            throw new Error("mapper() cannot be null or undefined for model \"" + className + "\".");
        }
        modelProps = modelMapper.type.modelProperties;
        if (!modelProps) {
            throw new Error("modelProperties cannot be null or undefined in the " +
                ("mapper \"" + JSON.stringify(modelMapper) + "\" of type \"" + className + "\" for object \"" + objectName + "\"."));
        }
    }
    return modelProps;
}
function serializeCompositeType(serializer, mapper, object, objectName) {
    var _a;
    if (getPolymorphicDiscriminatorRecursively(serializer, mapper)) {
        mapper = getPolymorphicMapper(serializer, mapper, object, "clientName");
    }
    if (object != undefined) {
        var payload = {};
        var modelProps = resolveModelProperties(serializer, mapper, objectName);
        for (var _i = 0, _b = Object.keys(modelProps); _i < _b.length; _i++) {
            var key = _b[_i];
            var propertyMapper = modelProps[key];
            if (propertyMapper.readOnly) {
                continue;
            }
            var propName = void 0;
            var parentObject = payload;
            if (serializer.isXML) {
                if (propertyMapper.xmlIsWrapped) {
                    propName = propertyMapper.xmlName;
                }
                else {
                    propName = propertyMapper.xmlElementName || propertyMapper.xmlName;
                }
            }
            else {
                var paths = splitSerializeName(propertyMapper.serializedName);
                propName = paths.pop();
                for (var _c = 0, paths_1 = paths; _c < paths_1.length; _c++) {
                    var pathName = paths_1[_c];
                    var childObject = parentObject[pathName];
                    if (childObject == undefined && object[key] != undefined) {
                        parentObject[pathName] = {};
                    }
                    parentObject = parentObject[pathName];
                }
            }
            if (parentObject != undefined) {
                var propertyObjectName = propertyMapper.serializedName !== ""
                    ? objectName + "." + propertyMapper.serializedName
                    : objectName;
                var toSerialize = object[key];
                var polymorphicDiscriminator = getPolymorphicDiscriminatorRecursively(serializer, mapper);
                if (polymorphicDiscriminator &&
                    polymorphicDiscriminator.clientName === key &&
                    toSerialize == undefined) {
                    toSerialize = mapper.serializedName;
                }
                var serializedValue = serializer.serialize(propertyMapper, toSerialize, propertyObjectName);
                if (serializedValue !== undefined && propName != undefined) {
                    if (propertyMapper.xmlIsAttribute) {
                        // $ is the key attributes are kept under in xml2js.
                        // This keeps things simple while preventing name collision
                        // with names in user documents.
                        parentObject.$ = parentObject.$ || {};
                        parentObject.$[propName] = serializedValue;
                    }
                    else if (propertyMapper.xmlIsWrapped) {
                        parentObject[propName] = (_a = {}, _a[propertyMapper.xmlElementName] = serializedValue, _a);
                    }
                    else {
                        parentObject[propName] = serializedValue;
                    }
                }
            }
        }
        var additionalPropertiesMapper = mapper.type.additionalProperties;
        if (additionalPropertiesMapper) {
            var propNames = Object.keys(modelProps);
            var _loop_1 = function (clientPropName) {
                var isAdditionalProperty = propNames.every(function (pn) { return pn !== clientPropName; });
                if (isAdditionalProperty) {
                    payload[clientPropName] = serializer.serialize(additionalPropertiesMapper, object[clientPropName], objectName + '["' + clientPropName + '"]');
                }
            };
            for (var clientPropName in object) {
                _loop_1(clientPropName);
            }
        }
        return payload;
    }
    return object;
}
function isSpecialXmlProperty(propertyName) {
    return ["$", "_"].includes(propertyName);
}
function deserializeCompositeType(serializer, mapper, responseBody, objectName) {
    if (getPolymorphicDiscriminatorRecursively(serializer, mapper)) {
        mapper = getPolymorphicMapper(serializer, mapper, responseBody, "serializedName");
    }
    var modelProps = resolveModelProperties(serializer, mapper, objectName);
    var instance = {};
    var handledPropertyNames = [];
    for (var _i = 0, _a = Object.keys(modelProps); _i < _a.length; _i++) {
        var key = _a[_i];
        var propertyMapper = modelProps[key];
        var paths = splitSerializeName(modelProps[key].serializedName);
        handledPropertyNames.push(paths[0]);
        var serializedName = propertyMapper.serializedName, xmlName = propertyMapper.xmlName, xmlElementName = propertyMapper.xmlElementName;
        var propertyObjectName = objectName;
        if (serializedName !== "" && serializedName !== undefined) {
            propertyObjectName = objectName + "." + serializedName;
        }
        var headerCollectionPrefix = propertyMapper.headerCollectionPrefix;
        if (headerCollectionPrefix) {
            var dictionary = {};
            for (var _b = 0, _c = Object.keys(responseBody); _b < _c.length; _b++) {
                var headerKey = _c[_b];
                if (headerKey.startsWith(headerCollectionPrefix)) {
                    dictionary[headerKey.substring(headerCollectionPrefix.length)] = serializer.deserialize(propertyMapper.type.value, responseBody[headerKey], propertyObjectName);
                }
                handledPropertyNames.push(headerKey);
            }
            instance[key] = dictionary;
        }
        else if (serializer.isXML) {
            if (propertyMapper.xmlIsAttribute && responseBody.$) {
                instance[key] = serializer.deserialize(propertyMapper, responseBody.$[xmlName], propertyObjectName);
            }
            else {
                var propertyName = xmlElementName || xmlName || serializedName;
                var unwrappedProperty = responseBody[propertyName];
                if (propertyMapper.xmlIsWrapped) {
                    unwrappedProperty = responseBody[xmlName];
                    unwrappedProperty = unwrappedProperty && unwrappedProperty[xmlElementName];
                    var isEmptyWrappedList = unwrappedProperty === undefined;
                    if (isEmptyWrappedList) {
                        unwrappedProperty = [];
                    }
                }
                instance[key] = serializer.deserialize(propertyMapper, unwrappedProperty, propertyObjectName);
            }
        }
        else {
            // deserialize the property if it is present in the provided responseBody instance
            var propertyInstance = void 0;
            var res = responseBody;
            // traversing the object step by step.
            for (var _d = 0, paths_2 = paths; _d < paths_2.length; _d++) {
                var item = paths_2[_d];
                if (!res)
                    break;
                res = res[item];
            }
            propertyInstance = res;
            var polymorphicDiscriminator = mapper.type.polymorphicDiscriminator;
            // checking that the model property name (key)(ex: "fishtype") and the
            // clientName of the polymorphicDiscriminator {metadata} (ex: "fishtype")
            // instead of the serializedName of the polymorphicDiscriminator (ex: "fish.type")
            // is a better approach. The generator is not consistent with escaping '\.' in the
            // serializedName of the property (ex: "fish\.type") that is marked as polymorphic discriminator
            // and the serializedName of the metadata polymorphicDiscriminator (ex: "fish.type"). However,
            // the clientName transformation of the polymorphicDiscriminator (ex: "fishtype") and
            // the transformation of model property name (ex: "fishtype") is done consistently.
            // Hence, it is a safer bet to rely on the clientName of the polymorphicDiscriminator.
            if (polymorphicDiscriminator &&
                key === polymorphicDiscriminator.clientName &&
                propertyInstance == undefined) {
                propertyInstance = mapper.serializedName;
            }
            var serializedValue = void 0;
            // paging
            if (Array.isArray(responseBody[key]) && modelProps[key].serializedName === "") {
                propertyInstance = responseBody[key];
                var arrayInstance = serializer.deserialize(propertyMapper, propertyInstance, propertyObjectName);
                // Copy over any properties that have already been added into the instance, where they do
                // not exist on the newly de-serialized array
                for (var _e = 0, _f = Object.entries(instance); _e < _f.length; _e++) {
                    var _g = _f[_e], key_1 = _g[0], value = _g[1];
                    if (!arrayInstance.hasOwnProperty(key_1)) {
                        arrayInstance[key_1] = value;
                    }
                }
                instance = arrayInstance;
            }
            else if (propertyInstance !== undefined || propertyMapper.defaultValue !== undefined) {
                serializedValue = serializer.deserialize(propertyMapper, propertyInstance, propertyObjectName);
                instance[key] = serializedValue;
            }
        }
    }
    var additionalPropertiesMapper = mapper.type.additionalProperties;
    if (additionalPropertiesMapper) {
        var isAdditionalProperty = function (responsePropName) {
            for (var clientPropName in modelProps) {
                var paths = splitSerializeName(modelProps[clientPropName].serializedName);
                if (paths[0] === responsePropName) {
                    return false;
                }
            }
            return true;
        };
        for (var responsePropName in responseBody) {
            if (isAdditionalProperty(responsePropName)) {
                instance[responsePropName] = serializer.deserialize(additionalPropertiesMapper, responseBody[responsePropName], objectName + '["' + responsePropName + '"]');
            }
        }
    }
    else if (responseBody) {
        for (var _h = 0, _j = Object.keys(responseBody); _h < _j.length; _h++) {
            var key = _j[_h];
            if (instance[key] === undefined &&
                !handledPropertyNames.includes(key) &&
                !isSpecialXmlProperty(key)) {
                instance[key] = responseBody[key];
            }
        }
    }
    return instance;
}
function deserializeDictionaryType(serializer, mapper, responseBody, objectName) {
    /*jshint validthis: true */
    var value = mapper.type.value;
    if (!value || typeof value !== "object") {
        throw new Error("\"value\" metadata for a Dictionary must be defined in the " +
            ("mapper and it must of type \"object\" in " + objectName));
    }
    if (responseBody) {
        var tempDictionary = {};
        for (var _i = 0, _a = Object.keys(responseBody); _i < _a.length; _i++) {
            var key = _a[_i];
            tempDictionary[key] = serializer.deserialize(value, responseBody[key], objectName);
        }
        return tempDictionary;
    }
    return responseBody;
}
function deserializeSequenceType(serializer, mapper, responseBody, objectName) {
    /*jshint validthis: true */
    var element = mapper.type.element;
    if (!element || typeof element !== "object") {
        throw new Error("element\" metadata for an Array must be defined in the " +
            ("mapper and it must of type \"object\" in " + objectName));
    }
    if (responseBody) {
        if (!Array.isArray(responseBody)) {
            // xml2js will interpret a single element array as just the element, so force it to be an array
            responseBody = [responseBody];
        }
        var tempArray = [];
        for (var i = 0; i < responseBody.length; i++) {
            tempArray[i] = serializer.deserialize(element, responseBody[i], objectName + "[" + i + "]");
        }
        return tempArray;
    }
    return responseBody;
}
function getPolymorphicMapper(serializer, mapper, object, polymorphicPropertyName) {
    var polymorphicDiscriminator = getPolymorphicDiscriminatorRecursively(serializer, mapper);
    if (polymorphicDiscriminator) {
        var discriminatorName = polymorphicDiscriminator[polymorphicPropertyName];
        if (discriminatorName != undefined) {
            var discriminatorValue = object[discriminatorName];
            if (discriminatorValue != undefined) {
                var typeName = mapper.type.uberParent || mapper.type.className;
                var indexDiscriminator = discriminatorValue === typeName
                    ? discriminatorValue
                    : typeName + "." + discriminatorValue;
                var polymorphicMapper = serializer.modelMappers.discriminators[indexDiscriminator];
                if (polymorphicMapper) {
                    mapper = polymorphicMapper;
                }
            }
        }
    }
    return mapper;
}
function getPolymorphicDiscriminatorRecursively(serializer, mapper) {
    return (mapper.type.polymorphicDiscriminator ||
        getPolymorphicDiscriminatorSafely(serializer, mapper.type.uberParent) ||
        getPolymorphicDiscriminatorSafely(serializer, mapper.type.className));
}
function getPolymorphicDiscriminatorSafely(serializer, typeName) {
    return (typeName &&
        serializer.modelMappers[typeName] &&
        serializer.modelMappers[typeName].type.polymorphicDiscriminator);
}
// TODO: why is this here?
export function serializeObject(toSerialize) {
    if (toSerialize == undefined)
        return undefined;
    if (toSerialize instanceof Uint8Array) {
        toSerialize = base64.encodeByteArray(toSerialize);
        return toSerialize;
    }
    else if (toSerialize instanceof Date) {
        return toSerialize.toISOString();
    }
    else if (Array.isArray(toSerialize)) {
        var array = [];
        for (var i = 0; i < toSerialize.length; i++) {
            array.push(serializeObject(toSerialize[i]));
        }
        return array;
    }
    else if (typeof toSerialize === "object") {
        var dictionary = {};
        for (var property in toSerialize) {
            dictionary[property] = serializeObject(toSerialize[property]);
        }
        return dictionary;
    }
    return toSerialize;
}
/**
 * Utility function to create a K:V from a list of strings
 */
function strEnum(o) {
    var result = {};
    for (var _i = 0, o_1 = o; _i < o_1.length; _i++) {
        var key = o_1[_i];
        result[key] = key;
    }
    return result;
}
export var MapperType = strEnum([
    "Base64Url",
    "Boolean",
    "ByteArray",
    "Composite",
    "Date",
    "DateTime",
    "DateTimeRfc1123",
    "Dictionary",
    "Enum",
    "Number",
    "Object",
    "Sequence",
    "String",
    "Stream",
    "TimeSpan",
    "UnixTime",
]);
//# sourceMappingURL=serializer.js.map