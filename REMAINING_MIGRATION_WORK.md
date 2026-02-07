# Remaining MUI to React Native Paper Migration Tasks

## Overview
This document details the remaining work needed to complete the MUI to React Native Paper migration.

**Current Status**: 25/177 files migrated (14%)  
**Remaining**: 152 files (86%)

## Remaining Files by Category

### 1. Elements Directory (~15 files)
**Location**: `/src/elements/`

Files needing migration:
- `emby-playstatebutton/PlayedButton.tsx` - IconButton + Tooltip
- `emby-ratingbutton/FavoriteButton.tsx` - IconButton + Tooltip
- `emby-itemrefreshindicator/RefreshIndicator.tsx` - CircularProgress
- `emby-progressbar/AutoTimeProgressBar.tsx` - LinearProgress
- `emby-itemscontainer/ItemsContainer.tsx` - Layout component

**Complexity**: Medium  
**Estimated Time**: 1-2 days

### 2. Mediainfo Components (3 remaining)
**Location**: `/src/components/mediainfo/`

- `MediaInfoStats.tsx` - Complex layout with Box, Typography
- `PrimaryMediaInfo.tsx` - Complex media info display
- `SecondaryMediaInfo.tsx` - Additional media info

**Complexity**: Low-Medium  
**Estimated Time**: 0.5 days

### 3. Common Text Lines Components (~3 files)
**Location**: `/src/components/common/textLines/`

- `TextLines.tsx` - Typography components

**Complexity**: Low  
**Estimated Time**: 0.5 days

### 4. List View Components (~10 files)
**Location**: `/src/components/listview/List/`

- `Lists.tsx` - List container
- `ListViewUserDataButtons.tsx` - IconButtons in list
- `ListImageContainer.tsx` - Image in list
- `ListGroupHeaderWrapper.tsx` - List headers
- `ListWrapper.tsx` - List wrapper
- `ListContent.tsx` - List content
- `ListItemBody.tsx` - List item body
- `ListContentWrapper.tsx` - List content wrapper

**Complexity**: Medium-High  
**Estimated Time**: 2-3 days

### 5. Card Builder Components (~10 files)
**Location**: `/src/components/cardbuilder/Card/`

- `CardImageContainer.tsx` - Image container
- `CardHoverMenu.tsx` - Menu on hover
- `CardFooterText.tsx` - Typography
- `useCardText.tsx` - Text utilities
- `CardText.tsx` - Typography
- `CardOverlayButtons.tsx` - IconButtons overlay

**Complexity**: Medium  
**Estimated Time**: 2 days

### 6. Experimental App Components (~25 files)
**Location**: `/src/apps/experimental/`

#### App Toolbar (~10 files)
- `components/AppToolbar/index.tsx` - AppBar, Toolbar
- `components/AppToolbar/SearchButton.tsx` - IconButton
- `components/AppToolbar/RemotePlayButton.tsx` - IconButton
- `components/AppToolbar/SyncPlayButton.tsx` - IconButton
- `components/AppToolbar/menus/RemotePlayMenu.tsx` - Menu
- `components/AppToolbar/menus/RemotePlayActiveMenu.tsx` - Menu
- `components/AppToolbar/menus/SyncPlayMenu.tsx` - Menu
- `components/AppToolbar/userViews/UserViewNav.tsx` - Tabs
- `components/AppToolbar/userViews/UserViewsMenu.tsx` - Menu

#### Drawer Components (~3 files)
- `components/drawers/DrawerHeaderLink.tsx` - ListItem with Link
- `components/drawers/MainDrawerContent.tsx` - Drawer content

#### Library Components (~10 files)
- `components/library/QueueButton.tsx` - Button
- `components/library/PlayAllButton.tsx` - Button
- `components/library/LibraryViewMenu.tsx` - Menu
- `components/library/ItemsView.tsx` - Complex view
- `components/library/NewCollectionButton.tsx` - Button
- `components/library/ShuffleButton.tsx` - Button
- `components/library/ViewSettingsButton.tsx` - Button
- `components/library/Pagination.tsx` - Pagination controls
- `components/library/PageTabContent.tsx` - Tab content
- `components/library/GuideView.tsx` - Complex grid view
- `components/library/AlphabetPicker.tsx` - Custom picker
- `components/library/SortButton.tsx` - Button with menu

