# Changelog

<br/>

All notable changes to this project will be documented in this file.

<br/>

<details>
<summary>

### **[0.4.2] --> 2025/08/05** => _10:20_

</summary>

- tests: **100%** _coverage_
- Upgrade deps
- Add type DeepRequiredLow, RequiredLow

</details>

<br/>

<details>
<summary>

### **[0.4.0] --> 2025/08/05** => _10:20_

</summary>

- tests(js): 100% coverage
- tests(ts): 100% coverage
- Upgrade deps
- Refinement of types
- Refinement of functions

</details>

<br/>

### **[0.3.1] --> 2025/07/22** => _20:50_

</summary>

- tests(js): 100% coverage
- tests(ts): 100% coverage
- Upgrade deps
- Improve transform module

</details>

<br/>

<details>
<summary>

### **[0.3.0] --> 2025/07/22** => _19:50_

</summary>

- tests(js): 100% coverage
- tests(ts): 100% coverage
- Upgrade deps
- Add transform module

</details>

<br/>

<details>
<summary> [0.2.6] - 2025/07/14 => 12:30</summary>

- tests(js): 100% coverage
- tests(ts): 100% coverage
- Upgrade deps

</details>

<br/>

<details>
<summary> [0.2.5] - 2025/07/08 => 16:00</summary>

- tests(js): 100% coverage
- tests(ts): 100% coverage
- Fix castings.commons.function

</details>

<br/>

<details>
<summary> [0.2.4] - 2025/07/08 => 12:00</summary>

### 📋 Functions added since the last commit

#### 🔧 New types and utilities (commons.types.ts)

- **TypeStrings** - New union type for JavaScript primitive types
- **KeyTypes** - Type to define objects with key type checking
- **KeyTypesFrom<T>** - Utility type to extract types from KeyTypes
- **Checker<T>** - Extended type for checker functions
- **Checker2<T>** - New type for strict type guard functions

#### 🏗️ Functions in objects (objects.ts)

- **checkEntries** - New helper function to check property types of an
  object
- **objects.hasKeys.typings** - New method to check keys AND their types
- **objects.hasKeys.all** - Method to check that the object has EXACTLY the
  specified keys
- **objects.hasKeys.all.typings** - Combination of all and typings for full
  strict checking

#### 🎭 Functions in types/objects (objects.ts)

- **objects.keyTypes** - New namespace for key types
- **objects.keyTypes.from** - Type function to extract types from KeyTypes
- **objects.hasKeys.typings** (type version) - Type version of the check
  with types
- **objects.hasKeys.all** (type version) - Type version of the full check

#### 🔄 Modified functions (improvements)

- **commons.function.checker.is** - Improved return type (Checker2<T>)
- **commons.function.checker.byType.forceCast** - Improved types
- **arrays.tupleOf.number.is** - Updated to use Checker2<T>
- **arrays.tupleOf.is** - Updated to use Checker2<T>
- **objects.hasKeys** - Complete refactor for better type safety

#### 🎯 Removed functions

- **objects.hasAllKeys** - Replaced by objects.hasKeys.all

#### 📊 Summary of changes

- ✅ 13 new functions/types added
- 🔄 6 functions improved
- ❌ 1 function removed (replaced)
- 📈 Test coverage: 100%

</details>

<br/>

<details>
<summary> [0.2.3] - 2025/07/08 => 12:00</summary>

- Better function.checker
- tests(cov): 100%
</details>

<br/>

<details>
<summary> [0.2.2] - 2025/07/08 => 11:11</summary>

- Better function.checker
- tests(cov): 100%
</details>

<br/>

<details>
<summary> [0.2.1] - 2025/07/08 => 11:11</summary>

- Better function.checker
- tests(cov): 100%
</details>

<br/>

<details>
<summary> [0.2.0] - 2025/07/07 => 23:40</summary>

- Fix PrimitiveObject, not longer use of TrueObject
- tests(cov): 100%
</details>

<br/>

<details>
<summary> [0.1.9] - 2025/07/07 => 22:40</summary>

- Fix PrimitiveObject
- tests(cov): 100%
</details>

<br/>

<details>
<summary> [0.1.8] - 2025/07/07 => 18:15</summary>

- Add TrueObject type
- tests(cov): 100%
</details>

<br/>

<details>
<summary> [0.1.7] - 2025/07/07 => 04:55</summary>

- Better docs
</details>

<br/>

<details>
<summary> [0.1.6] - 2025/07/07 => 04:50</summary>

- Functions typings
- Functions castings
- tests(cov): 100%
</details>

<br/>

<details>
<summary> [0.1.5] - 2025/02/18 => 16:00</summary>

### Added

- Add type TrueObject
- Add function for FlatMapByKeys
</details>

<br/>

<details>
<summary> [0.1.4] - 2025/02/17 => 16:30</summary>

### Added

- Types for array manipulation
- Types for object manipulation
- Types for promises
- Types for strings
- Types for unions
- Types for use cases
- Types for domain
- Types for nullable values

### Changed

- N/A

### Deprecated

- N/A

### Removed

- N/A

### Fixed

- N/A
</details>

<br/>

## License

MIT

<br/>

## Auteur

chlbri (bri_lvi@icloud.com)

[My github](https://github.com/chlbri?tab=repositories)

[<svg width="98" height="96" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" fill="#24292f"/></svg>](https://github.com/chlbri?tab=repositories)

<br/>

## Liens

- [Documentation](https://github.com/chlbri/types)
