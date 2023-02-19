import { it, expect, describe } from 'vitest';

import { DEFAULT_GENERATOR_CONFIG, FIELD_BASE } from './setup';
import { ExtendedDMMFFieldValidatorString } from '../extendedDMMFFieldValidatorString';

it(`should load a scalar DMMF.field ExtendedDMMFFieldValidatorString class without docs`, async () => {
  const field = new ExtendedDMMFFieldValidatorString(
    { ...FIELD_BASE },
    DEFAULT_GENERATOR_CONFIG,
    'ModelName',
  );

  expect(field).toBeDefined();
  expect(field?.['validatorMatch']).toBeUndefined();
  expect(field?.['validatorType']).toBeUndefined();
  expect(field?.['validatorCustomError']).toBeUndefined();
  expect(field?.['validatorPattern']).toBeUndefined();
  expect(field?.zodCustomErrors).toBeUndefined();
});

it(`should load a scalar DMMF.field ExtendedDMMFFieldValidatorString class with docs and validator`, async () => {
  const field = new ExtendedDMMFFieldValidatorString(
    {
      ...FIELD_BASE,
      documentation:
        'some text in docs @zod.string({ required_error: "error" }).min(2).max(4)',
    },
    DEFAULT_GENERATOR_CONFIG,
    'ModelName',
  );

  expect(field).toBeDefined();
  expect(field?.['validatorMatch']).toBeDefined();
  expect(field?.['validatorType']).toBe('string');
  expect(field?.['validatorCustomError']).toBe('({ required_error: "error" })');
  expect(field?.['validatorPattern']).toBe('.min(2).max(4)');
  expect(field?.zodCustomErrors).toBe('{ required_error: "error" }');
  expect(field?.clearedDocumentation).toBe('some text in docs');
  expect(field.documentation).toBe(
    'some text in docs @zod.string({ required_error: "error" }).min(2).max(4)',
  );
});

it(`should load a scalar DMMF.field ExtendedDMMFFieldValidatorString class with docs and validator on field with default validator`, async () => {
  const field = new ExtendedDMMFFieldValidatorString(
    {
      ...FIELD_BASE,
      type: 'Int',
      documentation:
        'some text in docs @zod.number({ required_error: "error" }).lt(2).gt(4)',
    },
    DEFAULT_GENERATOR_CONFIG,
    'ModelName',
  );

  expect(field).toBeDefined();
  expect(field?.['validatorMatch']).toBeDefined();
  expect(field?.['validatorType']).toBe('number');
  expect(field?.['validatorCustomError']).toBe('({ required_error: "error" })');
  expect(field?.['validatorPattern']).toBe('.lt(2).gt(4)');
  expect(field?.zodCustomErrors).toBe('{ required_error: "error" }');
  expect(field?.zodValidatorString).toBe('.lt(2).gt(4)');
  expect(field?.clearedDocumentation).toBe('some text in docs');
  expect(field.documentation).toBe(
    'some text in docs @zod.number({ required_error: "error" }).lt(2).gt(4)',
  );
});

it(`should load a scalar DMMF.field ExtendedDMMFFieldValidatorString class with docs and NO validator on field with default validator`, async () => {
  const field = new ExtendedDMMFFieldValidatorString(
    {
      ...FIELD_BASE,
      type: 'Int',
      documentation: 'some text in docs',
    },
    DEFAULT_GENERATOR_CONFIG,
    'ModelName',
  );

  expect(field).toBeDefined();
  expect(field?.['validatorMatch']).toBeUndefined();
  expect(field?.['validatorType']).toBeUndefined();
  expect(field?.['validatorCustomError']).toBeUndefined();
  expect(field?.['validatorPattern']).toBeUndefined();
  expect(field?.zodCustomErrors).toBeUndefined();
  expect(field?.zodValidatorString).toBe('.int()');
  expect(field?.clearedDocumentation).toBe('some text in docs');
  expect(field.documentation).toBe('some text in docs');
});

// it(`should load a scalar DMMF.field ExtendedDMMFFieldValidatorString class with docs and invalid validator for type`, async () => {
//   expect(
//     () =>
//       new ExtendedDMMFFieldValidatorString(
//         {
//           ...FIELD_BASE,
//           documentation:
//             '@zod.string.lt(2).gt(4).invalid({ required_error: "error" })',
//         },
//         DEFAULT_GENERATOR_CONFIG,
//         'ModelName',
//       ),
//   ).toThrowError(
//     "[@zod generator error]: Validator 'lt' is not valid for type 'String' or for specified '@zod.[key]'. [Error Location]: Model: 'ModelName', Field: 'test'.",
//   );
// });

// it(`should load a scalar DMMF.field ExtendedDMMFFieldValidatorString class with docs and invalid validator for type`, async () => {
//   expect(
//     () =>
//       new ExtendedDMMFFieldValidatorString(
//         {
//           ...FIELD_BASE,
//           documentation:
//             '@zod.string.lt(2).gt(4).invalid({ required_error: "error" })',
//         },
//         DEFAULT_GENERATOR_CONFIG,
//         'ModelName',
//       ),
//   ).toThrowError(
//     "[@zod generator error]: Validator 'lt' is not valid for type 'String' or for specified '@zod.[key]'. [Error Location]: Model: 'ModelName', Field: 'test'.",
//   );
// });

/////////////////////////////////////////////
// CUSTOM VALIDATOR STRING
/////////////////////////////////////////////

describe('ExtendedDMMFFieldValidatorString custom validator string', () => {
  it(`should load field with docs and custom validator`, async () => {
    const field = new ExtendedDMMFFieldValidatorString(
      {
        ...FIELD_BASE,
        documentation:
          'some text in docs @zod.custom.use("z.string().min(2).max(4)")',
      },
      DEFAULT_GENERATOR_CONFIG,
      'ModelName',
    );

    // expect(field).toBeDefined();
    // expect(field?.['validatorMatch']).toBeDefined();
    // expect(field?.['validatorType']).toBe('custom');
    // expect(field?.['validatorCustomError']).toBeUndefined();
    // expect(field?.['validatorPattern']).toBe('.use(z.string().min(2).max(4))');
    // expect(field?.zodCustomErrors).toBeUndefined();
    // expect(field?.clearedDocumentation).toBe('some text in docs');
    // expect(field.documentation).toBe(
    //   'some text in docs @zod.custom.use(z.string().min(2).max(4))',
    // );
  });
});