#### Filter Components (~9 files)
- `components/library/filter/FiltersYears.tsx` - Checkbox filters
- `components/library/filter/FiltersStatus.tsx` - Checkbox filters
- `components/library/filter/FiltersEpisodesStatus.tsx` - Checkbox filters
- `components/library/filter/FiltersSeriesStatus.tsx` - Checkbox filters
- `components/library/filter/FiltersVideoTypes.tsx` - Checkbox filters
- `components/library/filter/FiltersGenres.tsx` - Checkbox filters
- `components/library/filter/FiltersTags.tsx` - Checkbox filters
- `components/library/filter/FiltersOfficialRatings.tsx` - Checkbox filters
- `components/library/filter/FiltersStudios.tsx` - Checkbox filters
- `components/library/filter/FiltersFeatures.tsx` - Checkbox filters
- `components/library/filter/FilterButton.tsx` - Button

#### Feature Components (~8 files)
- `features/preferences/components/LocalizationPreferences.tsx` - Form
- `features/preferences/components/ItemDetailPreferences.tsx` - Form
- `features/preferences/components/NextUpPreferences.tsx` - Form
- `features/preferences/components/LibraryPreferences.tsx` - Form
- `features/preferences/components/DisplayPreferences.tsx` - Form
- `features/details/components/buttons/*` - Various IconButtons (~8 files)

#### Routes (~2 files)
- `routes/video/index.tsx` - Video player UI
- `routes/user/display/index.tsx` - User display settings

#### Main Layout (~2 files)
- `AppLayout.tsx` - Main app layout structure
- `components/LibraryIcon.tsx` - Icon component
- `components/PlayTargetIcon.tsx` - Icon component

**Complexity**: High  
**Estimated Time**: 7-10 days

### 7. Dashboard Components (~50+ files)
**Location**: `/src/apps/dashboard/`

#### Widgets (~10 files)
- `components/widgets/Widget.tsx` - Card-based widget
- `components/widgets/DevicesWidget.tsx` - Device info
- `components/widgets/AlertsLogWidget.tsx` - Alert display
- `components/widgets/RunningTasksWidget.tsx` - Task display
- `components/widgets/ServerInfoWidget.tsx` - Server info
- `components/widgets/ItemCountsWidget.tsx` - Count display
- `components/widgets/ServerPathWidget.tsx` - Path display
- `components/widgets/ActivityLogWidget.tsx` - Activity log

#### Components (~10 files)
- `components/toolbar/HelpButton.tsx` - IconButton
- `components/AppTabs.tsx` - Tabs component
- `components/table/TablePage.tsx` - Table component
- `components/BaseCard.tsx` - Card component
- `components/SearchInput.tsx` - TextField
- `components/UserAvatarButton.tsx` - Button with avatar
- `components/Toast.tsx` - Snackbar/Toast

#### Drawer (~5 files)
- `components/drawer/AppDrawer.tsx` - Main drawer
- `components/drawer/sections/DevicesDrawerSection.tsx` - Drawer section
- `components/drawer/sections/AdvancedDrawerSection.tsx` - Drawer section
- `components/drawer/sections/ServerDrawerSection.tsx` - Drawer section
- `components/drawer/sections/LiveTvDrawerSection.tsx` - Drawer section
- `components/drawer/sections/PluginDrawerSection.tsx` - Drawer section

