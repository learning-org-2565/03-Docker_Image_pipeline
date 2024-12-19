import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Heading from '@tiptap/extension-heading';
import CodeBlock from '@tiptap/extension-code-block';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  const addImage = () => {
    const url = window.prompt('Enter image URL');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="editor-menu">
      <div className="menu-group">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`menu-button ${editor.isActive('bold') ? 'is-active' : ''}`}
          title="Bold"
        >
          <i className="fas fa-bold"></i>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`menu-button ${editor.isActive('italic') ? 'is-active' : ''}`}
          title="Italic"
        >
          <i className="fas fa-italic"></i>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`menu-button ${editor.isActive('strike') ? 'is-active' : ''}`}
          title="Strike"
        >
          <i className="fas fa-strikethrough"></i>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={`menu-button ${editor.isActive('code') ? 'is-active' : ''}`}
          title="Inline Code"
        >
          <i className="fas fa-code"></i>
        </button>
      </div>

      <div className="menu-group">
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`menu-button ${editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}`}
          title="Heading 1"
        >
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`menu-button ${editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}`}
          title="Heading 2"
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`menu-button ${editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}`}
          title="Heading 3"
        >
          H3
        </button>
      </div>

      <div className="menu-group">
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`menu-button ${editor.isActive('bulletList') ? 'is-active' : ''}`}
          title="Bullet List"
        >
          <i className="fas fa-list-ul"></i>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`menu-button ${editor.isActive('orderedList') ? 'is-active' : ''}`}
          title="Numbered List"
        >
          <i className="fas fa-list-ol"></i>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`menu-button ${editor.isActive('codeBlock') ? 'is-active' : ''}`}
          title="Code Block"
        >
          <i className="fas fa-file-code"></i>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`menu-button ${editor.isActive('blockquote') ? 'is-active' : ''}`}
          title="Quote"
        >
          <i className="fas fa-quote-right"></i>
        </button>
      </div>

      <div className="menu-group">
        <button
          onClick={addImage}
          className="menu-button"
          title="Add Image"
        >
          <i className="fas fa-image"></i>
        </button>
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="menu-button"
          title="Horizontal Line"
        >
          <i className="fas fa-minus"></i>
        </button>
      </div>
    </div>
  );
};

const Editor = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3]
        }
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
      },
    },
    onUpdate: ({ editor }) => {
      try {
        onChange(editor.getHTML());
      } catch (error) {
        console.error('Editor update error:', error);
      }
    },
  });

  // Add character count storage
  React.useEffect(() => {
    if (editor) {
      editor.storage.characterCount = {
        words: () => {
          const text = editor.state.doc.textContent;
          return text.trim().split(/\s+/).length;
        }
      };
    }
  }, [editor]);

  return (
    <div className="editor-container">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="editor-content" />
      <div className="editor-status">
        {editor && (
          <div className="word-count">
            Words: {editor?.storage?.characterCount?.words?.() || 0}
          </div>
        )}
      </div>
    </div>
  );
};

export default Editor;
