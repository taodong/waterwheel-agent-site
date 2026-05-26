---
name: Wikipedia — Follow a Link and Verify Related Article
id: 2
node: 2
required: 1
---

# Wikipedia — Follow a Link and Verify Related Article

## Summary
From the Giant Pacific Octopus article, follow the in-article link to "cephalopod" and verify the related article loads correctly with expected content.

## Success Condition
- [] The "cephalopod" link is present in the Giant Pacific Octopus article.
- [] Clicking the link navigates to the Cephalopod article.
- [] The Cephalopod article contains a "Taxonomy" section.
- [] The article mentions octopuses as members of the subclass Coleoidea.

## Steps
1. **Open Giant Pacific Octopus Page:** Open Giant Pacific Octopus page using url `context.gpo_url`
2. **Locate Link:** Find the first in-article hyperlink to "cephalopod".
3. **Follow Link:** Click the "cephalopod" link.
4. **Verify Navigation:** Confirm the browser has navigated to the Cephalopod article on Wikipedia.
5. **Verify Section:** Confirm a "Taxonomy" section is present on the Cephalopod article.
6. **Verify Content:** Confirm the article mentions octopuses as members of the subclass Coleoidea.
7. **Verify Footer:** Confirm the article has a "References" section at the bottom of the page.
