import { CodeBlockWriter, StructureKind } from 'ts-morph';

import {
  GetStatements,
  Statement,
  WriteBaseFilterTypesFunction,
} from '../types';
import { writeConstStatement, writeHeading } from '../utils';

///////////////////////////////////////////
// HELPER FUNCTIONS
///////////////////////////////////////////

const filterTypes: WriteBaseFilterTypesFunction =
  (options) => (writer: CodeBlockWriter) => {
    writer.inlineBlock(() => {
      writer
        .write(`equals?: number`)
        .conditionalWrite(options?.nullable, ` | null`)
        .write(`;`)
        .newLine();
      writer
        .write(`in?: Prisma.Prisma.Enumerable<number>`)
        .conditionalWrite(options?.nullable, ` | null`)
        .write(`;`)
        .newLine();
      writer
        .write(`notIn?: Prisma.Prisma.Enumerable<number>`)
        .conditionalWrite(options?.nullable, ` | null`)
        .write(`;`)
        .newLine();
      writer.writeLine(`lt?: number;`);
      writer.writeLine(`lte?: number;`);
      writer.writeLine(`gt?: number;`);
      writer.writeLine(`gte?: number;`);

      if (options?.aggregates) {
        writer
          .write(`not?: `)
          .conditionalWrite(
            options?.nullable,
            `NestedIntNullableWithAggregatesFilter`,
          )
          .conditionalWrite(!options?.nullable, `NestedIntWithAggregatesFilter`)
          .write(` | number`)
          .conditionalWrite(options?.nullable, ` | null`)
          .write(`;`)
          .newLine();
        writer
          .write(`_count?: `)
          .conditionalWrite(options?.nullable, `NestedIntNullableFilter`)
          .conditionalWrite(!options?.nullable, `NestedIntFilter`)
          .write(`;`)
          .newLine();
        writer
          .write(`_avg?: `)
          .conditionalWrite(options?.nullable, `NestedFloatNullableFilter`)
          .conditionalWrite(!options?.nullable, `NestedFloatFilter`)
          .write(`;`)
          .newLine();
        writer
          .write(`_sum?: `)
          .conditionalWrite(options?.nullable, `NestedIntNullableFilter`)
          .conditionalWrite(!options?.nullable, `NestedIntFilter`)
          .write(`;`)
          .newLine();
        writer
          .write(`_min?: `)
          .conditionalWrite(options?.nullable, `NestedIntNullableFilter`)
          .conditionalWrite(!options?.nullable, `NestedIntFilter`)
          .write(`;`)
          .newLine();
        writer
          .write(`_max?: `)
          .conditionalWrite(options?.nullable, `NestedIntNullableFilter`)
          .conditionalWrite(!options?.nullable, `NestedIntFilter`)
          .write(`;`)
          .newLine();
      } else {
        writer
          .write(`not?: NestedIntFilter | number`)
          .conditionalWrite(options?.nullable, ` | null`)
          .write(`;`)
          .newLine();
      }
    });
  };

const filterInitializer: WriteBaseFilterTypesFunction =
  (options) => (writer) => {
    writer
      .write(`z.object(`)
      .inlineBlock(() => {
        writer
          .write(`equals: z.number().optional()`)
          .conditionalWrite(options?.nullable, `.nullable()`)
          .write(`,`)
          .newLine();
        writer
          .write(`in: z.union([z.number(), z.number().array()]).optional()`)
          .conditionalWrite(options?.nullable, `.nullable()`)
          .write(`,`)
          .newLine();
        writer
          .write(`notIn: z.union([z.number(), z.number().array()]).optional()`)
          .conditionalWrite(options?.nullable, `.nullable()`)
          .write(`,`)
          .newLine();
        writer.writeLine(`lt: z.number().optional(),`);
        writer.writeLine(`lte: z.number().optional(),`);
        writer.writeLine(`gt: z.number().optional(),`);
        writer.writeLine(`gte: z.number().optional(),`);

        /// ceck options
        if (options?.aggregates) {
          writer
            .write(`not: z.union([z.number(), z.lazy(() => `)
            .conditionalWrite(
              options?.nullable,
              `NestedIntNullableWithAggregatesFilter`,
            )
            .conditionalWrite(
              !options?.nullable,
              `NestedIntWithAggregatesFilter`,
            )
            .write(`)]).optional()`)
            .conditionalWrite(options?.nullable, `.nullable()`)
            .write(`,`)
            .newLine();

          writer
            .write(`_count: z.lazy(()=> `)
            .conditionalWrite(options?.nullable, `NestedIntNullableFilter`)
            .conditionalWrite(!options?.nullable, `NestedIntFilter`)
            .write(`).optional()`)
            .write(`,`)
            .newLine();
          writer
            .write(`_avg: z.lazy(()=> `)
            .conditionalWrite(options?.nullable, `NestedFloatNullableFilter`)
            .conditionalWrite(!options?.nullable, `NestedFloatFilter`)
            .write(`).optional()`)
            .write(`,`)
            .newLine();
          writer
            .write(`_sum: z.lazy(()=> `)
            .conditionalWrite(options?.nullable, `NestedIntNullableFilter`)
            .conditionalWrite(!options?.nullable, `NestedIntFilter`)
            .write(`).optional()`)
            .write(`,`)
            .newLine();
          writer
            .write(`_min: z.lazy(()=> `)
            .conditionalWrite(options?.nullable, `NestedIntNullableFilter`)
            .conditionalWrite(!options?.nullable, `NestedIntFilter`)
            .write(`).optional()`)
            .write(`,`)
            .newLine();
          writer
            .write(`_max: z.lazy(()=> `)
            .conditionalWrite(options?.nullable, `NestedIntNullableFilter`)
            .conditionalWrite(!options?.nullable, `NestedIntFilter`)
            .write(`).optional()`)
            .write(`,`)
            .newLine();
        } else {
          writer
            .write(
              `not: z.union([z.number(), z.lazy(() => NestedIntFilter)]).optional()`,
            )
            .conditionalWrite(options?.nullable, `.nullable()`)
            .write(`,`);
        }
      })
      .write(`)`);
  };