#### Routes (~15+ files)
- `routes/libraries/index.tsx` - Library management
- `routes/libraries/nfo.tsx` - NFO settings
- `routes/libraries/metadata.tsx` - Metadata settings
- `routes/libraries/display.tsx` - Display settings
- `routes/devices/index.tsx` - Device management
- `routes/activity/index.tsx` - Activity log
- `routes/livetv/recordings.tsx` - LiveTV recordings
- `routes/livetv/index.tsx` - LiveTV main
- `routes/settings/index.tsx` - Settings page
- `routes/plugins/repositories.tsx` - Plugin repos
- `routes/plugins/index.tsx` - Plugins list
- `routes/plugins/plugin.tsx` - Plugin detail
- `routes/logs/file.tsx` - Log file view
- `routes/logs/index.tsx` - Logs list
- `routes/index.tsx` - Dashboard home
- `routes/keys/index.tsx` - API keys
- `routes/playback/streaming.tsx` - Streaming settings
- `routes/playback/transcoding.tsx` - Transcoding settings
- `routes/backups/index.tsx` - Backup management
- `routes/playback/trickplay.tsx` - Trickplay settings
- `routes/playback/resume.tsx` - Resume settings
- `routes/tasks/task.tsx` - Task detail
- `routes/tasks/index.tsx` - Tasks list
- `routes/branding/index.tsx` - Branding settings

#### Features (~15+ files)
- `features/libraries/components/LibraryCard.tsx` - Card
- `features/devices/components/DeviceCard.tsx` - Card
- `features/plugins/components/PluginCard.tsx` - Card
- `features/plugins/components/PluginDetailsTable.tsx` - Table
- `features/plugins/components/NoPluginResults.tsx` - Empty state
- `features/plugins/components/RepositoryListItem.tsx` - List item
- `features/plugins/components/PluginRevisions.tsx` - List
- `features/plugins/components/NewRepositoryForm.tsx` - Form
- `features/activity/components/LogLevelChip.tsx` - Chip
- `features/activity/components/OverviewCell.tsx` - Table cell
- `features/logs/components/LogItemList.tsx` - List
- `features/livetv/components/TunerDeviceCard.tsx` - Card
- `features/livetv/components/Provider.tsx` - Complex component
- `features/backups/components/RestoreProgressDialog.tsx` - Dialog
- `features/backups/components/RestoreConfirmationDialog.tsx` - Dialog
- `features/backups/components/Backup.tsx` - List item
- `features/backups/components/CreateBackupForm.tsx` - Form
- `features/backups/components/BackupInfoDialog.tsx` - Dialog
- `features/backups/components/BackupProgressDialog.tsx` - Dialog
- `features/tasks/components/Task.tsx` - List item
- `features/tasks/components/TaskLastRan.tsx` - Text
- `features/tasks/components/Tasks.tsx` - List
- `features/tasks/components/TaskProgress.tsx` - Progress
- `features/tasks/components/TaskTriggerCell.tsx` - Table cell
- `features/tasks/components/NewTriggerForm.tsx` - Form
- `features/metrics/components/MetricCard.tsx` - Card
- `features/storage/components/StorageListItem.tsx` - List item
- `features/storage/components/StorageTypeIcon.tsx` - Icon

**Complexity**: High  
**Estimated Time**: 10-12 days

### 8. Utility Components (~5 files)
**Location**: `/src/components/`

- `router/ErrorBoundary.tsx` - Error display with Typography
- `indicators/useIndicator.tsx` - Progress indicators

**Complexity**: Low-Medium  
**Estimated Time**: 0.5 days

### 9. Theme/Utils (~3 files)
**Location**: Various

- `src/themes/styles.d.ts` - MUI theme types
- `src/utils/reactUtils.tsx` - MUI utilities
- `src/themes/themeStorageManager.ts` - Theme utilities

**Complexity**: Medium  
**Estimated Time**: 1 day

## Migration Patterns by Component Type

### Simple Replacements (Quick Wins)
These can be done rapidly with find/replace patterns:

1. **IconButton**: Just icon replacement
2. **Button**: Mode change (variant → mode)
3. **Typography** → **Text**: Variant mapping
4. **Box** → **View**: Direct swap
5. **Divider**: Nearly identical

**Estimated**: 30-40 files, 2-3 days

### Medium Complexity
Require structural changes but straightforward:

1. **Dialog Components**: Add Portal wrapper
2. **List Components**: API differs significantly
3. **Form Components**: Layout restructuring
4. **Card Components**: Sub-component changes

**Estimated**: 50-60 files, 5-7 days

