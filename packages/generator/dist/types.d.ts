import { CodeBlockWriter, StatementStructures, WriterFunction } from 'ts-morph';
import { ExtendedDMMF, ExtendedDMMFSchemaArgInputType, ZodValidatorOptions } from './classes';
export type StatementsArray = Statement[];
export type Statement = string | WriterFunction | StatementStructures;
export type GetStatements = (datamodel: ExtendedDMMF) => Statement[];
export interface ScalarValidatorFunctionOptions {
    key: string;
    pattern: string;
}
export type ValidatorFunction = (options: ScalarValidatorFunctionOptions) => string;
export type ValidatorFunctionMap = KeyValueMap<ZodValidatorType, ValidatorFunction>;
export type KeyValueMap<TKey extends string, TValue> = {
    [key in TKey]: TValue;
};
export type ZodValidatorTypeMap = KeyValueMap<ZodValidatorType, PrismaScalarType[]>;
export type PrismaScalarTypeMap<T> = KeyValueMap<PrismaScalarType, T>;
export type ZodPrimitiveType = 'string' | 'number' | 'bigint' | 'boolean' | 'date' | 'symbol' | 'undefined' | 'null' | 'void' | 'unknown' | 'never' | 'any';
export type ZodValidatorType = Extract<ZodPrimitiveType, 'string' | 'number' | 'date'> | 'custom';
export type ZodScalarType = Extract<ZodPrimitiveType, 'string' | 'number' | 'date' | 'boolean' | 'bigint' | 'unknown'>;
export type PrismaScalarType = 'String' | 'Boolean' | 'Int' | 'BigInt' | 'Float' | 'Decimal' | 'DateTime' | 'Json' | 'Bytes';
export type ZodPrismaScalarType = Exclude<PrismaScalarType, 'Json' | 'Bytes' | 'Decimal'>;
export type ZodBasicValidatorKeys = 'refine' | 'transform' | 'superRefine';
export type ZodStringValidatorKeys = 'min' | 'max' | 'length' | 'email' | 'url' | 'uuid' | 'cuid' | 'regex' | 'startsWith' | 'endsWith' | 'trim' | 'datetime';
export type ZodNumberValidatorKeys = 'gt' | 'gte' | 'lt' | 'lte' | 'int' | 'positive' | 'nonpositive' | 'negative' | 'nonnegative' | 'multipleOf' | 'finite';
export type ZodDateValidatorKeys = 'min' | 'max';
export type ZodCustomValidatorKeys = 'use';
export type WriteBaseFilterTypesFunction = (options?: {
    nullable?: boolean;
    aggregates?: boolean;
}) => (writer: CodeBlockWriter) => void;
export type PrismaAction = 'findUnique' | 'findMany' | 'findFirst' | 'createOne' | 'createMany' | 'updateOne' | 'updateMany' | 'upsertOne' | 'deleteOne' | 'deleteMany' | 'executeRaw' | 'aggregate' | 'count' | 'groupBy';
export interface WriteTypeOptions extends ZodValidatorOptions {
    inputType: ExtendedDMMFSchemaArgInputType;
    isOptional?: boolean;
    isNullable?: boolean;
    writeLazy?: boolean;
    writeComma?: boolean;
}
export type WriteTypeFunction<TOptions extends WriteTypeOptions = WriteTypeOptions> = (writer: CodeBlockWriter, options: TOptions) => CodeBlockWriter | undefined;
//# sourceMappingURL=types.d.ts.map