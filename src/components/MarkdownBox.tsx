import { View } from 'react-native';
import DOMPurify from 'dompurify';
import markdownIt from 'markdown-it';
import React, { type FC } from 'react';

interface MarkdownBoxProps {
    markdown?: string | null
    fallback?: string
}

/** A component to render Markdown content within a View component. 
 * TODO: dangerouslySetInnerHTML doesn't work in React Native
 * Consider using react-native-markdown-display or similar library
 */
const MarkdownBox: FC<MarkdownBoxProps> = ({
    markdown,
    fallback
}) => (
    <View
        // TODO: dangerouslySetInnerHTML not supported in React Native
        // Need to use a markdown rendering library like react-native-markdown-display
        style={{
            // TODO: CSS selectors don't work in React Native - need alternative styling approach
        }}
    >
        {/* TODO: Implement proper markdown rendering for React Native */}
        {markdown ? undefined : fallback}
    </View>
);

export default MarkdownBox;
