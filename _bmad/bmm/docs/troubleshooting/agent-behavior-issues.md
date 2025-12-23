# Agent Behavior Issues

## Problem: Agent provides vague or generic responses

**Symptoms:**

- "Use appropriate framework"
- "Follow best practices"
- Generic advice without specifics

**Solution:**

1. **Provide more context** - Be specific in your description:
   - "Add OAuth using passport.js to Express server"
   - Not: "Add authentication"
2. **For brownfield**:
   - Ensure document-project was run
   - Agent needs codebase context for specific advice
3. **Reference existing docs**:
   - "Based on the existing auth system in UserService..."
4. **Start fresh chat** - Context overload can cause generic responses

## Problem: Agent hallucinating or making up information

**Symptoms:**

- References files that don't exist
- Suggests APIs that aren't in your stack
- Creates imaginary requirements

**Solution:**

1. **Use fresh chat** - Context overflow main cause of hallucinations
2. **Provide concrete constraints**:
   - "We use Express 4.18.2, not Next.js"
   - "Our database is PostgreSQL, not MongoDB"
3. **For brownfield**:
   - Document-project provides factual grounding
   - Agent sees actual code, not assumptions
4. **Correct immediately**:
   - "No, we don't have UserService, we have AuthenticationModule"

## Problem: Agent won't follow instructions

**Symptoms:**

- Ignores specific requests
- Does something different than asked
- Doesn't respect constraints

**Solution:**

1. **Be more explicit** - Agents respond to clear, specific instructions:
   - "Use EXACTLY these three steps..."
   - "Do NOT include database migrations in this story"
2. **Check agent capabilities** - Agent might not have access to requested workflow
3. **Try different phrasing** - Rephrase request to be more direct
4. **Use menu system** - Numbers are clearer than text commands

---
