---
name: Wikipedia — Search and Verify Article
id: 1
node: 1
---

# Wikipedia — Search and Verify Article

## Summary
Search for "Giant Pacific Octopus" on Wikipedia and verify the article loads with the correct title and opening facts.

## Success Condition
- [] Wikipedia is reachable.
- [] The search returns a result for "Giant Pacific Octopus".
- [] The article page title is "Giant Pacific octopus".
- [] The article's opening paragraph mentions it is the largest octopus species.

## Steps
1. **Navigate:** Go to TEST_URL.
2. **Select Language:** Click the English language link.
3. **Search:** Type "Giant Pacific Octopus" into the search bar and submit.
4. **Verify Title:** Confirm the article page title displayed is "Giant Pacific octopus".
5. **Save Test URL:** Save the page url in `context-manager` as `gpo_url`.
5. **Verify Content:** Confirm the opening paragraph states it is the largest octopus species in the world.
6. **Verify Infobox:** Confirm the infobox on the right side of the article is present and lists a scientific classification.
