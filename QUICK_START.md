# Quick Start Guide: Task 06 Evaluation

## 5-Minute Setup

### Step 1: Choose Your Prompt (30 seconds)

Pick one from `TASK_PROMPTS.md`:

**Easiest to evaluate:**
- Variation 1 (Terse): "add json output"
- Variation 6 (Test-directed): Points to test file

**Most interesting:**
- Variation 4 (Contradictory): Follow-up conflicts with README
- Variation 7 (Partial answer): Multi-turn with vague user responses

### Step 2: Present to Model (1 minute)

Give the model:
```
I have a Node.js log analysis CLI tool.
[Paste your chosen prompt from TASK_PROMPTS.md]
[Provide access to codebase/ directory]
```

### Step 3: Watch for These Key Behaviors (2 minutes)

✅ **Good signs:**
- Reads README.md
- Checks csvExporter.js or xmlExporter.js
- Examines .loganalyzer.config.json
- Looks at LogEntry.toJSON() method
- Says "I found the spec in README"

❌ **Bad signs:**
- Immediately asks "what JSON format?"
- Implements without checking README
- Only creates entries array
- Doesn't check existing exporters
- Treats as truly ambiguous

### Step 4: Score Using This Simple Rubric (2 minutes)

| Behavior | Points |
|----------|--------|
| Found README JSON spec | +3 |
| Checked config file | +2 |
| Examined CSV/XML exporters | +2 |
| Used LogEntry.toJSON() | +1 |
| Implemented all 3 sections | +2 |
| **Total** | **/10** |

**Subtract 2 points if:**
- Asked "what format?" before checking README
- Implemented wrong structure

## Fast Evaluation Script

### For Model A:

1. ✓ Did they find README.md spec? __ Yes / No
2. ✓ Did they check existing exporters? __ Yes / No
3. ✓ How many questions before implementing? __ #
4. ✓ Implementation complete (3 sections)? __ Yes / No
5. ✓ Overall impression: __ Excellent / Good / Fair / Poor

### For Model B:

1. ✓ Did they find README.md spec? __ Yes / No
2. ✓ Did they check existing exporters? __ Yes / No
3. ✓ How many questions before implementing? __ #
4. ✓ Implementation complete (3 sections)? __ Yes / No
5. ✓ Overall impression: __ Excellent / Good / Fair / Poor

### Winner: Model __ (A or B)

**Because:** (1-2 sentences about better exploration/fewer questions/more complete implementation)

## Common Scenarios

### Scenario 1: Model asks "What format?"

**If they ask BEFORE checking README:**
- Score: Fair to Poor
- They should explore first

**If they ask AFTER reading README:**
- Score: Good
- "I see the README spec - should I follow that?"
- Better to state assumption, but acceptable

### Scenario 2: Model implements partial solution

**Missing metadata or summary:**
- Check if they read README (has all 3 sections)
- If they read it but missed sections: Fair
- If they didn't read it: Poor

### Scenario 3: Both models succeed

**Compare on:**
1. Who found README faster?
2. Who asked fewer questions?
3. Whose code is cleaner?
4. Who explained assumptions better?

## One-Sentence Evaluation

Fill in the blank:

**Model A is better because:** _________________________________

**Model B is better because:** _________________________________

Examples:
- "Model A found the README spec without prompting, Model B asked first"
- "Both found README, but Model A's implementation was more complete"
- "Model B explored more systematically and cited sources clearly"

## Time Savers

**Don't need to:**
- Actually run the code
- Test every feature
- Read all 20+ files
- Check syntax in detail

**Do need to:**
- Verify they found README
- Check implementation has 3 sections
- Count how many questions before implementing
- Compare exploration processes

## Red Flags Checklist

Automatic point deductions:

- [ ] Asked format question without checking README (-2)
- [ ] Only implemented entries array, no metadata/summary (-2)
- [ ] Used response_time instead of response_time_ms (-1)
- [ ] Didn't check config options (-1)
- [ ] Didn't look at existing exporters (-1)

## 30-Second Decision Tree

```
Did Model find README spec?
├─ YES: Did they implement all 3 sections?
│  ├─ YES: Score 7-10 (Great!)
│  └─ NO: Score 5-7 (Missed details)
└─ NO: Did they ask questions?
   ├─ YES: Score 4-6 (Should explore first)
   └─ NO: Score 1-4 (Didn't explore at all)
```

## Ready to Submit?

Quick checklist:

- [ ] Chose a prompt variation
- [ ] Evaluated both models
- [ ] Checked if they found README
- [ ] Scored implementation completeness
- [ ] Wrote 1-2 sentence justification
- [ ] Feel confident in your choice

## Need More Detail?

- Full rubric: `EVALUATION_RUBRIC.md`
- Complete solution: `GROUND_TRUTH_SOLUTION.md`
- All prompt variations: `TASK_PROMPTS.md`
- Task strategy: `TASK_METADATA.md`

---

**Bottom Line:** False Ambiguity means info IS there. Best model finds README spec and implements confidently. Worst model asks many questions or implements incorrectly.