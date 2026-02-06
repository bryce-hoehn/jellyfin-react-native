# MUI to React Native Paper Migration Summary

## Overview
This document outlines the migration from Material-UI (MUI) components to React Native Paper components in the Jellyfin React Native project.

**Status**: In Progress  
**Total Files Affected**: 177 files  
**Files Migrated**: 25 files (14%)  
**Estimated Component Instances**: 500+  

## Migration Statistics

### Files Migrated So Far (25 files)

#### Batch 1: Dialog and Basic Components
1. ✅ `/src/components/ConfirmDialog.tsx`
2. ✅ `/src/components/InputDialog.tsx`
3. ✅ `/src/components/SimpleAlert.tsx`
4. ✅ `/src/components/toolbar/ServerButton.tsx`
5. ✅ `/src/components/common/NoItemsMessage.tsx`
6. ✅ `/src/components/common/PlayArrowIconButton.tsx`
7. ✅ `/src/components/LoadingSkeleton.tsx`
8. ✅ `/src/components/common/InfoIconButton.tsx`

#### Batch 2: Common Components & Utilities
9. ✅ `/src/components/common/DefaultName.tsx`
10. ✅ `/src/components/common/DefaultIconText.tsx`
11. ✅ `/src/components/common/RightIconButtons.tsx`
12. ✅ `/src/components/common/MoreVertIconButton.tsx`
13. ✅ `/src/components/common/PlaylistAddIconButton.tsx`
14. ✅ `/src/components/common/SectionContainer.tsx`
15. ✅ `/src/components/Image.tsx`
16. ✅ `/src/components/MarkdownBox.tsx`
17. ✅ `/src/components/ListItemLink.tsx`
18. ✅ `/src/components/ElevationScroll.tsx`
19. ✅ `/src/components/ResponsiveDrawer.tsx`

#### Batch 3: Media Info Components
20. ✅ `/src/components/mediainfo/MediaInfoItem.tsx`
21. ✅ `/src/components/mediainfo/StarIcons.tsx`
22. ✅ `/src/components/mediainfo/CaptionMediaInfo.tsx`
23. ✅ `/src/components/mediainfo/CriticRatingMediaInfo.tsx`
24. ✅ `/src/components/mediainfo/EndsAt.tsx`

### Remaining Files
**152 files** still need migration (86%)

## Component Mapping Guide

### Direct Replacements (Simple)

| MUI Component | React Native Paper Component | Notes |
|---------------|------------------------------|-------|
| `Button` | `Button` | Props differ: `variant` → `mode`, `onClick` → `onPress` |
| `IconButton` | `IconButton` | Icon must be passed as `icon` prop (function that returns icon component) |
| `TextField` | `TextInput` | `onChange` → `onChangeText`, `variant` → `mode` |
| `Checkbox` | `Checkbox` | Props are similar but `onChange` → `onValueChange` |
| `Switch` | `Switch` | Props are similar |
| `Typography` | `Text` | `variant` values differ significantly |
| `Divider` | `Divider` | Nearly identical |
| `LinearProgress` | `ProgressBar` | Similar API |
| `CircularProgress` | `ActivityIndicator` (from React Native) | Different API |

### Complex Replacements (Need Custom Code)

| MUI Component | RN Paper Equivalent | Complexity | Notes |
|---------------|---------------------|------------|-------|
| `Box` | `View` (React Native) | Medium | No RN Paper component; use native `View` with flexbox |
| `Stack` | `View` with flexbox | Medium | MUI Stack is layout helper; use `View` with `flex` styles |
| `Dialog` | `Dialog` | Medium | Different sub-components; needs `Portal` wrapper |
| `Menu` | `Menu` | High | Different API; anchor system works differently |
| `List` / `ListItem` | `List.Section` / `List.Item` | Medium | Different structure and props |
| `Alert` | `Banner` or `Snackbar` | Medium | No direct Alert; choose based on use case |
| `Tooltip` | No equivalent | High | **No native RN Paper tooltip** - need third-party |
| `Drawer` | `Drawer` | Medium | Different API for navigation drawer |
| `AppBar` | `Appbar` | Medium | Different sub-components structure |
| `Tabs` | No equivalent | High | **No RN Paper tabs** - use third-party or custom |
| `Accordion` | `List.Accordion` | Medium | Similar but different props |
| `Card` | `Card` | Low | Similar API but sub-components differ |
| `Chip` | `Chip` | Low | Similar API |
| `FormControl` / `FormGroup` | No equivalent | High | Need custom layout with `View` |
| `Skeleton` | No equivalent | High | **Not available** - use third-party library |

### Icon Migration

| MUI Icons | React Native Solution | Package Required |
|-----------|----------------------|------------------|
| `@mui/icons-material/*` | `react-native-vector-icons` | `react-native-vector-icons/MaterialIcons` |
| Any MUI icon | Material Design Icons | Already in dependencies |

**Icon Replacement Pattern:**
```tsx
// Before (MUI)
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
<IconButton><PlayArrowIcon /></IconButton>

// After (RN Paper)
import { IconButton } from 'react-native-paper';
<IconButton icon="play-arrow" />
// OR with react-native-vector-icons:
import Icon from 'react-native-vector-icons/MaterialIcons';
<IconButton icon={({ size, color }) => <Icon name="play-arrow" size={size} color={color} />} />
```

## Common Migration Patterns

### 1. Dialog Components
```tsx
// MUI Pattern
<Dialog open={open} onClose={onClose}>
  <DialogTitle>Title</DialogTitle>
  <DialogContent>
    <DialogContentText>Content</DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={action}>OK</Button>
  </DialogActions>
</Dialog>

// RN Paper Pattern
<Portal>
  <Dialog visible={visible} onDismiss={onDismiss}>
    <Dialog.Title>Title</Dialog.Title>
    <Dialog.Content>
      <Text>Content</Text>
    </Dialog.Content>
    <Dialog.Actions>
      <Button onPress={action}>OK</Button>
    </Dialog.Actions>
  </Dialog>
</Portal>
```

