# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.5.0] - 2020-05-07

### Changed

- Simplified README.md.

## [0.4.0] - 2020-03-02

### Added

- Added new badges

## [0.3.0] - 2020-03-02

### Added

- Github action to publish to marketplaces.
- Added task to *.vscode/tasks.json* to automatically run webpack when opening the project.

### Changed

- For the command `marky-edit.toggleLink`, take the value from the clipboard as the href.

### Fixed

- Commands were not showing up in the Commmand Palette. The`editorTextFocus` context no long works in the `enablement` property for commands in the extension manifest.

## [0.2.0] - 2020-09-12

### Added

- Added Configuration properties:  `markyMarkdown.edit.emphasisCharacter` and `markyMarkdown.edit.unorderedListCharacter` to specify preferences for markdown characters used.
- Added a check when removing an unordered list to see if it is a thematic break (horizontal rule).

### Changed

- Changed the title of command `marky-edit.toggleHorizontalRule` to include the text "thematic break".

### Fixed

- Fixed command title for unordered and ordered lists.
- Tests needed to be updated with correct extension name for commands.
- For ordered and unordered lists, when there is no selection, the list inserted would create a list item that could not be edited without deleting the accompanying markdown!

## [0.1.0] - 2020-09-09

### Added

- Basic syntax.
- Shortcuts for emphasis and strong emphasis.
