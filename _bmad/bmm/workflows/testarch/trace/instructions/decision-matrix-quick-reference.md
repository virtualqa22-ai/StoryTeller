# Decision Matrix (Quick Reference)

| Scenario        | P0 Cov            | P1 Cov | Overall Cov | P0 Pass | P1 Pass | Overall Pass | NFRs | Decision     |
| --------------- | ----------------- | ------ | ----------- | ------- | ------- | ------------ | ---- | ------------ |
| All green       | 100%              | ≥90%   | ≥80%        | 100%    | ≥95%    | ≥90%         | Pass | **PASS**     |
| Minor gap       | 100%              | 80-89% | ≥80%        | 100%    | 90-94%  | 85-89%       | Pass | **CONCERNS** |
| Missing P0      | <100%             | -      | -           | -       | -       | -            | -    | **FAIL**     |
| P0 test fail    | 100%              | -      | -           | <100%   | -       | -            | -    | **FAIL**     |
| P1 gap          | 100%              | <80%   | -           | 100%    | -       | -            | -    | **FAIL**     |
| NFR fail        | 100%              | ≥90%   | ≥80%        | 100%    | ≥95%    | ≥90%         | Fail | **FAIL**     |
| Security issue  | -                 | -      | -           | -       | -       | -            | Yes  | **FAIL**     |
| Business waiver | [FAIL conditions] | -      | -           | -       | -       | -            | -    | **WAIVED**   |

---
