Previous week’s plan.

The previous week’s plan included watching a video on Spring Boot and/or full stack development, 
read more about the extra features of Blockly (block shapes and layout + block editor design) [includes 
CSS designs and animations] Research more about JavaScript libraries to create a graphical 
representation of results from the Alloy Java files. 
For a broader look into backend development I watched this video 
(https://www.youtube.com/watch?v=XBu54nfzxAQ&t=163s&pp=ygUdYmFja2VuZCBkZXZlbG9wbWVud
CBleHBsYWluZWQ%3D). I looked in Blockly’s different renderers: Thrasos, Geras, and Zelos and this is 
where I implemented Zelos which Scratch utilizes. This renderer fixed a lot of different issues like 
allowing me to create custom block shapes (circle or rectangular) but also caused more issues like very 
large blocks and more manually features that Geras (the default renderer automatically configured).
For the editor itself, Blockly provides multiple classes like .blocklyToolboxDiv and .blocklyFlyout that 
allow for CSS customizations. It also allows for a custom theme which you can add. I mainly read some 
documents over those concepts and not actually implemented them yet. For the JavaScript libraries, I 
mainly looked in Recharts as it’s something I used before but I also found some libraries that are meant 
for graph layouts like React Flow.

This Week’s Progress

I think I messed up this part in the last weekly report. As of today, Monday 7/6/2026 I have 
implemented CSS features for .blocklyMainBackground and .blocklyToolboxDiv. Additionally, the 
changes in the renderer caused a small visual discrepancy where darker block’s inputs are much harder 
to see (I decided to utilize a lighter color for all my blocks to fix this issue). Tomorrow, I will most likely 
look deeper into React Flow and see how I can utilize it with ELK.js (a helper library that helps arranges
a visual graph creation). Right now, I am just focused on styling the application and ensuring that the 
result of the Alloy Analyzer is better visualized.
Next Week’s Plan


I haven’t done too much this week yet but if I had to look further into the REU
• Create an initial presentation/research paper design to consolidate research so that I can 
quickly review what I have done/need to do
• Present the crafted application to you to see if there needs to be any visual changes or added 
features
• Begin next steps of testing out the efficacy of a block based editor on modeling languages 
through an experiment (text editor vs block editor) 
• See if there are any more concepts that I can learn while doing this REU

### Blockly DOM classes

