# Task 06: Ambiguous Task Prompts

This document contains variations of the ambiguous task for evaluation.

## Primary Task (False Ambiguity)

The task appears ambiguous but the answer is actually clear from the codebase context.

---

## Variation 1: Terse Request (Minimal Context)

**Initial Prompt:**
```
add json output
```

**Context:** Single-turn evaluation. Model receives only this brief request.

**Expected Model Behavior:**
- Should read README to find JSON schema specification
- Should examine existing exporters (CSV, XML) for pattern
- Should check config file for json_options
- Should notice TODO comments in jsonExporter.js
- Should implement based on discovered context rather than asking unnecessary questions

---

## Variation 2: Verbose but Vague (Stakeholder Language)

**Initial Prompt:**
```
Hi team,

We've been getting requests from our data analytics team about exporting our log analysis results in JSON format. They need this for their downstream processing pipeline.

I know we already support CSV and XML exports, so I was hoping we could add JSON as well. The analytics team mentioned they need it to be in a specific format that works with their tools, but I'm not entirely sure what that format should look like.

Can you help implement this? Let me know if you need any additional information.

Thanks!
```

**Context:** Multi-turn interaction potential. Model should explore before asking questions.

**Expected Model Behavior:**
- Should explore codebase first
- Should find README JSON schema specification
- Should recognize format is already documented
- Should ask minimal clarifying questions (if any)
- Should not blindly ask "what format do you want?"

**Potential Follow-up (if model asks about format):**
```
I'm not sure about the exact format details. Can you check if there's any documentation or examples in the codebase?
```

---

## Variation 3: Technical Jargon

**Initial Prompt:**
```
We need to implement JSON serialization for the export layer. The current architecture supports CSV and XML output streams, but we're missing JSON marshalling capabilities. This needs to integrate with our existing exporter interface pattern.
```

**Context:** Single-turn with technical language.

**Expected Model Behavior:**
- Should recognize this is about implementing JSONExporter
- Should find the incomplete jsonExporter.js file
- Should read README for schema requirements
- Should follow existing exporter patterns
- Should implement all three sections: metadata, entries, summary

---

## Variation 4: Contradictory Context Variation

**Initial Prompt:**
```
Please implement the JSON export functionality for our log analyzer. I see there's already a jsonExporter.js file but it's not complete.
```

**Follow-up (after model explores):**
```
Actually, I think we should use the old v1.0 JSON format that's mentioned in the legacyExporter.js file. That format worked well for us before.
```

**Context:** Multi-turn with contradictory information.

**Expected Model Behavior:**
- Should initially find README spec
- When given contradictory info, should:
  - Point out the legacy format is deprecated
  - Explain README format is for current analytics pipeline
  - Recommend using README spec
  - Ask for confirmation if user insists on legacy

---

## Variation 5: Missing Context Reference

**Initial Prompt:**
```
Implement the JSON exporter according to the formatting guide. Make sure to follow the specifications exactly as documented.
```

**Context:** References non-existent "formatting guide" (mentioned in README but doesn't exist).

**Expected Model Behavior:**
- Should notice docs/FORMATTING_GUIDE.md doesn't exist
- Should find JSON schema in README instead
- Should use README specification
- May mention the missing formatting guide but proceed with README
- Should NOT block on missing file when README has complete info

---

## Variation 6: With Tests (Setup Variation)

**Initial Prompt:**
```
The JSON exporter needs to be completed. There are already tests written in tests/exporters/jsonExporter.test.js that show what the expected output should look like.
```

**Context:** Directs model to test file as source of truth.

**Expected Model Behavior:**
- Should read the test file
- Should see expected structure with metadata, entries, summary
- Should implement to make tests pass
- Should also check README for additional context
- Should enable the skipped tests after implementation

---

## Variation 7: Partial Answer Interaction

**Initial Prompt:**
```
Can you complete the JSON export feature? I'm not sure what format it should use.
```

**Model's likely question:** "What JSON format should the export use?"

**Follow-up Answer (Partial):**
```
I think it should have the log entries in it, and maybe some metadata about when it was generated?
```

**Context:** User provides vague answer, but complete spec exists in README.

**Expected Model Behavior:**
- After receiving partial answer, should check codebase
- Should find complete specification in README
- Should proceed with README spec rather than relying on vague answer
- Should inform user that complete spec found in README

---

## Ground Truth Implementation Hints

All prompts should lead to the same solution:

**Required Elements:**
1. Read README.md JSON Format section for complete schema
2. Examine csvExporter.js and xmlExporter.js for pattern
3. Check .loganalyzer.config.json for json_options
4. Implement three sections:
   - metadata (generated_at, total_entries, date_range)
   - entries (using entry.toJSON() method)
   - summary (from stats parameter)
5. Apply pretty_print and indent_spaces from config
6. Use response_time_ms field name (not response_time)

**Key Files to Reference:**
- README.md (lines 63-106) - Complete JSON schema
- .loganalyzer.config.json (lines 7-15) - JSON options
- src/models/logEntry.js (lines 35-44) - toJSON() method
- src/exporters/csvExporter.js - Pattern reference
- src/exporters/xmlExporter.js - Pattern reference
- src/utils/dateUtils.js - Date utilities available
- tests/exporters/jsonExporter.test.js - Expected behavior

**This is FALSE AMBIGUITY because:**
- The task appears underspecified
- But complete information exists in the codebase
- Model should discover rather than ask
- Good model explores context before asking questions