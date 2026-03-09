# Changelog

## Unreleased

### Breaking Changes

* tokens baseline upgraded from Material 3 `v0.152` to `v0.192` (`src/styles/tokens`)
* component style token contracts were migrated to align with `v0.192` token maps

## [0.9.2](https://github.com/mylmz10/vue-material-3/compare/v0.9.1...v0.9.2) (2026-03-09)


### Bug Fixes

* **chips:** normalize chip set container box sizing ([18a76f9](https://github.com/mylmz10/vue-material-3/commit/18a76f916c231d3889e523db790f55a9be14c35f))
* **chips:** normalize chip set container box sizing ([a93a8d1](https://github.com/mylmz10/vue-material-3/commit/a93a8d114e711144f5d6edbc2a85ffddd8532f95))

## [0.9.1](https://github.com/mylmz10/vue-material-3/compare/v0.9.0...v0.9.1) (2026-03-09)


### Bug Fixes

* **ci:** keep release tags in vX.Y.Z format ([f87edfc](https://github.com/mylmz10/vue-material-3/commit/f87edfc92d705a9397632fa80fbcafd048fb019b))
* **ci:** remove release tag name prefix ([6ffd9de](https://github.com/mylmz10/vue-material-3/commit/6ffd9de30d24d39dca98bb22ffc8f9a3b439cda7))

## [0.9.0](https://github.com/mylmz10/vue-material-3/compare/vue-material-3-v0.8.3...vue-material-3-v0.9.0) (2026-03-09)


### Features

* add calendar transition ([0afc930](https://github.com/mylmz10/vue-material-3/commit/0afc9305b70fd63d5493cd00d6a2ba0de852def3))
* avatar implementation ([a3f8e60](https://github.com/mylmz10/vue-material-3/commit/a3f8e609bba89b138906ea3be4008c1f9377cbf3))
* badge, divider, linear progress, circular progress implementation ([2fbbff6](https://github.com/mylmz10/vue-material-3/commit/2fbbff69fdade68c0311ff61dd1e2564f7a8f12c))
* button background & border changes ([ba695d3](https://github.com/mylmz10/vue-material-3/commit/ba695d309124936288effcc71414b43d64e1b599))
* **button:** add filled tonal button and fix ripple/nav-tab states ([83de3b5](https://github.com/mylmz10/vue-material-3/commit/83de3b504f9d731776e9a28545ae52764460cb4d))
* **button:** add filled tonal button component and story ([9578741](https://github.com/mylmz10/vue-material-3/commit/957874166a38a4479a8b09604e4c958501c72197))
* **button:** add link and soft-disabled parity API ([ea50a77](https://github.com/mylmz10/vue-material-3/commit/ea50a7736da52ed038319c4e4424396a067d9770))
* **button:** W1-02 button API parity ([5f50817](https://github.com/mylmz10/vue-material-3/commit/5f5081736111a59467c296b8bc8d079018b59f9a))
* card base implementation ([84cf9e6](https://github.com/mylmz10/vue-material-3/commit/84cf9e68d1eb821ef8e242b6faddf61d4fc08696))
* checkbox implementation ([69b014c](https://github.com/mylmz10/vue-material-3/commit/69b014c61e86daaa668eecbd580ab83171473f9a))
* checkbox/radio/switch form parity (W2-05) ([6f6206f](https://github.com/mylmz10/vue-material-3/commit/6f6206fcaf8b7823f0fc82b02be6e8095a56ae0e))
* chip and chipset updates ([48c4269](https://github.com/mylmz10/vue-material-3/commit/48c4269a46afba33007e408d0d4f1889947f15d5))
* **chips:** consolidate chip variants and chip set ([ae199c9](https://github.com/mylmz10/vue-material-3/commit/ae199c92561992b5b084bdcd1a2cfdf4b71ba8ca))
* **ci:** add transactional rollback and reconcile flow for releases ([e5207f9](https://github.com/mylmz10/vue-material-3/commit/e5207f951c07f6fd645e932081de8a44676ff771))
* consolidate chips under MdChip core ([b7182b7](https://github.com/mylmz10/vue-material-3/commit/b7182b7afb59b1e198d5a648c74eb1c65d62d0d4))
* **controls:** complete W2-05 form parity for checkbox/radio/switch ([a8bba33](https://github.com/mylmz10/vue-material-3/commit/a8bba335331989fbb8ed8458c1ae471a175fb380))
* dialog implementation ([eea26df](https://github.com/mylmz10/vue-material-3/commit/eea26df871ab4f848ed8a6b143139501bb89958b))
* disabled prop implementation to buttons ([ff556e8](https://github.com/mylmz10/vue-material-3/commit/ff556e8104b3463063d2528d372f0478208a735a))
* error prop implementation to filled and outlined fields ([d591ec9](https://github.com/mylmz10/vue-material-3/commit/d591ec93bdb81ec889bc64a6a3ee41f30907672b))
* Fab component implementation ([1373a56](https://github.com/mylmz10/vue-material-3/commit/1373a56fcce7e1c38cb68d6516bcceaffb71e45c))
* Fab component updates ([e5410e0](https://github.com/mylmz10/vue-material-3/commit/e5410e0e1696dafeec378fe958577ee55e9c0415))
* **fab:** add branded fab component and stories ([789b1f5](https://github.com/mylmz10/vue-material-3/commit/789b1f5021a7098363bc7ec4190136be1a79fe74))
* **fab:** add branded fab component and stories ([4dcaa3b](https://github.com/mylmz10/vue-material-3/commit/4dcaa3b33149cfdf61157abe94aab4abf6073048))
* FabExtended implementation ([a76eecf](https://github.com/mylmz10/vue-material-3/commit/a76eecfda65d9818b310c33122ee8f67ff722fd5))
* Field, OutlinedField, TextField, OutlinedTextField implementation ([e65daaf](https://github.com/mylmz10/vue-material-3/commit/e65daaf9fc2934267da7bac244b8346ab35aad6c))
* filled text field implementation ([b9ebbcb](https://github.com/mylmz10/vue-material-3/commit/b9ebbcb75ebd64482c9156584b6c7e6046100750))
* Icon implementation ([81df062](https://github.com/mylmz10/vue-material-3/commit/81df06261e8949ba6d6d8320da361caf59facf41))
* icon-button implementation ([5293384](https://github.com/mylmz10/vue-material-3/commit/52933847aa5962fcf565a9f178fb8eda2dce2c36))
* **icon-button:** add toggle and link parity behavior ([4f3857f](https://github.com/mylmz10/vue-material-3/commit/4f3857f9275b2ff6bf38edf92b802ab3c55429c8))
* **icon-button:** implement W1-03 toggle/link parity ([02206b3](https://github.com/mylmz10/vue-material-3/commit/02206b31936e2e1a5ee14ef2edc02e7f56137985))
* implement MdFilledSelect ([54373a4](https://github.com/mylmz10/vue-material-3/commit/54373a4b5ceca9e1894415baed779ced50577e2f))
* implement MdOutlinedSelect ([25621ab](https://github.com/mylmz10/vue-material-3/commit/25621ab7d0858f4abbe0f202bb31859ba0f3beff))
* implementation of basic date picker ([97b9f77](https://github.com/mylmz10/vue-material-3/commit/97b9f77af1ca0c105949debbcf3dda497d37adbc))
* implementation of outlined autocomplete ([cade1da](https://github.com/mylmz10/vue-material-3/commit/cade1da69f430fe22fab4e0b286309e65a70446d))
* list implementation & token updates ([9097153](https://github.com/mylmz10/vue-material-3/commit/909715391a25c1d1801c64f07d387b21341fd09d))
* list implementation & token updates ([15a3316](https://github.com/mylmz10/vue-material-3/commit/15a33169ac62e6465457ead2bfeff139f2b1b064))
* material tokens update ([661af9b](https://github.com/mylmz10/vue-material-3/commit/661af9b77c9ed417c3391afabef565a013ee9bd7))
* material tokens update ([3e9bf90](https://github.com/mylmz10/vue-material-3/commit/3e9bf90ff4c0e51913152a07f7c02a24f27bee9d))
* MdRipple implementation ([0f49406](https://github.com/mylmz10/vue-material-3/commit/0f49406da17aaf34c94508a0cb722821b7c9d6fa))
* MdSlider implementation ([7eb5d17](https://github.com/mylmz10/vue-material-3/commit/7eb5d175a79ba56d383c31201ad5de58d5690628))
* MdSnackbar & MdFilledAutoComplete implementation and some fixes ([111f5bc](https://github.com/mylmz10/vue-material-3/commit/111f5bcd3a2fbe13d18c9e639fb6e6cde0fe77c9))
* menu implementation ([741c6d8](https://github.com/mylmz10/vue-material-3/commit/741c6d8c592cbf7ed7fb36188e70fcd296a0edef))
* navigation-tab and navigation-bar implementation ([a1f0f21](https://github.com/mylmz10/vue-material-3/commit/a1f0f21c394991cacc525d83b1c188f407178087))
* NavigationDrawer and List implementation ([d680bc9](https://github.com/mylmz10/vue-material-3/commit/d680bc9b7d7ed807d8546313ca96ba8c463ce2a8))
* navigationdrawer updated ([9b7d70a](https://github.com/mylmz10/vue-material-3/commit/9b7d70a6e3e17d9286e2e19d90776c3af568dab7))
* OutlineButton and TextButton implementation ([955849d](https://github.com/mylmz10/vue-material-3/commit/955849d30c36ed7fa5fc09b01598d7371b7c721c))
* radio implementation ([fb98dc4](https://github.com/mylmz10/vue-material-3/commit/fb98dc4124223714a11fe7ee6048f6e38758d5c6))
* release-please implementation ([8adb2f3](https://github.com/mylmz10/vue-material-3/commit/8adb2f3c244f4f9937850d6df66e69d9b9efe8f1))
* **segmentedbutton:** segmentedButton and SegmentedButtonSet implementation ([c562e27](https://github.com/mylmz10/vue-material-3/commit/c562e278106a98029faa2c94ffd0b6bda7179415))
* select option component ([8429240](https://github.com/mylmz10/vue-material-3/commit/8429240f2da2556a8d89157510add3b39063cc58))
* **select:** add MdSelectOption component behavior ([79f0734](https://github.com/mylmz10/vue-material-3/commit/79f0734a58a5d335fb15f805c3e896897fe5ad57))
* **select:** add outlined select and shared option tokens ([8628ee2](https://github.com/mylmz10/vue-material-3/commit/8628ee2fda3b6cbc223f42c46aee63f97d0283f0))
* **select:** implement MdFilledSelect ([2f6fe66](https://github.com/mylmz10/vue-material-3/commit/2f6fe66575b00d58a6ce09cb0edc065515888b67))
* **select:** implement MdSelectOption ([1323fba](https://github.com/mylmz10/vue-material-3/commit/1323fba05d10a10c0e9b095deb47c7b2602c3d6c))
* slider range/ticks/labeled parity (W2-06) ([e31593c](https://github.com/mylmz10/vue-material-3/commit/e31593c1c6eaca4366ca111919c9106fa03d27fb))
* **slider:** implement W2-06 range ticks and labeled parity ([f078ada](https://github.com/mylmz10/vue-material-3/commit/f078ada2043e84ae208cec3341c8c229f6e05854))
* storybook update - checkbox, buttons ([3f236b7](https://github.com/mylmz10/vue-material-3/commit/3f236b7e9d9be3e4d1b1d6c446cd44077ea0d8c9))
* switch implementation ([36971da](https://github.com/mylmz10/vue-material-3/commit/36971da60ed841d9c4b96caa929098b5229ef22c))
* **text-field:** align label/prefix layout with material behavior ([97f495c](https://github.com/mylmz10/vue-material-3/commit/97f495c19de06e03a79fcf9dd204c007fdf7f48e))
* **text-field:** complete W2-04 text field API/layout parity ([46dbd40](https://github.com/mylmz10/vue-material-3/commit/46dbd4040fc5fa241dcbe9436c001c81d083ebcb))
* **tokens:** upgrade Material tokens to v0_192 and migrate components ([a32a9ff](https://github.com/mylmz10/vue-material-3/commit/a32a9ff7e4aa35a03cb18232ecf608d952f606ef))
* updates for autocomplete ([cf7c8bd](https://github.com/mylmz10/vue-material-3/commit/cf7c8bdad7cc465450401ca0d8be4a49d95ba52b))


### Bug Fixes

* badge and list updates, readme updates ([4aa823f](https://github.com/mylmz10/vue-material-3/commit/4aa823f1a2b673b25d421092ae4c2c4e327d7063))
* badge value fix ([0825b06](https://github.com/mylmz10/vue-material-3/commit/0825b06803810a87fc5eee661b05069548092f39))
* bug fixes and storybook updates ([223e87e](https://github.com/mylmz10/vue-material-3/commit/223e87eb9e931958f95851404228c29f66f09849))
* card updates ([7058444](https://github.com/mylmz10/vue-material-3/commit/705844421653dcede042f1f465895e8c674fa40f))
* checkbox model change ([035e1b9](https://github.com/mylmz10/vue-material-3/commit/035e1b90dbef9b59ee9608bb2e013181b43e5e13))
* **chips:** keep active index during keyboard navigation ([1da68ef](https://github.com/mylmz10/vue-material-3/commit/1da68ef983347530c228216347aa1ad6df37a83c))
* **ci:** align npm trusted publishing prerequisites ([b169d5a](https://github.com/mylmz10/vue-material-3/commit/b169d5a2b642e5414a1f435807e8668d369fa408))
* **ci:** align npm trusted publishing prerequisites ([389b0ba](https://github.com/mylmz10/vue-material-3/commit/389b0ba4b59e8aa21d4130f8a71bf6b2aee0713b))
* **ci:** disable token auth path for npm OIDC publish ([c3c6fa5](https://github.com/mylmz10/vue-material-3/commit/c3c6fa52c828659a99b552b382f1c12ee3a2c11e))
* **ci:** force npm trusted publishing without auth token ([74a6485](https://github.com/mylmz10/vue-material-3/commit/74a6485dd2caa704aba7f735406f046bdc2fd5b7))
* **ci:** harden release rollback for merge commits ([b31203b](https://github.com/mylmz10/vue-material-3/commit/b31203b6027e990454ff87f0b77dc32624a79dc1))
* **ci:** install deps before npm publish ([e318348](https://github.com/mylmz10/vue-material-3/commit/e3183480dac7d8a364edf966436b49bcc5f581de))
* **ci:** repair release and sync workflows on master ([7fad0ab](https://github.com/mylmz10/vue-material-3/commit/7fad0ab5469a51c967b4979128967cd01219f44f))
* **ci:** repair release-please and master-&gt;develop sync workflows ([05352fe](https://github.com/mylmz10/vue-material-3/commit/05352fe71ded1c83caf7527cc2202a6bc5bd4721))
* **ci:** resolve husky not found during npm publish ([3b27358](https://github.com/mylmz10/vue-material-3/commit/3b27358202f5f1f97529c01222a7957b972aec27))
* **ci:** stabilize release baseline and avoid noisy sync PRs ([3378b48](https://github.com/mylmz10/vue-material-3/commit/3378b48c5d13b465e674d186e1d2e690842fdcc0))
* **ci:** stabilize release baseline and gate master-&gt;develop sync PRs ([6c0873d](https://github.com/mylmz10/vue-material-3/commit/6c0873d66824d46cb1537f6d2e20f651fb7c6d6e))
* **ci:** use rollback PR flow for protected master ([09c8d73](https://github.com/mylmz10/vue-material-3/commit/09c8d734ff6591f0ecaa22356f2dc7629ff9403c))
* **ci:** use rollback PR flow for protected master ([5831797](https://github.com/mylmz10/vue-material-3/commit/583179720cbc4b49bb7d5ba94f601315fdafdb5c))
* defineProps removed from the components ([9224b13](https://github.com/mylmz10/vue-material-3/commit/9224b1375a80ecdda989ca3161229a03610263a8))
* end slot width change ([f7cd271](https://github.com/mylmz10/vue-material-3/commit/f7cd27138559a210f6846ac2f4ed3a97cbe80067))
* **radio:** restore story selection and outline color ([f69b373](https://github.com/mylmz10/vue-material-3/commit/f69b3730609ee2058a3bce1d2faa9989791bd6bf))
* ripple update ([4b681ed](https://github.com/mylmz10/vue-material-3/commit/4b681ed399a7aa33b37047f4563546118fe0601d))
* ripple updates ([c257b82](https://github.com/mylmz10/vue-material-3/commit/c257b825cf29d24c910415585009a69f0e3af62e))
* **select:** add explicit zero gap on filled-select trigger ([1df43ac](https://github.com/mylmz10/vue-material-3/commit/1df43acb49ad170070468bec19241d1cdea4e0cd))
* **select:** add explicit zero gap on filled-select trigger ([c0ca041](https://github.com/mylmz10/vue-material-3/commit/c0ca041ed69b3a3d730576240e2da327aed4cc6e))
* **select:** add explicit zero gap on outlined-select trigger ([0c90413](https://github.com/mylmz10/vue-material-3/commit/0c904138d55c4e6156fe0fd4eb4873b848d812c9))
* **select:** add explicit zero gap on outlined-select trigger ([c7bd43d](https://github.com/mylmz10/vue-material-3/commit/c7bd43d825755553cc6ad005880cc5fdc169b80d))
* some fixes ([90d0c1f](https://github.com/mylmz10/vue-material-3/commit/90d0c1fc6e413dd87b52da06e33da127036e34ae))
* **ui:** button ripple layering and navigation tab indicator ([ca82447](https://github.com/mylmz10/vue-material-3/commit/ca82447a8b76650f0a9d9341930623d8c5094362))
* value set of OutlinedTextField ([80109d8](https://github.com/mylmz10/vue-material-3/commit/80109d8013f781a62eff42ff71eda192dd9d55d4))

## [0.8.3](https://github.com/mylmz10/vue-material-3/compare/v0.8.2...v0.8.3) (2026-03-08)


### Bug Fixes

* **ci:** align npm trusted publishing prerequisites ([b169d5a](https://github.com/mylmz10/vue-material-3/commit/b169d5a2b642e5414a1f435807e8668d369fa408))
* **ci:** align npm trusted publishing prerequisites ([389b0ba](https://github.com/mylmz10/vue-material-3/commit/389b0ba4b59e8aa21d4130f8a71bf6b2aee0713b))

## [0.8.2](https://github.com/mylmz10/vue-material-3/compare/v0.8.1...v0.8.2) (2026-03-08)


### Bug Fixes

* **ci:** disable token auth path for npm OIDC publish ([c3c6fa5](https://github.com/mylmz10/vue-material-3/commit/c3c6fa52c828659a99b552b382f1c12ee3a2c11e))
* **ci:** force npm trusted publishing without auth token ([74a6485](https://github.com/mylmz10/vue-material-3/commit/74a6485dd2caa704aba7f735406f046bdc2fd5b7))
* **select:** add explicit zero gap on outlined-select trigger ([0c90413](https://github.com/mylmz10/vue-material-3/commit/0c904138d55c4e6156fe0fd4eb4873b848d812c9))
* **select:** add explicit zero gap on outlined-select trigger ([c7bd43d](https://github.com/mylmz10/vue-material-3/commit/c7bd43d825755553cc6ad005880cc5fdc169b80d))

## [0.8.1](https://github.com/mylmz10/vue-material-3/compare/v0.8.0...v0.8.1) (2026-03-08)


### Bug Fixes

* **select:** add explicit zero gap on filled-select trigger ([1df43ac](https://github.com/mylmz10/vue-material-3/commit/1df43acb49ad170070468bec19241d1cdea4e0cd))
* **select:** add explicit zero gap on filled-select trigger ([c0ca041](https://github.com/mylmz10/vue-material-3/commit/c0ca041ed69b3a3d730576240e2da327aed4cc6e))

## [0.8.0](https://github.com/mylmz10/vue-material-3/compare/v0.7.0...v0.8.0) (2026-03-08)


### Features

* add calendar transition ([0afc930](https://github.com/mylmz10/vue-material-3/commit/0afc9305b70fd63d5493cd00d6a2ba0de852def3))
* **button:** add filled tonal button and fix ripple/nav-tab states ([83de3b5](https://github.com/mylmz10/vue-material-3/commit/83de3b504f9d731776e9a28545ae52764460cb4d))
* **button:** add filled tonal button component and story ([9578741](https://github.com/mylmz10/vue-material-3/commit/957874166a38a4479a8b09604e4c958501c72197))
* **button:** add link and soft-disabled parity API ([ea50a77](https://github.com/mylmz10/vue-material-3/commit/ea50a7736da52ed038319c4e4424396a067d9770))
* **button:** W1-02 button API parity ([5f50817](https://github.com/mylmz10/vue-material-3/commit/5f5081736111a59467c296b8bc8d079018b59f9a))
* **fab:** add branded fab component and stories ([789b1f5](https://github.com/mylmz10/vue-material-3/commit/789b1f5021a7098363bc7ec4190136be1a79fe74))
* **fab:** add branded fab component and stories ([4dcaa3b](https://github.com/mylmz10/vue-material-3/commit/4dcaa3b33149cfdf61157abe94aab4abf6073048))
* **icon-button:** add toggle and link parity behavior ([4f3857f](https://github.com/mylmz10/vue-material-3/commit/4f3857f9275b2ff6bf38edf92b802ab3c55429c8))
* **icon-button:** implement W1-03 toggle/link parity ([02206b3](https://github.com/mylmz10/vue-material-3/commit/02206b31936e2e1a5ee14ef2edc02e7f56137985))
* implement MdFilledSelect ([54373a4](https://github.com/mylmz10/vue-material-3/commit/54373a4b5ceca9e1894415baed779ced50577e2f))
* implement MdOutlinedSelect ([25621ab](https://github.com/mylmz10/vue-material-3/commit/25621ab7d0858f4abbe0f202bb31859ba0f3beff))
* implementation of basic date picker ([97b9f77](https://github.com/mylmz10/vue-material-3/commit/97b9f77af1ca0c105949debbcf3dda497d37adbc))
* select option component ([8429240](https://github.com/mylmz10/vue-material-3/commit/8429240f2da2556a8d89157510add3b39063cc58))
* **select:** add MdSelectOption component behavior ([79f0734](https://github.com/mylmz10/vue-material-3/commit/79f0734a58a5d335fb15f805c3e896897fe5ad57))
* **select:** add outlined select and shared option tokens ([8628ee2](https://github.com/mylmz10/vue-material-3/commit/8628ee2fda3b6cbc223f42c46aee63f97d0283f0))
* **select:** implement MdFilledSelect ([2f6fe66](https://github.com/mylmz10/vue-material-3/commit/2f6fe66575b00d58a6ce09cb0edc065515888b67))
* **select:** implement MdSelectOption ([1323fba](https://github.com/mylmz10/vue-material-3/commit/1323fba05d10a10c0e9b095deb47c7b2602c3d6c))
* **tokens:** upgrade Material tokens to v0_192 and migrate components ([a32a9ff](https://github.com/mylmz10/vue-material-3/commit/a32a9ff7e4aa35a03cb18232ecf608d952f606ef))


### Bug Fixes

* **ci:** repair release and sync workflows on master ([7fad0ab](https://github.com/mylmz10/vue-material-3/commit/7fad0ab5469a51c967b4979128967cd01219f44f))
* **ci:** repair release-please and master-&gt;develop sync workflows ([05352fe](https://github.com/mylmz10/vue-material-3/commit/05352fe71ded1c83caf7527cc2202a6bc5bd4721))
* end slot width change ([f7cd271](https://github.com/mylmz10/vue-material-3/commit/f7cd27138559a210f6846ac2f4ed3a97cbe80067))
* **ui:** button ripple layering and navigation tab indicator ([ca82447](https://github.com/mylmz10/vue-material-3/commit/ca82447a8b76650f0a9d9341930623d8c5094362))

## [0.7.0](https://github.com/mylmz10/vue-material-3/compare/v0.6.0...v0.7.0) (2024-11-22)


### Features

* button background & border changes ([ba695d3](https://github.com/mylmz10/vue-material-3/commit/ba695d309124936288effcc71414b43d64e1b599))
* error prop implementation to filled and outlined fields ([d591ec9](https://github.com/mylmz10/vue-material-3/commit/d591ec93bdb81ec889bc64a6a3ee41f30907672b))
* implementation of outlined autocomplete ([cade1da](https://github.com/mylmz10/vue-material-3/commit/cade1da69f430fe22fab4e0b286309e65a70446d))
* updates for autocomplete ([cf7c8bd](https://github.com/mylmz10/vue-material-3/commit/cf7c8bdad7cc465450401ca0d8be4a49d95ba52b))


### Bug Fixes

* checkbox model change ([035e1b9](https://github.com/mylmz10/vue-material-3/commit/035e1b90dbef9b59ee9608bb2e013181b43e5e13))
* some fixes ([90d0c1f](https://github.com/mylmz10/vue-material-3/commit/90d0c1fc6e413dd87b52da06e33da127036e34ae))

## [0.6.0](https://github.com/mylmz10/vue-material-3/compare/v0.5.0...v0.6.0) (2024-03-28)


### Features

* MdSlider implementation ([7eb5d17](https://github.com/mylmz10/vue-material-3/commit/7eb5d175a79ba56d383c31201ad5de58d5690628))
* MdSnackbar & MdFilledAutoComplete implementation and some fixes ([111f5bc](https://github.com/mylmz10/vue-material-3/commit/111f5bcd3a2fbe13d18c9e639fb6e6cde0fe77c9))


### Bug Fixes

* badge value fix ([0825b06](https://github.com/mylmz10/vue-material-3/commit/0825b06803810a87fc5eee661b05069548092f39))
* defineProps removed from the components ([9224b13](https://github.com/mylmz10/vue-material-3/commit/9224b1375a80ecdda989ca3161229a03610263a8))

## [0.5.0](https://github.com/mylmz10/vue-material-3/compare/v0.4.0...v0.5.0) (2023-04-19)


### Features

* chip and chipset updates ([48c4269](https://github.com/mylmz10/vue-material-3/commit/48c4269a46afba33007e408d0d4f1889947f15d5))
* menu implementation ([741c6d8](https://github.com/mylmz10/vue-material-3/commit/741c6d8c592cbf7ed7fb36188e70fcd296a0edef))


### Bug Fixes

* bug fixes and storybook updates ([223e87e](https://github.com/mylmz10/vue-material-3/commit/223e87eb9e931958f95851404228c29f66f09849))

## [0.4.0](https://github.com/mylmz10/vue-material-3/compare/v0.3.0...v0.4.0) (2023-03-19)


### Features

* dialog implementation ([eea26df](https://github.com/mylmz10/vue-material-3/commit/eea26df871ab4f848ed8a6b143139501bb89958b))
* navigation-tab and navigation-bar implementation ([a1f0f21](https://github.com/mylmz10/vue-material-3/commit/a1f0f21c394991cacc525d83b1c188f407178087))


### Bug Fixes

* badge and list updates, readme updates ([4aa823f](https://github.com/mylmz10/vue-material-3/commit/4aa823f1a2b673b25d421092ae4c2c4e327d7063))

## [0.3.0](https://github.com/mylmz10/vue-material-3/compare/v0.2.0...v0.3.0) (2023-03-02)


### Features

* **segmentedbutton:** segmentedButton and SegmentedButtonSet implementation ([c562e27](https://github.com/mylmz10/vue-material-3/commit/c562e278106a98029faa2c94ffd0b6bda7179415))

## [0.2.0](https://github.com/mylmz10/vue-material-3/compare/v0.1.0...v0.2.0) (2023-03-01)


### Features

* release-please implementation ([8adb2f3](https://github.com/mylmz10/vue-material-3/commit/8adb2f3c244f4f9937850d6df66e69d9b9efe8f1))
