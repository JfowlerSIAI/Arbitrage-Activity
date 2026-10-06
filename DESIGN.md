# Arbitrage — source-based design brief

Proposal 15. Source reviewed 2026-09-30: [Program Descriptions](http://daviddfriedman.com/Living_Paper/Program_Descriptions/program_descriptions.htm) and [Living Paper index](http://daviddfriedman.com/Living_Paper/living_paper.htm).

**This records the source description, not the selected browser mechanics.** Eric selected and implemented v1 on 2026-10-02; [SPECIFICATION.md](SPECIFICATION.md) records the adaptations and invites David's review. The activity is frozen for review.

## Learning objective

Discover how inconsistent exchange rates create profit opportunities and how trading can eliminate them.

## Confirmed mechanics in the source

- The main described turn-based version has five goods and ten pairwise exchange rates. A player begins with a stock of one good and plans trades using holdings available at the start of the turn.
- Units acquired this turn cannot be retraded until the next turn in that version. Simultaneous trades funded from existing inventories can still form a profitable arbitrage loop.
- Show holdings before and after planned trades and the applicable exchange rate. Final holdings are converted into the starting good; the described score is final units divided by starting units.
- Price-model version 1 treats the player as small: trading does not change prices, which evolve randomly with a tendency toward consistency.
- Price-model version 2 uses pairwise excess-supply relationships: both trade size and cumulative trades affect the prices received and reduce later arbitrage opportunities.
- The source distinguishes arbitrage from directional speculation and describes single-player and consecutive multiplayer forms.

## Optional variants and adaptation notes

- Select a price-model version before implementation; do not combine their assumptions silently.
- Risk-managed funds, currencies rather than goods, real-time play, networked play, and alternative one-loop or one-trade rules are later variants.
- Some equations are embedded as images in the source HTML. Inspect those images or confirm formulas with David before translating version 2.

## Source choices and David's review

Eric selected fixed static quotes and immediate loops, starting with 100 grain. The browser specification resolves v1 mechanics and numeric limits; the questions below remain useful for David's review and future variants rather than blockers to this verified prototype.

1. Should the first implementation teach pure arbitrage with fixed quotes or market impact with endogenous quotes?
2. Which turn rules, quote timing, market clearing, and end-game conversion are intended?
3. What initial inventory permits students to distinguish simultaneous arbitrage from risky multistep speculation?
4. Which legacy or revised equations does David prefer?

## Source and accessibility constraints

No dedicated Arbitrage archive is linked on the Living Paper index.

Write fresh browser code by default; follow source-use notes (in the authoring collection) before any reuse. Keep keyboard and single-pointer alternatives for drawing/dragging, labeled numeric data and text/table equivalents for visual output, and verified focus/reflow behavior. These adaptation requirements do not imply that the original desktop UI meets current accessibility standards.

## Next task

Prepare the frozen prototype in David's chosen review format when Eric supplies instructions. Keep Hansa last in the initial seven-activity queue.

The selected specification resolves model choices, student actions/feedback, input limits/failure cases, accessibility design, and mathematical/browser acceptance scenarios. Source facts above remain distinct from Eric's adaptations. Full release audit and classroom evaluation remain pending.