///////////////////////////////////////////
// STATEMENTS
///////////////////////////////////////////

export const getIntFilterBaseStatements: GetStatements = () => {
  return [
    writeHeading(`INT FILTERS`, 'FAT'),
    writeHeading(`INT FILTER`, 'SLIM'),
    {
      leadingTrivia: (writer) => writer.newLine(),
      kind: StructureKind.TypeAlias,
      name: 'IntFilter',
      type: filterTypes(),
    } as Statement,
    writeConstStatement({
      leadingTrivia: (writer) => writer.newLine(),
      declarations: [
        {
          name: 'IntFilter',
          type: 'z.ZodType<IntFilter>',
          initializer: filterInitializer(),
        },
      ],
    }),
    writeHeading(`NESTED INT FILTER`, 'SLIM'),
    {
      leadingTrivia: (writer) => writer.newLine(),
      kind: StructureKind.TypeAlias,
      name: 'NestedIntFilter',
      type: filterTypes(),
    } as Statement,
    writeConstStatement({
      leadingTrivia: (writer) => writer.newLine(),
      declarations: [
        {
          name: 'NestedIntFilter',
          type: 'z.ZodType<NestedIntFilter>',
          initializer: filterInitializer(),
        },
      ],
    }),
    writeHeading(`INT WITH AGGREGATES FILTER`, 'SLIM'),
    {
      leadingTrivia: (writer) => writer.newLine(),
      kind: StructureKind.TypeAlias,
      name: 'IntWithAggregatesFilter',
      type: filterTypes({ aggregates: true }),
    } as Statement,
    writeConstStatement({
      leadingTrivia: (writer) => writer.newLine(),
      declarations: [
        {
          name: 'IntWithAggregatesFilter',
          type: 'z.ZodType<IntWithAggregatesFilter>',
          initializer: filterInitializer({ aggregates: true }),
        },
      ],
    }),
    writeHeading(`NESTED INT WITH AGGREGATES FILTER`, 'SLIM'),
    {
      leadingTrivia: (writer) => writer.newLine(),
      kind: StructureKind.TypeAlias,
      name: 'NestedIntWithAggregatesFilter',
      type: filterTypes({ aggregates: true }),
    } as Statement,
    writeConstStatement({
      leadingTrivia: (writer) => writer.newLine(),
      declarations: [
        {
          name: 'NestedIntWithAggregatesFilter',
          type: 'z.ZodType<NestedIntWithAggregatesFilter>',
          initializer: filterInitializer({ aggregates: true }),
        },
      ],
    }),
    writeHeading(`INT NULLABLE FILTER`, 'SLIM'),
    {
      leadingTrivia: (writer) => writer.newLine(),
      kind: StructureKind.TypeAlias,
      name: 'IntNullableFilter',
      type: filterTypes({ nullable: true }),
    } as Statement,
    writeConstStatement({
      leadingTrivia: (writer) => writer.newLine(),
      declarations: [
        {
          name: 'IntNullableFilter',
          type: 'z.ZodType<IntNullableFilter>',
          initializer: filterInitializer({ nullable: true }),
        },
      ],
    }),
    writeHeading(`NESTED NULLABLE INT FILTER`, 'SLIM'),
    {
      leadingTrivia: (writer) => writer.newLine(),
      kind: StructureKind.TypeAlias,
      name: 'NestedIntNullableFilter',
      type: filterTypes({ nullable: true }),
    } as Statement,
    writeConstStatement({
      leadingTrivia: (writer) => writer.newLine(),
      declarations: [
        {
          name: 'NestedIntNullableFilter',
          type: 'z.ZodType<NestedIntNullableFilter>',
          initializer: filterInitializer({ nullable: true }),
        },
      ],
    }),
    writeHeading(`INT NULLABLE WITH AGGREGATES FILTER`, 'SLIM'),
    {
      leadingTrivia: (writer) => writer.newLine(),
      kind: StructureKind.TypeAlias,
      name: 'IntNullableWithAggregatesFilter',
      type: filterTypes({ nullable: true, aggregates: true }),
    } as Statement,
    writeConstStatement({
      leadingTrivia: (writer) => writer.newLine(),
      declarations: [
        {
          name: 'IntNullableWithAggregatesFilter',
          type: 'z.ZodType<IntNullableWithAggregatesFilter>',
          initializer: filterInitializer({
            nullable: true,
            aggregates: true,
          }),
        },
      ],
    }),
    writeHeading(`NESTED INT NULLABLE WITH AGGREGATES FILTER`, 'SLIM'),
    {
      leadingTrivia: (writer) => writer.newLine(),
      kind: StructureKind.TypeAlias,
      name: 'NestedIntNullableWithAggregatesFilter',
      type: filterTypes({ nullable: true, aggregates: true }),
    } as Statement,
    writeConstStatement({
      leadingTrivia: (writer) => writer.newLine(),
      declarations: [
        {
          name: 'NestedIntNullableWithAggregatesFilter',
          type: 'z.ZodType<NestedIntNullableWithAggregatesFilter>',
          initializer: filterInitializer({
            nullable: true,
            aggregates: true,
          }),
        },
      ],
    }),
  ].flat();
};