export declare class Serializer {
    readonly modelMappers: {
        [key: string]: any;
    };
    readonly isXML?: boolean | undefined;
    constructor(modelMappers?: {
        [key: string]: any;
    }, isXML?: boolean | undefined);
    validateConstraints(mapper: Mapper, value: any, objectName: string): void;
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
    serialize(mapper: Mapper, object: any, objectName?: string): any;
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
    deserialize(mapper: Mapper, responseBody: any, objectName: string): any;
}
export interface MapperConstraints {
    InclusiveMaximum?: number;
    ExclusiveMaximum?: number;
    InclusiveMinimum?: number;
    ExclusiveMinimum?: number;
    MaxLength?: number;
    MinLength?: number;
    Pattern?: RegExp;
    MaxItems?: number;
    MinItems?: number;
    UniqueItems?: true;
    MultipleOf?: number;
}
export declare type MapperType = SimpleMapperType | CompositeMapperType | SequenceMapperType | DictionaryMapperType | EnumMapperType;
export interface SimpleMapperType {
    name: "Base64Url" | "Boolean" | "ByteArray" | "Date" | "DateTime" | "DateTimeRfc1123" | "Object" | "Stream" | "String" | "TimeSpan" | "UnixTime" | "Uuid" | "Number" | "any";
}
export interface CompositeMapperType {
    name: "Composite";
    className?: string;
    modelProperties?: {
        [propertyName: string]: Mapper;
    };
    additionalProperties?: Mapper;
    uberParent?: string;
    polymorphicDiscriminator?: PolymorphicDiscriminator;
}
export interface SequenceMapperType {
    name: "Sequence";
    element: Mapper;
}
export interface DictionaryMapperType {
    name: "Dictionary";
    value: Mapper;
}
export interface EnumMapperType {
    name: "Enum";
    allowedValues: any[];
}
export interface BaseMapper {
    xmlName?: string;
    xmlIsAttribute?: boolean;
    xmlElementName?: string;
    xmlIsWrapped?: boolean;
    readOnly?: boolean;
    isConstant?: boolean;
    required?: boolean;
    nullable?: boolean;
    serializedName?: string;
    type: MapperType;
    defaultValue?: any;
    constraints?: MapperConstraints;
}
export declare type Mapper = BaseMapper | CompositeMapper | SequenceMapper | DictionaryMapper | EnumMapper;
export interface PolymorphicDiscriminator {
    serializedName: string;
    clientName: string;
    [key: string]: string;
}
export interface CompositeMapper extends BaseMapper {
    type: CompositeMapperType;
}
export interface SequenceMapper extends BaseMapper {
    type: SequenceMapperType;
}
export interface DictionaryMapper extends BaseMapper {
    type: DictionaryMapperType;
    headerCollectionPrefix?: string;
}
export interface EnumMapper extends BaseMapper {
    type: EnumMapperType;
}
export interface UrlParameterValue {
    value: string;
    skipUrlEncoding: boolean;
}
export declare function serializeObject(toSerialize: any): any;
export declare const MapperType: {
    Base64Url: "Base64Url";
    Boolean: "Boolean";
    ByteArray: "ByteArray";
    Date: "Date";
    DateTime: "DateTime";
    DateTimeRfc1123: "DateTimeRfc1123";
    Object: "Object";
    Stream: "Stream";
    String: "String";
    TimeSpan: "TimeSpan";
    UnixTime: "UnixTime";
    Number: "Number";
    Composite: "Composite";
    Sequence: "Sequence";
    Dictionary: "Dictionary";
    Enum: "Enum";
};
//# sourceMappingURL=serializer.d.ts.map