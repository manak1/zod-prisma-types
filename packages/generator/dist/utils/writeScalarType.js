"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeScalarType = void 0;
const writeScalarType = (writer, { inputType, isOptional, isNullable, writeComma = true, zodCustomErrors, zodValidatorString, zodCustomValidatorString, }) => {
    const zodType = inputType.getZodScalarType();
    if (!zodType)
        return;
    if (zodCustomValidatorString) {
        return writer
            .write(zodCustomValidatorString)
            .conditionalWrite(inputType.isList, `.array()`)
            .conditionalWrite(isOptional, `.optional()`)
            .conditionalWrite(isNullable, `.nullable()`)
            .conditionalWrite(writeComma, `,`);
    }
    return writer
        .write(`z.${zodType}(`)
        .conditionalWrite(!!zodCustomErrors, zodCustomErrors)
        .write(`)`)
        .conditionalWrite(!!zodValidatorString, zodValidatorString)
        .conditionalWrite(inputType.isList, `.array()`)
        .conditionalWrite(isOptional, `.optional()`)
        .conditionalWrite(isNullable, `.nullable()`)
        .conditionalWrite(writeComma, `,`);
};
exports.writeScalarType = writeScalarType;
//# sourceMappingURL=writeScalarType.js.map