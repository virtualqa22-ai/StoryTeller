# Rationale

Running the entire test suite on every commit wastes time and resources. Smart test selection provides fast feedback (smoke tests in minutes, full regression in hours) while maintaining confidence. The "32+ ways of selective testing" philosophy balances speed with coverage: quick loops for developers, comprehensive validation before deployment. Poorly documented selection leads to confusion about when tests run and why.
