# Material baseline for the added components

This implementation uses the library's existing standard Material 3 color, typography and shape system. Compact navigation rail (80px), standard small/center-aligned/medium/large app bars, modal/standard sheets and a native scrolling carousel are the supported baseline. It does not claim complete Material 3 Expressive parity. Choosing a project-wide Expressive revision remains a separate product decision.

Official references:

- [Bottom sheets](https://m3.material.io/components/bottom-sheets/overview)
- [Carousel](https://m3.material.io/components/carousel/overview)
- [Navigation rail](https://m3.material.io/components/navigation-rail/overview)
- [Side sheets](https://m3.material.io/components/side-sheets/overview)
- [App bars](https://m3.material.io/components/app-bars/overview)

The official site changes over time. Baseline scope is recorded here so later Expressive examples do not silently expand the API contract. Expanded Expressive rails, morphing carousel masks, automatic breakpoint swaps between navigation patterns and app-specific routing are outside these components. The carousel implements the uncontained M3 layout with a vertical Show all alternative. Multi-browse, hero and full-screen are other standard M3 layouts and are not implemented; they are not Expressive-only features.

Sheet owners must provide an accessible name and an explicit way to close the sheet when dismissal is disabled. Destination/action labels and routing remain the application's responsibility. See the component pages for the exact supported properties and events.

The current official app-bar guidelines no longer recommend the baseline medium/large variants. `MdTopAppBar` deliberately exposes those legacy baseline variants; current medium-flexible, large-flexible and search app bars remain unsupported. The rail similarly exposes the 80px baseline rail rather than the current expanded/collapsed Expressive system. See the [live guideline verification](../testing/m3-guideline-verification.md) for checked behavior and remaining scope.
