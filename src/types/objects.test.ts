import { objects } from './objects';

describe('#objects type functions', () => {
  describe('#01 => core', () => {
    it('#01.01 => should call objects function', () => {
      const result = objects();
      expect(result).toBeUndefined();
    });

    it('#01.02 => should call objects function with parameter', () => {
      const result = objects({ a: 1 });
      expect(result).toBeUndefined();
    });

    it('#01.03 => should call objects.forceCast', () => {
      const result = objects.forceCast();
      expect(result).toBeUndefined();
    });

    it('#01.04 => should call objects.forceCast with parameter', () => {
      const result = objects.forceCast({ a: 1 });
      expect(result).toBeUndefined();
    });

    it('#01.05 => should call objects.is', () => {
      const result = objects.is();
      expect(result).toBeUndefined();
    });

    it('#01.06 => should call objects.is with parameter', () => {
      const result = objects.is({ a: 1 });
      expect(result).toBeUndefined();
    });

    it('#01.07 => should call objects.type', () => {
      const result = objects.type;
      expect(result).toBeUndefined();
    });
  });

  describe('#02 => keysOf', () => {
    it('#02.01 => should call objects.keysOf', () => {
      const result = objects.keysOf();
      expect(result).toBeUndefined();
    });

    it('#02.02 => should call objects.keysOf with parameter', () => {
      const result = objects.keysOf({ a: 1, b: 2 });
      expect(result).toBeUndefined();
    });

    it('#02.03 => should call objects.keysOf.union', () => {
      const result = objects.keysOf.union();
      expect(result).toBeUndefined();
    });

    it('#02.04 => should call objects.keysOf.union with parameter', () => {
      const result = objects.keysOf.union({ a: 1, b: 2 });
      expect(result).toBeUndefined();
    });
  });

  describe('#03 => values', () => {
    it('#03.01 => should call objects.values', () => {
      const result = objects.values();
      expect(result).toBeUndefined();
    });

    it('#03.02 => should call objects.values with parameter', () => {
      const result = objects.values({ a: 1, b: 2 });
      expect(result).toBeUndefined();
    });

    it('#03.03 => should call objects.values.union', () => {
      const result = objects.values.union();
      expect(result).toBeUndefined();
    });

    it('#03.04 => should call objects.values.union with parameter', () => {
      const result = objects.values.union({ a: 1, b: 2 });
      expect(result).toBeUndefined();
    });
  });

  describe('#04 => entries', () => {
    it('#04.01 => should call objects.entries', () => {
      const result = objects.entries();
      expect(result).toBeUndefined();
    });

    it('#04.02 => should call objects.entries with parameter', () => {
      const result = objects.entries({ a: 1, b: 2 });
      expect(result).toBeUndefined();
    });
  });

  describe('#05 => byKey', () => {
    it('#05.01 => should call objects.byKey', () => {
      const result = objects.byKey();
      expect(result).toBeUndefined();
    });

    it('#05.02 => should call objects.byKey with parameters', () => {
      const result = objects.byKey({ a: 1, b: 2 }, 'a');
      expect(result).toBeUndefined();
    });
  });

  describe('#06 => hasKeys', () => {
    it('#06.01 => should call objects.hasKeys', () => {
      const result = objects.hasKeys();
      expect(result).toBeUndefined();
    });

    it('#06.02 => should call objects.hasKeys with parameters', () => {
      const result = objects.hasKeys({ a: 1, b: 2 }, 'a', 'b');
      expect(result).toBeUndefined();
    });
  });

  describe('#07 => hasAllKeys', () => {
    it('#07.01 => should call objects.hasAllKeys', () => {
      const result = objects.hasAllKeys();
      expect(result).toBeUndefined();
    });

    it('#07.02 => should call objects.hasAllKeys with parameters', () => {
      const result = objects.hasAllKeys({ a: 1, b: 2 }, 'a', 'b');
      expect(result).toBeUndefined();
    });
  });

  describe('#08 => omit', () => {
    it('#08.01 => should call objects.omit', () => {
      const result = objects.omit();
      expect(result).toBeUndefined();
    });

    it('#08.02 => should call objects.omit with parameters', () => {
      const result = objects.omit({ a: 1, b: 2 }, 'a');
      expect(result).toBeUndefined();
    });

    describe('#08.01 => omit.is', () => {
      it('#08.01.01 => should call objects.omit.is', () => {
        const result = objects.omit.is();
        expect(typeof result).toBe('function');
      });

      it('#08.01.02 => should call objects.omit.is with parameters', () => {
        const result = objects.omit.is({ a: 1, b: 2 }, 'a');
        expect(typeof result).toBe('function');
      });

      it('#08.01.03 => should test objects.omit.is predicate functionality', () => {
        const checkOmit = objects.omit.is({ a: 1, b: 2, c: 3 }, 'a');

        // Test with object that should match (has b and c, but not a)
        const result1 = checkOmit({ b: 2, c: 3 });
        expect(result1).toBeUndefined();

        // Test with object that should not match (has a)
        const result2 = checkOmit({ a: 1, b: 2, c: 3 });
        expect(result2).toBeUndefined();

        // Test without parameters
        const result3 = checkOmit();
        expect(result3).toBeUndefined();
      });

      it('#08.01.04 => should test objects.omit.is with multiple keys', () => {
        const checkOmitMultiple = objects.omit.is(
          { a: 1, b: 2, c: 3, d: 4 },
          'a',
          'b',
        );

        // Test with object that should match (has c and d, but not a or b)
        const result1 = checkOmitMultiple({ c: 3, d: 4 });
        expect(result1).toBeUndefined();

        // Test with object that should not match (has a)
        const result2 = checkOmitMultiple({ a: 1, c: 3, d: 4 });
        expect(result2).toBeUndefined();
      });

      it('#08.01.05 => should test objects.omit.is edge cases', () => {
        // Test with empty object
        const checkEmptyOmit = objects.omit.is({}, 'nonexistent');
        const result1 = checkEmptyOmit({});
        expect(result1).toBeUndefined();

        // Test with no keys to omit
        const checkNoKeysOmit = objects.omit.is({ a: 1, b: 2 });
        const result2 = checkNoKeysOmit({ a: 1, b: 2 });
        expect(result2).toBeUndefined();
      });

      it('#08.01.06 => should test objects.omit.is works with different object shapes', () => {
        // Test with nested objects
        const nestedObj = {
          user: { id: 1, name: 'John' },
          status: 'active',
        };
        const checkNestedOmit = objects.omit.is(nestedObj, 'user');
        expect(typeof checkNestedOmit).toBe('function');
        expect(checkNestedOmit({ status: 'active' })).toBeUndefined();

        // Test with arrays
        const arrayObj = { items: [1, 2, 3], count: 3 };
        const checkArrayOmit = objects.omit.is(arrayObj, 'items');
        expect(typeof checkArrayOmit).toBe('function');
        expect(checkArrayOmit({ count: 3 })).toBeUndefined();
      });
    });

    describe('#08.02 => omit.const', () => {
      it('#08.02.01 => should call objects.omit.const', () => {
        const result = objects.omit.const();
        expect(result).toBeUndefined();
      });

      it('#08.02.02 => should call objects.omit.const with parameters', () => {
        const result = objects.omit.const({ a: 1, b: 2 }, 'a');
        expect(result).toBeUndefined();
      });

      describe('#08.02.01 => omit.const.is', () => {
        it('#08.02.01.01 => should call objects.omit.const.is', () => {
          const result = objects.omit.const.is();
          expect(typeof result).toBe('function');
        });

        it('#08.02.01.02 => should call objects.omit.const.is with parameters', () => {
          const checkFunction = objects.omit.const.is({ a: 1, b: 2 }, 'a');
          expect(typeof checkFunction).toBe('function');
          const result = checkFunction({ b: 2 });
          expect(result).toBeUndefined();
        });

        it('#08.02.01.03 => should test objects.omit.const.is with multiple keys', () => {
          const checkStrictOmitMultiple = objects.omit.const.is(
            { a: 1, b: 2, c: 3, d: 4 },
            'a',
            'b',
          );

          // Test with object that should match (has c and d, but not a or b)
          const result1 = checkStrictOmitMultiple({ c: 3, d: 4 });
          expect(result1).toBeUndefined();

          // Test with object that should not match (has a)
          const result2 = checkStrictOmitMultiple({ a: 1, c: 3, d: 4 });
          expect(result2).toBeUndefined();
        });

        it('#08.02.01.04 => should test objects.omit.is and objects.omit.const.is return the same predicate function', () => {
          // Both functions should return equivalent predicate behavior
          const original = { a: 1, b: 'hello', c: true };
          const regularOmit = objects.omit.is(original, 'a');
          const strictOmit = objects.omit.const.is(original, 'a');

          // Both should be functions
          expect(typeof regularOmit).toBe('function');
          expect(typeof strictOmit).toBe('function');

          // Both should return undefined for all test cases (since they're type-level predicates)
          expect(regularOmit({ b: 'hello', c: true })).toBeUndefined();
          expect(strictOmit({ b: 'hello', c: true })).toBeUndefined();

          expect(
            regularOmit({ a: 1, b: 'hello', c: true }),
          ).toBeUndefined();
          expect(
            strictOmit({ a: 1, b: 'hello', c: true }),
          ).toBeUndefined();
        });

        it('#08.02.01.05 => should test objects.omit.const.is with complex types', () => {
          interface ComplexType {
            id: number;
            metadata: {
              created: Date;
              updated?: Date;
            };
            tags: string[];
          }

          const complexObj: ComplexType = {
            id: 1,
            metadata: { created: new Date() },
            tags: ['tag1', 'tag2'],
          };

          const checkComplexOmit = objects.omit.const.is(complexObj, 'id');
          expect(typeof checkComplexOmit).toBe('function');

          // Test with matching shape
          const result = checkComplexOmit({
            metadata: { created: new Date() },
            tags: ['tag1', 'tag2'],
          });
          expect(result).toBeUndefined();
        });
      });
    });

    describe('#08.03 => omit.by', () => {
      it('#08.03.01 => should call objects.omit.by', () => {
        const result = objects.omit.by();
        expect(result).toBeUndefined();
      });

      it('#08.03.02 => should call objects.omit.by with parameters', () => {
        const result = objects.omit.by({ a: 1, b: 2 }, 1);
        expect(result).toBeUndefined();
      });

      describe('#08.03.01 => omit.by.is', () => {
        it('#08.03.01.01 => should call objects.omit.by.is', () => {
          const checkFunction = objects.omit.by.is();
          expect(typeof checkFunction).toBe('function');
        });

        it('#08.03.01.02 => should call objects.omit.by.is with parameters', () => {
          const checkFunction = objects.omit.by.is({ a: 1, b: 2 }, 1);
          expect(typeof checkFunction).toBe('function');
          const result = checkFunction({ b: 2 });
          expect(result).toBeUndefined();
        });
      });

      describe('#08.03.02 => omit.by.const', () => {
        it('#08.03.02.01 => should call objects.omit.by.const', () => {
          const result = objects.omit.by.const();
          expect(result).toBeUndefined();
        });

        it('#08.03.02.02 => should call objects.omit.by.const with parameters', () => {
          const result = objects.omit.by.const({ a: 1, b: 2 }, 1);
          expect(result).toBeUndefined();
        });

        describe('#08.03.02.01 => omit.by.const.is', () => {
          it('#08.03.02.01.01 => should call objects.omit.by.const.is', () => {
            const checkFunction = objects.omit.by.const.is();
            expect(typeof checkFunction).toBe('function');
          });

          it('#08.03.02.01.02 => should call objects.omit.by.const.is with parameters', () => {
            const checkFunction = objects.omit.by.const.is(
              { a: 1, b: 2 },
              1,
            );
            expect(typeof checkFunction).toBe('function');
            const result = checkFunction({ b: 2 });
            expect(result).toBeUndefined();
          });
        });
      });
    });

    describe('#08.04 => omit.deep', () => {
      it('#08.04.01 => should call objects.omit.deep', () => {
        const result = objects.omit.deep();
        expect(result).toBeUndefined();
      });

      it('#08.04.02 => should call objects.omit.deep with parameters', () => {
        const result = objects.omit.deep({ a: { c: 1 }, b: 2 }, 'a');
        expect(result).toBeUndefined();
      });

      describe('#08.04.01 => omit.deep.is', () => {
        it('#08.04.01.01 => should call objects.omit.deep.is', () => {
          const checkFunction = objects.omit.deep.is();
          expect(typeof checkFunction).toBe('function');
        });

        it('#08.04.01.02 => should call objects.omit.deep.is with parameters', () => {
          const checkFunction = objects.omit.deep.is({ a: { b: 1 } }, 'b');
          expect(typeof checkFunction).toBe('function');
          const result = checkFunction({ a: {} });
          expect(result).toBeUndefined();
        });
      });

      describe('#08.04.02 => omit.deep.const', () => {
        it('#08.04.02.01 => should call objects.omit.deep.const', () => {
          const result = objects.omit.deep.const();
          expect(result).toBeUndefined();
        });

        it('#08.04.02.02 => should call objects.omit.deep.const with parameters', () => {
          const result = objects.omit.deep.const({ a: { b: 1 } }, 'a');
          expect(result).toBeUndefined();
        });

        describe('#08.04.02.01 => omit.deep.const.is', () => {
          it('#08.04.02.01.01 => should call objects.omit.deep.const.is', () => {
            const checkFunction = objects.omit.deep.const.is();
            expect(typeof checkFunction).toBe('function');
          });

          it('#08.04.02.01.02 => should call objects.omit.deep.const.is with parameters', () => {
            const checkFunction = objects.omit.deep.const.is(
              { a: { b: 1 } },
              'a',
            );
            expect(typeof checkFunction).toBe('function');
            const result = checkFunction({});
            expect(result).toBeUndefined();
          });
        });
      });

      describe('#08.04.03 => omit.deep.by', () => {
        it('#08.04.03.01 => should call objects.omit.deep.by', () => {
          const result = objects.omit.deep.by();
          expect(result).toBeUndefined();
        });

        it('#08.04.03.02 => should call objects.omit.deep.by with parameters', () => {
          const result = objects.omit.deep.by({ a: { b: 1 } }, 1);
          expect(result).toBeUndefined();
        });

        describe('#08.04.03.01 => omit.deep.by.is', () => {
          it('#08.04.03.01.01 => should call objects.omit.deep.by.is', () => {
            const checkFunction = objects.omit.deep.by.is();
            expect(typeof checkFunction).toBe('function');
          });

          it('#08.04.03.01.02 => should call objects.omit.deep.by.is with parameters', () => {
            const checkFunction = objects.omit.deep.by.is(
              { a: { b: 1 } },
              1,
            );
            expect(typeof checkFunction).toBe('function');
            const result = checkFunction({ a: { b: 2 } });
            expect(result).toBeUndefined();
          });
        });

        describe('#08.04.03.02 => omit.deep.by.const', () => {
          it('#08.04.03.02.01 => should call objects.omit.deep.by.const', () => {
            const result = objects.omit.deep.by.const();
            expect(result).toBeUndefined();
          });

          it('#08.04.03.02.02 => should call objects.omit.deep.by.const with parameters', () => {
            const result = objects.omit.deep.by.const(
              { a: { b: 1 } },
              { b: 1 },
            );
            expect(result).toBeUndefined();
          });

          describe('#08.04.03.02.01 => omit.deep.by.const.is', () => {
            it('#08.04.03.02.01.01 => should call objects.omit.deep.by.const.is', () => {
              const checkFunction = objects.omit.deep.by.const.is();
              expect(typeof checkFunction).toBe('function');
            });

            it('#08.04.03.02.01.02 => should call objects.omit.deep.by.const.is with parameters', () => {
              const checkFunction = objects.omit.deep.by.const.is(
                { a: { b: 1 } },
                { b: 1 },
              );
              expect(typeof checkFunction).toBe('function');
              const result = checkFunction({ a: { b: 2 } });
              expect(result).toBeUndefined();
            });
          });
        });
      });
    });
  });

  describe('#09 => reverse', () => {
    it('#09.01 => should call objects.reverse', () => {
      const result = objects.reverse();
      expect(result).toBeUndefined();
    });

    it('#09.02 => should call objects.reverse with parameter', () => {
      const result = objects.reverse({ a: 'x', b: 'y' });
      expect(result).toBeUndefined();
    });
  });

  describe('#10 => readonly', () => {
    it('#10.01 => should call objects.readonly', () => {
      const result = objects.readonly();
      expect(result).toBeUndefined();
    });

    it('#10.02 => should call objects.readonly with parameter', () => {
      const result = objects.readonly({ a: 1, b: 2 });
      expect(result).toBeUndefined();
    });

    it('#10.03 => should call objects.readonly.forceCast', () => {
      const result = objects.readonly.forceCast();
      expect(result).toBeUndefined();
    });

    it('#10.04 => should call objects.readonly.forceCast with parameter', () => {
      const result = objects.readonly.forceCast({ a: 1 });
      expect(result).toBeUndefined();
    });

    it('#10.05 => should call objects.readonly.dynamic', () => {
      const result = objects.readonly.dynamic();
      expect(result).toBeUndefined();
    });

    it('#10.06 => should call objects.readonly.dynamic with parameter', () => {
      const result = objects.readonly.dynamic({ a: 1 } as const);
      expect(result).toBeUndefined();
    });

    it('#10.07 => should call objects.readonly.type', () => {
      const result = objects.readonly.type;
      expect(result).toBeUndefined();
    });

    it('#10.08 => should call objects.readonly.is', () => {
      const result = objects.readonly.is();
      expect(result).toBeUndefined();
    });

    it('#10.09 => should call objects.readonly.is with parameter', () => {
      const result = objects.readonly.is({ a: 1 });
      expect(result).toBeUndefined();
    });

    describe('#10.01 => readonly.not', () => {
      it('#10.01.01 => should call objects.readonly.not', () => {
        const result = objects.readonly.not();
        expect(result).toBeUndefined();
      });

      it('#10.01.02 => should call objects.readonly.not with parameter', () => {
        const result = objects.readonly.not({ a: 1, b: 2 });
        expect(result).toBeUndefined();
      });

      it('#10.01.03 => should call objects.readonly.not.is', () => {
        const result = objects.readonly.not.is();
        expect(result).toBeUndefined();
      });

      it('#10.01.04 => should call objects.readonly.not.is with parameter', () => {
        const result = objects.readonly.not.is({ a: 1, b: 2 });
        expect(result).toBeUndefined();
      });
    });

    describe('#10.02 => readonly.deep', () => {
      it('#10.02.01 => should call objects.readonly.deep', () => {
        const result = objects.readonly.deep();
        expect(result).toBeUndefined();
      });

      it('#10.02.02 => should call objects.readonly.deep with parameter', () => {
        const result = objects.readonly.deep({ a: { c: 1 }, b: 2 });
        expect(result).toBeUndefined();
      });

      it('#10.02.03 => should call objects.readonly.deep.is', () => {
        const result = objects.readonly.deep.is();
        expect(result).toBeUndefined();
      });

      it('#10.02.04 => should call objects.readonly.deep.is with parameter', () => {
        const result = objects.readonly.deep.is({ a: { b: 1 } });
        expect(result).toBeUndefined();
      });

      describe('#10.02.01 => readonly.deep.not', () => {
        it('#10.02.01.01 => should call objects.readonly.deep.not', () => {
          const result = objects.readonly.deep.not();
          expect(result).toBeUndefined();
        });

        it('#10.02.01.02 => should call objects.readonly.deep.not with parameter', () => {
          const result = objects.readonly.deep.not({ a: { c: 1 }, b: 2 });
          expect(result).toBeUndefined();
        });

        it('#10.02.01.03 => should call objects.readonly.deep.not.is', () => {
          const result = objects.readonly.deep.not.is();
          expect(result).toBeUndefined();
        });

        it('#10.02.01.04 => should call objects.readonly.deep.not.is with parameter', () => {
          const result = objects.readonly.deep.not.is({ a: { b: 1 } });
          expect(result).toBeUndefined();
        });
      });
    });
  });

  describe('#11 => freeze', () => {
    it('#11.01 => should call objects.freeze', () => {
      const result = objects.freeze();
      expect(result).toBeUndefined();
    });

    it('#11.02 => should call objects.freeze with parameter', () => {
      const result = objects.freeze({ a: 1, b: 2 });
      expect(result).toBeUndefined();
    });

    it('#11.03 => should call objects.freeze.forceCast', () => {
      const result = objects.freeze.forceCast();
      expect(result).toBeUndefined();
    });

    it('#11.04 => should call objects.freeze.forceCast with parameter', () => {
      const result = objects.freeze.forceCast({ a: 1 });
      expect(result).toBeUndefined();
    });

    it('#11.05 => should call objects.freeze.dynamic', () => {
      const result = objects.freeze.dynamic();
      expect(result).toBeUndefined();
    });

    it('#11.06 => should call objects.freeze.dynamic with parameter', () => {
      const result = objects.freeze.dynamic({ a: 1 } as const);
      expect(result).toBeUndefined();
    });

    it('#11.07 => should call objects.freeze.type', () => {
      const result = objects.freeze.type;
      expect(result).toBeUndefined();
    });

    it('#11.08 => should call objects.freeze.is', () => {
      const result = objects.freeze.is();
      expect(result).toBeUndefined();
    });

    it('#11.09 => should call objects.freeze.is with parameter', () => {
      const result = objects.freeze.is({ a: 1 });
      expect(result).toBeUndefined();
    });

    it('#11.10 => should call objects.freeze.not', () => {
      const result = objects.freeze.not();
      expect(result).toBeUndefined();
    });

    it('#11.11 => should call objects.freeze.not with parameter', () => {
      const result = objects.freeze.not({ a: 1, b: 2 });
      expect(result).toBeUndefined();
    });

    describe('#11.01 => freeze.deep', () => {
      it('#11.01.01 => should call objects.freeze.deep', () => {
        const result = objects.freeze.deep();
        expect(result).toBeUndefined();
      });

      it('#11.01.02 => should call objects.freeze.deep with parameter', () => {
        const result = objects.freeze.deep({ a: { c: 1 }, b: 2 });
        expect(result).toBeUndefined();
      });

      it('#11.01.03 => should call objects.freeze.deep.is', () => {
        const result = objects.freeze.deep.is();
        expect(result).toBeUndefined();
      });

      it('#11.01.04 => should call objects.freeze.deep.is with parameter', () => {
        const result = objects.freeze.deep.is({ a: { b: 1 } });
        expect(result).toBeUndefined();
      });

      describe('#11.01.01 => freeze.deep.not', () => {
        it('#11.01.01.01 => should call objects.freeze.deep.not', () => {
          const result = objects.freeze.deep.not();
          expect(result).toBeUndefined();
        });

        it('#11.01.01.02 => should call objects.freeze.deep.not with parameter', () => {
          const result = objects.freeze.deep.not({ a: { c: 1 }, b: 2 });
          expect(result).toBeUndefined();
        });

        it('#11.01.01.03 => should call objects.freeze.deep.not.is', () => {
          const result = objects.freeze.deep.not.is();
          expect(result).toBeUndefined();
        });

        it('#11.01.01.04 => should call objects.freeze.deep.not.is with parameter', () => {
          const result = objects.freeze.deep.not.is({ a: { b: 1 } });
          expect(result).toBeUndefined();
        });
      });
    });
  });

  describe('#12 => required', () => {
    it('#12.01 => should call objects.required', () => {
      const result = objects.required({ a: 1 });
      expect(result).toBeUndefined();
    });

    it('#12.02 => should call objects.required.is', () => {
      const result = objects.required.is();
      expect(result).toBeUndefined();
    });

    it('#12.03 => should call objects.required.is with parameter', () => {
      const result = objects.required.is({ a: 1, b: 2 });
      expect(result).toBeUndefined();
    });

    describe('#12.01 => required.deep', () => {
      it('#12.01.01 => should call objects.required.deep', () => {
        const result = objects.required.deep({ a: { c: 1 } });
        expect(result).toBeUndefined();
      });

      it('#12.01.02 => should call objects.required.deep.is', () => {
        const result = objects.required.deep.is();
        expect(result).toBeUndefined();
      });

      it('#12.01.03 => should call objects.required.deep.is with parameter', () => {
        const result = objects.required.deep.is({ a: { b: 1 } });
        expect(result).toBeUndefined();
      });
    });
  });

  describe('#13 => partial', () => {
    it('#13.01 => should call objects.partial', () => {
      const result = objects.partial({ a: 1 });
      expect(result).toBeUndefined();
    });

    it('#13.02 => should call objects.partial.deep', () => {
      const result = objects.partial.deep({ a: { c: 1 } });
      expect(result).toBeUndefined();
    });
  });

  describe('#14 => pick', () => {
    it('#14.01 => should call objects.pick', () => {
      const result = objects.pick({ a: 1, b: 2 }, 'a');
      expect(result).toBeUndefined();
    });

    describe('#14.01 => pick.by', () => {
      it('#14.01.01 => should call objects.pick.by', () => {
        const result = objects.pick.by();
        expect(result).toBeUndefined();
      });

      it('#14.01.02 => should call objects.pick.by with parameters', () => {
        const result = objects.pick.by({ a: 1, b: 2 }, 1);
        expect(result).toBeUndefined();
      });

      it('#14.01.03 => should call objects.pick.by.keys with parameters', () => {
        const result = objects.pick.by.keys({ a: 1, b: 'test' }, 'string');
        expect(result).toBeUndefined();
      });
    });
  });

  describe('#15 => ru', () => {
    it('#15.01 => should call objects.ru', () => {
      const result = objects.ru();
      expect(result).toBeUndefined();
    });

    it('#15.02 => should call objects.ru.forceCast', () => {
      const result = objects.ru.forceCast();
      expect(result).toBeUndefined();
    });

    it('#15.03 => should call objects.ru.forceCast with parameter', () => {
      const result = objects.ru.forceCast({ a: 1 });
      expect(result).toBeUndefined();
    });

    it('#15.04 => should call objects.ru.dynamic with parameter', () => {
      const result = objects.ru.dynamic({ a: 1 });
      expect(result).toBeUndefined();
    });

    it('#15.05 => should call objects.ru.is', () => {
      const result = objects.ru.is();
      expect(result).toBeUndefined();
    });

    it('#15.06 => should call objects.ru.is with parameter', () => {
      const result = objects.ru.is({ a: 1 });
      expect(result).toBeUndefined();
    });

    it('#15.07 => should call objects.ru.type', () => {
      const result = objects.ru.type;
      expect(result).toBeUndefined();
    });
  });

  describe('#16 => rn', () => {
    it('#16.01 => should call objects.rn', () => {
      const result = objects.rn();
      expect(result).toBeUndefined();
    });

    it('#16.02 => should call objects.rn.forceCast', () => {
      const result = objects.rn.forceCast();
      expect(result).toBeUndefined();
    });

    it('#16.03 => should call objects.rn.forceCast with parameter', () => {
      const result = objects.rn.forceCast({ a: 1 });
      expect(result).toBeUndefined();
    });

    it('#16.04 => should call objects.rn.dynamic with parameter', () => {
      const result = objects.rn.dynamic({} as Record<string, never>);
      expect(result).toBeUndefined();
    });

    it('#16.05 => should call objects.rn.is', () => {
      const result = objects.rn.is();
      expect(result).toBeUndefined();
    });

    it('#16.06 => should call objects.rn.is with parameter', () => {
      const result = objects.rn.is({ a: 1 });
      expect(result).toBeUndefined();
    });

    it('#16.07 => should call objects.rn.type', () => {
      const result = objects.rn.type;
      expect(result).toBeUndefined();
    });
  });

  describe('#17 => ra', () => {
    it('#17.01 => should call objects.ra', () => {
      const result = objects.ra();
      expect(result).toBeUndefined();
    });

    it('#17.02 => should call objects.ra.forceCast', () => {
      const result = objects.ra.forceCast();
      expect(result).toBeUndefined();
    });

    it('#17.03 => should call objects.ra.forceCast with parameter', () => {
      const result = objects.ra.forceCast({ a: 1 });
      expect(result).toBeUndefined();
    });

    it('#17.04 => should call objects.ra.dynamic with parameter', () => {
      const result = objects.ra.dynamic({ a: 1 });
      expect(result).toBeUndefined();
    });

    it('#17.05 => should call objects.ra.is', () => {
      const result = objects.ra.is();
      expect(result).toBeUndefined();
    });

    it('#17.06 => should call objects.ra.is with parameter', () => {
      const result = objects.ra.is({ a: 1 });
      expect(result).toBeUndefined();
    });

    it('#17.07 => should call objects.ra.type', () => {
      const result = objects.ra.type;
      expect(result).toBeUndefined();
    });
  });

  describe('#18 => primitive', () => {
    it('#18.01 => should call objects.primitive', () => {
      const result = objects.primitive();
      expect(result).toBeUndefined();
    });

    it('#18.02 => should call objects.primitive.forceCast', () => {
      const result = objects.primitive.forceCast();
      expect(result).toBeUndefined();
    });

    it('#18.03 => should call objects.primitive.forceCast with parameter', () => {
      const result = objects.primitive.forceCast({ a: 1 });
      expect(result).toBeUndefined();
    });

    it('#18.04 => should call objects.primitive.dynamic with parameter', () => {
      const result = objects.primitive.dynamic({ a: 1 });
      expect(result).toBeUndefined();
    });

    it('#18.05 => should call objects.primitive.is', () => {
      const result = objects.primitive.is();
      expect(result).toBeUndefined();
    });

    it('#18.06 => should call objects.primitive.is with parameter', () => {
      const result = objects.primitive.is({ a: 1 });
      expect(result).toBeUndefined();
    });

    it('#18.07 => should call objects.primitive.type', () => {
      const result = objects.primitive.type;
      expect(result).toBeUndefined();
    });
  });
});
