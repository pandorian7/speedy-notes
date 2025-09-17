'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Bold, Italic, Underline, List, ListOrdered, AlignLeft, AlignCenter, AlignRight,
  Download, Undo, Redo, Share2, FileText, Printer
} from 'lucide-react';
import styles from './Editor.module.css';

interface User {
  id: string;
  name: string;
  color: string;
}

const collaborators: User[] = [
  { id: '1', name: 'You', color: '#4285f4' },
  { id: '2', name: 'John Doe', color: '#34a853' },
  { id: '3', name: 'Jane Smith', color: '#ea4335' }
];

const SpeedyNotesEditor: React.FC = () => {
  const [documentState, setDocumentState] = useState({
    title: 'Untitled Document',
    content: 'Welcome to SpeedyNotes!\nThis is a collaborative note-taking application.',
    lastSaved: new Date(),
  });
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentFormat, setCurrentFormat] = useState({ bold: false, italic: false, underline: false });
  const [mounted, setMounted] = useState(false);

  const editorRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => setMounted(true), []);

  // Save to history for undo/redo
  const saveToHistory = useCallback(() => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      setHistory(prev => {
        const newHistory = prev.slice(0, historyIndex + 1);
        newHistory.push(content);
        return newHistory.slice(-50);
      });
      setHistoryIndex(prev => prev + 1);
    }
  }, [historyIndex]);

  // Auto-save
  useEffect(() => {
    if (editorRef.current && history.length === 0) saveToHistory();

    const interval = setInterval(() => {
      if (editorRef.current && editorRef.current.innerHTML !== documentState.content) {
        setIsAutoSaving(true);
        setTimeout(() => {
          setDocumentState(prev => ({
            ...prev,
            content: editorRef.current?.innerHTML || '',
            lastSaved: new Date()
          }));
          setIsAutoSaving(false);
        }, 500);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [documentState.content, history.length, saveToHistory]);

  // Apply command
  const execCmd = (command: string, value?: string) => {
    saveToHistory();
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    updateCurrentFormat();
  };

  // Update toolbar format
  const updateCurrentFormat = () => {
    setCurrentFormat({
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
    });
  };

  // Listen to selection changes for toolbar updates
  useEffect(() => {
    const handleSelectionChange = () => {
      updateCurrentFormat();
    };
    document.addEventListener('selectionchange', handleSelectionChange);
    return () => document.removeEventListener('selectionchange', handleSelectionChange);
  }, []);

  // Undo / Redo
  const undo = () => { if (historyIndex > 0) setHistoryIndex(prev => prev - 1); };
  const redo = () => { if (historyIndex < history.length - 1) setHistoryIndex(prev => prev + 1); };

  // Word / Character count
  const getWordCount = () => {
    const text = editorRef.current?.innerText || '';
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  };
  const getCharCount = () => editorRef.current?.innerText?.length || 0;

  // Export
  const handleExport = () => {
    const format = (document.querySelector<HTMLInputElement>('input[name="format"]:checked')?.value) || 'pdf';
    if (format === 'pdf') window.print();
    else alert(`Exporting as ${format}...`);
    setShowExportModal(false);
  };

  // Update editor content on history change
  useEffect(() => {
    if (editorRef.current && historyIndex >= 0 && history.length > 0) {
      editorRef.current.innerHTML = history[historyIndex];
    }
  }, [historyIndex, history]);

  return (
    <div className={styles.speedynotesContainer}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.logo}>
          <FileText className={styles.logoIcon} size={32} />
          <span>SpeedyNotes</span>
        </div>
        <div className={styles.documentInfo}>
          <input
            ref={titleRef}
            type="text"
            className={styles.documentTitle}
            value={documentState.title}
            onChange={e => setDocumentState(prev => ({ ...prev, title: e.target.value }))}
          />
          <div className={styles.documentStatus}>
            {isAutoSaving ? 'Saving...' : mounted && `Last saved: ${documentState.lastSaved.toLocaleTimeString()}`}
          </div>
        </div>
        <div className={styles.headerActions}>
          <div className={styles.collaboratorAvatars}>
            {collaborators.map(c => (
              <div key={c.id} className={styles.collaboratorAvatar} style={{ backgroundColor: c.color }} title={c.name}>
                {c.name.charAt(0)}
              </div>
            ))}
          </div>
          <button className={styles.shareBtn} onClick={() => setShowShareModal(true)}>
            <Share2 size={16} /> Share
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className={styles.toolbar}>
        <button onClick={undo} disabled={historyIndex <= 0}><Undo size={16} /></button>
        <button onClick={redo} disabled={historyIndex >= history.length - 1}><Redo size={16} /></button>
        <button onClick={() => execCmd('bold')} className={currentFormat.bold ? styles.active : ''}><Bold size={16} /></button>
        <button onClick={() => execCmd('italic')} className={currentFormat.italic ? styles.active : ''}><Italic size={16} /></button>
        <button onClick={() => execCmd('underline')} className={currentFormat.underline ? styles.active : ''}><Underline size={16} /></button>
        <button onClick={() => execCmd('insertUnorderedList')}><List size={16} /></button>
        <button onClick={() => execCmd('insertOrderedList')}><ListOrdered size={16} /></button>
        <button onClick={() => execCmd('justifyLeft')}><AlignLeft size={16} /></button>
        <button onClick={() => execCmd('justifyCenter')}><AlignCenter size={16} /></button>
        <button onClick={() => execCmd('justifyRight')}><AlignRight size={16} /></button>
        <button onClick={() => setShowExportModal(true)}><Download size={16} /></button>
        <button onClick={() => window.print()}><Printer size={16} /></button>
      </div>

      {/* Editor */}
      <div className={styles.editorContainer}>
        <div
          ref={editorRef}
          className={styles.editor}
          contentEditable
          suppressContentEditableWarning
          onInput={() => setDocumentState(prev => ({ ...prev, content: editorRef.current?.innerHTML || '' }))}
        >
          {documentState.content}
        </div>
      </div>

      {/* Status */}
      <div className={styles.statusBar}>
        <span>Words: {getWordCount()}</span>
        <span>Characters: {getCharCount()}</span>
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Export Document</h2>
            <label><input type="radio" name="format" value="pdf" defaultChecked /> PDF</label>
            <label><input type="radio" name="format" value="docx" /> DOCX</label>
            <div className={styles.modalActions}>
              <button onClick={() => setShowExportModal(false)}>Cancel</button>
              <button onClick={handleExport}>Export</button>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Share Document</h2>
            <p>Share functionality will be implemented here.</p>
            <div className={styles.modalActions}>
              <button onClick={() => setShowShareModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpeedyNotesEditor;
