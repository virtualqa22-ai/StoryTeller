# Enterprise Configuration with Git Submodules

## The Challenge

**Problem:** Teams customize BMad (agents, workflows, configs) but don't want personal tooling in main repo.

**Anti-pattern:** Adding `_bmad/` to `.gitignore` breaks IDE tools, submodule management.

## The Solution: Git Submodules

**Benefits:**

- BMad exists in project but tracked separately
- Each developer controls their own BMad version/config
- Optional team config sharing via submodule repo
- IDE tools maintain proper context

## Setup (New Projects)

**1. Create optional team config repo:**

```bash
git init bmm-config
cd bmm-config
npx bmad-method install
# Customize for team standards
git commit -m "Team BMM config"
git push origin main
```

**2. Add submodule to project:**

```bash
cd /path/to/your-project
git submodule add https://github.com/your-org/bmm-config.git bmad
git commit -m "Add BMM as submodule"
```

**3. Team members initialize:**

```bash
git clone https://github.com/your-org/your-project.git
cd your-project
git submodule update --init --recursive
# Make personal customizations in _bmad/
```

## Daily Workflow

**Work in main project:**

```bash
cd /path/to/your-project
# BMad available at ./_bmad/, load agents normally
```

**Update personal config:**

```bash
cd bmad
# Make changes, commit locally, don't push unless sharing
```

**Update to latest team config:**

```bash
cd bmad
git pull origin main
```

## Configuration Strategies

**Option 1: Fully Personal** - No submodule, each dev installs independently, use `.gitignore`

**Option 2: Team Baseline + Personal** - Submodule has team standards, devs add personal customizations locally

**Option 3: Full Team Sharing** - All configs in submodule, team collaborates on improvements

---