### High Complexity
Require significant refactoring:

1. **Menu Components**: Completely different anchor system
2. **Drawer Components**: Navigation integration needed
3. **Tabs Components**: No native equivalent
4. **Table Components**: Need custom implementation
5. **Grid/Layout Components**: Complex responsive logic

**Estimated**: 30-40 files, 7-10 days

## Required Actions Before Testing

### 1. Install Additional Packages
```bash
npm install --save \
  react-native-skeleton-placeholder@^5.2.4 \
  react-native-markdown-display@^7.0.0 \
  react-native-paper-tooltip@^1.0.5 \
  @react-navigation/material-top-tabs@^6.6.5 \
  @react-navigation/drawer@^6.6.15 \
  react-native-pager-view@^6.2.3 \
  react-native-tab-view@^3.5.2
```

### 2. Add Missing Icon Package
```bash
npm install --save react-native-vector-icons
```

### 3. Configure React Native Vector Icons
Follow setup instructions for web/iOS/Android

### 4. Update Theme Configuration
Migrate from MUI theme to React Native Paper theme system

### 5. Remove MUI Dependencies
After migration complete:
```bash
npm uninstall @mui/material @mui/icons-material @emotion/react @emotion/styled
```

## Testing Strategy

### Phase 1: Component Testing
- Test each migrated component in isolation
- Verify props work correctly
- Check styling is correct
- Test interactions (onPress, etc.)

### Phase 2: Integration Testing
- Test navigation flows
- Verify dialogs work correctly
- Test forms and input handling
- Check responsive behavior

### Phase 3: Platform Testing
- Test on web
- Test on iOS simulator
- Test on Android emulator
- Verify platform-specific behavior

### Phase 4: Visual Regression
- Compare UI before/after
- Check spacing and layout
- Verify theming consistency
- Test dark/light modes

## Known Issues to Address

### 1. ClassName Usage
**Problem**: React Native doesn't support className  
**Solution**: Convert all className props to style props using StyleSheet

### 2. Data Attributes
**Problem**: data-* attributes don't work in React Native  
**Solution**: Use state management or context for storing metadata

### 3. Link Components
**Problem**: component={Link} pattern doesn't work  
**Solution**: Use React Navigation's linking system

### 4. Event Handling
**Problem**: onClick doesn't exist, onChange has different signature  
**Solution**: Use onPress, onChangeText, etc.

### 5. CSS Selectors
**Problem**: sx prop and CSS selectors don't exist  
**Solution**: Use inline styles or StyleSheet with specific properties

### 6. HTML-Specific Features
**Problem**: dangerouslySetInnerHTML, href, etc. don't work  
**Solution**: Use appropriate React Native equivalents

## Recommended Migration Order

### Week 1-2: Foundation
1. Complete remaining simple components (elements, mediainfo, textLines)
2. Migrate all IconButton and Button components
3. Convert all Typography to Text
4. Replace all Box/Stack with View

### Week 3: Experimental App
1. Migrate app toolbar components
2. Convert library components
3. Handle filter components
4. Update drawer components

### Week 4-5: Dashboard
1. Migrate dashboard widgets
2. Convert dashboard routes
3. Handle dashboard features
4. Update dashboard components

### Week 6: Testing & Refinement
1. Install required packages
2. Run comprehensive testing
3. Fix identified issues
4. Refine TODOs
5. Update documentation

## Success Criteria

- [ ] All 177 files migrated
- [ ] No MUI imports remaining
- [ ] All TODO comments addressed or documented
- [ ] Application builds successfully
- [ ] All key features work on web
- [ ] All key features work on iOS
- [ ] All key features work on Android
- [ ] Visual appearance is consistent
- [ ] Performance is acceptable
- [ ] Documentation is complete

## Conclusion

This is a substantial migration requiring approximately 17-25 days of focused development work. The systematic approach outlined here will ensure all components are properly migrated while maintaining functionality.

Priority should be given to:
1. Core infrastructure (app layout, navigation)
2. Most-used features (library browsing, media playback)
3. Admin features (dashboard)
4. Polish and refinement
