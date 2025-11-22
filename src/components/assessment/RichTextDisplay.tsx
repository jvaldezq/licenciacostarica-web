'use client';

/**
 * RichTextDisplay Component
 *
 * Displays rich text content from questions/answers.
 * If the text is JSON (rich text format), it renders it appropriately.
 * If it's plain text, it renders as-is.
 *
 * This is a simple implementation - can be extended to support
 * TipTap, Lexical, or other rich text formats based on backend implementation.
 */

interface RichTextDisplayProps {
    content: string;
    className?: string;
}

export function RichTextDisplay({ content, className = '' }: RichTextDisplayProps) {
    // Check if content is JSON (rich text format)
    const isJSON = (str: string) => {
        try {
            JSON.parse(str);
            return true;
        } catch {
            return false;
        }
    };

    // Simple rich text renderer (extend based on your backend format)
    const renderRichText = (jsonContent: string) => {
        try {
            const parsed = JSON.parse(jsonContent);

            // If it's TipTap JSON format
            if (parsed.type === 'doc' && parsed.content) {
                return (
                    <div className={`rich-text ${className}`}>
                        {parsed.content.map((node: any, index: number) => {
                            if (node.type === 'paragraph') {
                                return (
                                    <p key={index} className="mb-2">
                                        {node.content?.map((textNode: any, textIndex: number) => {
                                            let text = textNode.text || '';
                                            let element = <span key={textIndex}>{text}</span>;

                                            // Apply marks (bold, italic, etc.)
                                            if (textNode.marks) {
                                                textNode.marks.forEach((mark: any) => {
                                                    if (mark.type === 'bold') {
                                                        element = <strong key={textIndex}>{text}</strong>;
                                                    } else if (mark.type === 'italic') {
                                                        element = <em key={textIndex}>{text}</em>;
                                                    } else if (mark.type === 'underline') {
                                                        element = <u key={textIndex}>{text}</u>;
                                                    }
                                                });
                                            }

                                            return element;
                                        })}
                                    </p>
                                );
                            } else if (node.type === 'heading') {
                                const HeadingTag = `h${node.attrs?.level || 3}` as keyof JSX.IntrinsicElements;
                                return (
                                    <HeadingTag key={index} className="font-semibold mb-2">
                                        {node.content?.map((textNode: any) => textNode.text).join('')}
                                    </HeadingTag>
                                );
                            } else if (node.type === 'image') {
                                return (
                                    <img
                                        key={index}
                                        src={node.attrs?.src}
                                        alt={node.attrs?.alt || ''}
                                        className="max-w-full h-auto rounded-lg my-2"
                                    />
                                );
                            }
                            return null;
                        })}
                    </div>
                );
            }

            // If it's Lexical JSON format
            if (parsed.root && parsed.root.children) {
                // Add Lexical rendering logic here if needed
                return <div className={className}>{JSON.stringify(parsed, null, 2)}</div>;
            }

            // Fallback for unknown JSON format
            return <div className={className}>{content}</div>;
        } catch (error) {
            // If parsing fails, render as plain text
            return <div className={className}>{content}</div>;
        }
    };

    // Render plain text or rich text
    if (isJSON(content)) {
        return renderRichText(content);
    }

    // Plain text rendering with proper line breaks
    return (
        <div className={className} style={{ whiteSpace: 'pre-wrap' }}>
            {content}
        </div>
    );
}
