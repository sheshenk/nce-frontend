import camelCase from 'lodash.camelcase';
import snakeCase from 'lodash.snakecase';

// For transforming arrays and objects, not individual values, for that, directly use lodash function
const caseTransformer = (transformKey) => {
  const transform = (value) => {
    if (Array.isArray(value)) {
      return value.map(transform);
    }

    if (typeof value === 'object' && value) {
      const result = {};

      Object.keys(value).forEach(key => {
        result[transformKey(key)] = transform((value)[key]);
      });

      return result;
    }

    return value;
  };

  return transform;
};

export const toCamelCase = caseTransformer(camelCase);

export const toSnakeCase = caseTransformer(snakeCase);