Extracted directly from the installed `blockly` package (v12.5.1,
`node_modules/blockly/blockly_compressed.js`) — this is the current API surface,
not the older tree-based toolbox classes some tutorials still reference (e.g. the
old `.blocklyToolboxDiv`/`.blocklyTreeLabel`/`.blocklyTreeRow` no longer exist;
they're `.blocklyToolbox`/`.blocklyToolboxCategoryLabel`/`.blocklyToolboxCategory` now).

**Toolbox**
.blocklyToolbox .blocklyToolboxCategory .blocklyToolboxCategoryContainer
.blocklyToolboxCategoryGroup .blocklyToolboxCategoryIcon .blocklyToolboxCategoryIconOpen
.blocklyToolboxCategoryIconClosed .blocklyToolboxCategoryLabel .blocklyToolboxSelected
.blocklyToolboxFlyout .blocklyToolboxDelete .blocklyToolboxGrab
.blocklyTreeRowContentContainer .blocklyTreeSeparator

**Flyout**
.blocklyFlyout .blocklyFlyoutBackground .blocklyFlyoutButton .blocklyFlyoutButtonBackground
.blocklyFlyoutButtonShadow .blocklyFlyoutLabel .blocklyFlyoutLabelBackground
.blocklyFlyoutLabelText .blocklyFlyoutScrollbar .blocklyTrashcanFlyout

**Workspace / canvas**
.blocklyWorkspace .blocklySvg .blocklyMainBackground .blocklyBlockCanvas
.blocklyBubbleCanvas .blocklyGridPattern .blocklyMainWorkspaceScrollbar
.blocklyBlockDragSurface .blocklyComputeCanvas .blocklyCanvasTransitioning

**Blocks**
.blocklyBlock .blocklyPath .blocklyPathLight .blocklyPathDark .blocklyPathSelected
.blocklyDraggable .blocklyDragging .blocklyDraggingDelete .blocklySelected
.blocklyHighlighted .blocklyHighlightedConnectionPath .blocklyDisabled
.blocklyDisabledPattern .blocklyInsertionMarker .blocklyOutlinePath .blocklyShadow
.blocklyCollapsed .blocklyEmboss .blocklyEmbossFilter .blocklyReplaceable
.blocklyNotDeletable .blocklyNotEditable .blocklyEditing

**Fields**
.blocklyField .blocklyFieldRect .blocklyFieldText .blocklyEditableField .blocklyEditable
.blocklyNonEditableField .blocklyDropdownField .blocklyDropdownMenu .blocklyDropdownRect
.blocklyDropdownText .blocklyDropDownArrow .blocklyDropDownContent .blocklyDropDownDiv
.blocklyCheckboxField .blocklyNumberField .blocklyTextInputField .blocklyHtmlInput
.blocklyTextarea .blocklyImageField .blocklyLabelField .blocklyVariableField
.blocklyInvalidInput

**Comments / bubbles**
.blocklyComment .blocklyCommentText .blocklyCommentIcon .blocklyCommentHighlight
.blocklyCommentForeignObject .blocklyCommentPreview .blocklyCommentTopbar
.blocklyCommentTopbarBackground .blocklyBubble .blocklyBubbleTail .blocklyBubbleText
.blocklyTextBubble .blocklyTextInputBubble .blocklyMiniWorkspaceBubble .blocklyWarningIcon

**Scrollbars**
.blocklyScrollbar .blocklyScrollbarBackground .blocklyScrollbarHandle
.blocklyScrollbarHorizontal .blocklyScrollbarVertical

**Zoom & trash controls**
.blocklyZoom .blocklyZoomIn .blocklyZoomOut .blocklyZoomReset .blocklyZoominClipPath
.blocklyZoomoutClipPath .blocklyZoomresetClipPath .blocklyTrash .blocklyTrashBodyClipPath
.blocklyTrashLidClipPath

**Menus / context menu**
.blocklyMenu .blocklyMenuItem .blocklyMenuItemContent .blocklyMenuItemCheckbox
.blocklyMenuItemDisabled .blocklyMenuItemHighlight .blocklyMenuItemRtl
.blocklyMenuItemSelected .blocklyMenuSeparator .blocklyContextMenu

**Widgets / tooltip / toast**
.blocklyWidgetDiv .blocklyTooltipDiv .blocklyToast .blocklyToastMessage
.blocklyToastCloseButton

**Mutator**
.blocklyMutatorBackground .blocklyMutatorIcon

**Icons / misc state modifiers**
.blocklyIconGroup .blocklyIconGroupReadonly .blocklyIconShape .blocklyIconSymbol
.blocklyDeleteIcon .blocklyFoldoutIcon .blocklyRTL .blocklyReadonly .blocklyReadOnly
.blocklyKeyboardNavigation .blocklyActiveFocus .blocklyPassiveFocus .blocklyAnimationLayer
.blocklyDebugFilter .blocklyMinimalBody .blocklyNoPointerEvents
.blocklySelectedGlowFilter .blocklyReplacementGlowFilter .blocklyVerticalMarker

### Updated Workflow Overview

```text
Blockly Workspace
        │
        ▼
Custom Alloy Blocks
        │
        ▼
Blockly Generators
        │
        ▼
Alloy Source Code
        │
        ▼
POST /run-model
        │
        ▼
Spring Boot
        │
        ▼
AlloyRunner
        │
        ▼
A4Solution
        │
        ▼
Extract Atoms & Relations
        │
        ▼
JSON Response
        │
        ▼
React
        │
        ▼
Convert to nodes[] and edges[]
Convert atoms → nodes
Convert relations → edges
        │
        ▼
React Flow + ELK.js
        │
        ▼
Interactive Alloy Instance Visualization
```

# Recommended Visualization Stack Overview

React Flow

Responsibilities:

- render nodes
- render edges
- custom Alloy nodes
- zoom
- pan
- selection
- interaction

ELK.js

Responsibilities:

- compute graph layout
- determine node positions
- produce readable hierarchical layouts