# Smart Context Discovery

Quick Spec Flow automatically discovers and uses:

## 1. Existing Documentation

- Product briefs (if they exist)
- Research documents
- `document-project` output (brownfield codebase map)

## 2. Project Stack

- **Node.js:** package.json → frameworks, dependencies, scripts, test framework
- **Python:** requirements.txt, pyproject.toml → packages, tools
- **Ruby:** Gemfile → gems and versions
- **Java:** pom.xml, build.gradle → Maven/Gradle dependencies
- **Go:** go.mod → modules
- **Rust:** Cargo.toml → crates
- **PHP:** composer.json → packages

## 3. Brownfield Code Patterns

- Directory structure and organization
- Existing code patterns (class-based, functional, MVC)
- Naming conventions (camelCase, snake_case, PascalCase)
- Test frameworks and patterns
- Code style (semicolons, quotes, indentation)
- Linter/formatter configs
- Error handling patterns
- Logging conventions
- Documentation style

## 4. Convention Confirmation

**IMPORTANT:** Quick Spec Flow detects your conventions and **asks for confirmation**:

```
I've detected these conventions in your codebase:

Code Style:
- ESLint with Airbnb config
- Prettier with single quotes, 2-space indent
- No semicolons

Test Patterns:
- Jest test framework
- .test.js file naming
- expect() assertion style

Should I follow these existing conventions? (yes/no)
```

**You decide:** Conform to existing patterns or establish new standards!

---