### 2. Button Components
```tsx
// MUI
<Button variant="contained" color="primary" onClick={handler}>Click</Button>

// RN Paper
<Button mode="contained" onPress={handler}>Click</Button>
```

### 3. Layout Components (Box/Stack)
```tsx
// MUI
<Box sx={{ display: 'flex', gap: 2 }}>
  <Stack spacing={2} direction="row">
    {children}
  </Stack>
</Box>

// React Native
<View style={{ flexDirection: 'row', gap: 16 }}>
  {children}
</View>
```

### 4. Typography
```tsx
// MUI
<Typography variant="h1">Heading</Typography>
<Typography variant="body1">Body text</Typography>

// RN Paper
<Text variant="headlineLarge">Heading</Text>
<Text variant="bodyMedium">Body text</Text>
```

## Known Issues & TODOs

### Critical Issues
1. **No Skeleton Component**: React Native Paper doesn't have a skeleton loader
   - **Solution**: Use third-party library like `react-native-skeleton-placeholder`
   
2. **No Tooltip Component**: No native tooltip support
   - **Solution**: Use `react-native-paper-tooltip` or custom implementation
   
3. **No Tabs Component**: Tab navigation not built-in
   - **Solution**: Use `@react-navigation/material-top-tabs` or `react-native-tab-view`
   
4. **FormControl/FormGroup**: No form layout components
   - **Solution**: Custom layouts with `View` and proper styling

5. **className Props**: React Native doesn't support `className`
   - **Solution**: Replace with `style` props throughout

6. **Data Attributes**: `data-*` attributes not supported in React Native
   - **Solution**: Store in state/context or use alternative patterns

7. **sx Prop**: MUI's `sx` styling system not available
   - **Solution**: Use inline `style` or StyleSheet.create()

### Component-Specific Issues

#### Buttons
- `startIcon` / `endIcon` props don't exist → Need custom layout
- `component` prop for link integration → Need alternative navigation approach
- `size` prop values differ between MUI and RN Paper

#### Dialogs  
- `maxWidth` and `fullWidth` props not available
- Different event names: `onClose` → `onDismiss`, `open` → `visible`
- Must wrap in `Portal` component

#### Icons
- All icon components must be replaced with vector icons
- IconButton `icon` prop expects a function, not a component

#### Lists
- Complete API redesign - structure is very different
- `ListItemButton` doesn't exist - use `List.Item` with `onPress`

#### TextFields
- `helperText` not a direct prop - needs separate `HelperText` component
- `variant` values completely different
- `onChange` event structure different: `e.target.value` → direct value

## Files Requiring Complex Migration

These files use multiple complex MUI components and will require significant refactoring:

### High Priority (Core Components)
1. `/src/apps/experimental/AppLayout.tsx` - Main app layout
2. `/src/components/ResponsiveDrawer.tsx` - Navigation drawer
3. `/src/apps/experimental/components/AppToolbar/index.tsx` - App toolbar
4. `/src/apps/dashboard/components/AppTabs.tsx` - Tab navigation
5. `/src/components/router/ErrorBoundary.tsx` - Error handling

### Dashboard Components (40+ files)
- All files in `/src/apps/dashboard/` use extensive MUI components
- Widget components need complete overhaul
- Table components need custom implementation
- Form components throughout dashboard

### Library/Filter Components (20+ files)
- Files in `/src/apps/experimental/components/library/filter/` 
- Heavy use of FormControl, FormGroup, Checkbox groups

### List/Card Components (15+ files)
- Files in `/src/components/listview/`
- Files in `/src/components/cardbuilder/`
- Complex layouts with MUI Box, Stack, Typography

## Additional Packages Needed

To complete this migration, consider adding:

```json
{
  "react-native-skeleton-placeholder": "^5.2.4",
  "react-native-paper-tooltip": "^1.0.5", 
  "react-native-tab-view": "^3.5.2",
  "@react-navigation/material-top-tabs": "^6.6.5",
  "react-native-pager-view": "^6.2.3"
}
```

## Remaining Work Estimate

### By Complexity
- **Simple replacements** (Buttons, Text, basic inputs): ~60 files, 2-3 days
- **Medium complexity** (Dialogs, Lists, Layouts): ~70 files, 5-7 days
- **High complexity** (Custom forms, complex layouts, menus): ~40 files, 7-10 days
- **Testing and bug fixes**: 3-5 days

**Total Estimated Time**: 17-25 days of development work

### Recommended Approach
1. ✅ Complete simple component replacements first (Buttons, Text, IconButtons)
2. ⏳ Replace layout components (Box → View, Stack → View with flex)
3. ⏳ Handle Dialog and Menu components
4. ⏳ Tackle complex form components
5. ⏳ Replace List and Card components
6. ⏳ Address navigation components (Drawer, AppBar, Tabs)
7. ⏳ Final testing and refinement

## Testing Strategy

After migration:
1. **Visual regression testing** - Compare UI before/after
2. **Interaction testing** - Verify all buttons, forms, dialogs work
3. **Navigation testing** - Ensure routing still functions
4. **Platform testing** - Test on Web, iOS, and Android
5. **Accessibility testing** - Verify screen reader support maintained

## Notes
- Many components have been partially migrated with TODO comments
- Focus is on getting code to compile first, then refinement
- Some components may require complete redesign rather than direct replacement
- Consider design system consistency across platforms during migration
