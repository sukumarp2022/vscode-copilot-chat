# Enhance Prompt Feature

The Enhance Prompt feature helps users improve their prompts to get better responses from GitHub Copilot Chat.

## How to Use

### Method 1: Slash Command (Recommended)
1. Open GitHub Copilot Chat panel
2. Type `@workspace /enhancePrompt` followed by your prompt
3. Example: `@workspace /enhancePrompt make a function`
4. Copilot will provide an enhanced version of your prompt

### Method 2: Command Palette
1. Open Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`)
2. Search for "GitHub Copilot: Enhance Prompt"
3. Run the command
4. This will open chat with prompt enhancement guidance

## Example

**Original Prompt:**
```
make a function
```

**Enhanced Prompt:**
```
Create a well-documented JavaScript function that:
- Takes meaningful parameter names with proper types
- Includes JSDoc comments explaining purpose, parameters, and return value
- Handles edge cases appropriately
- Follows modern ES6+ syntax
- Returns a specific data type

Please specify:
- What the function should do
- Expected input parameters and types
- Desired return value
- Any specific requirements or constraints

Example: "Create a function that validates email addresses, takes a string parameter, and returns boolean"
```

## Benefits

1. **More Specific**: Transforms vague requests into detailed specifications
2. **Better Context**: Adds relevant constraints and requirements
3. **Clearer Intent**: Helps AI understand exactly what you want
4. **Better Results**: Enhanced prompts lead to more accurate and useful responses

## Implementation Details

The feature is implemented as a VS Code extension intent that:
- Analyzes user prompts for clarity and specificity
- Provides structured enhancement suggestions
- Follows prompt engineering best practices
- Integrates seamlessly with the existing chat interface

## Tips for Better Prompts

Based on the enhancement logic, here are key elements of effective prompts:

1. **Be Specific**: Include exact requirements rather than general requests
2. **Provide Context**: Mention the programming language, framework, or environment
3. **Include Examples**: Show what the desired output should look like
4. **Set Constraints**: Specify any limitations or requirements
5. **Define Success**: Explain how you'll know the result is correct