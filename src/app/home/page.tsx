"use client";

import React, { useState } from 'react';
import { 
  Plus, 
  FileText, 
  Zap,
  Settings,
  Bell,
  User,
  MoreVertical,
  Star,
  Share,
  Trash2,
  Grid3X3,
  List,
  Calendar,
  BookOpen,
  Lightbulb
} from 'lucide-react';
import styles from './Home.module.css';

const HomePage = () => {
  const [viewMode, setViewMode] = useState('list');
  const [recentNotes] = useState([
    {
      id: 1,
      title: "Meeting Notes - Q4 Planning",
      preview: "Discussed budget allocation and team restructuring for next quarter...",
      lastModified: "2 hours ago",
      owner: "You",
      icon: FileText
    },
    {
      id: 2,
      title: "Recipe Collection",
      preview: "Grandmother's secret chocolate chip cookie recipe and variations...",
      lastModified: "Yesterday",
      owner: "You",
      icon: FileText
    },
    {
      id: 3,
      title: "Book Notes - Atomic Habits",
      preview: "Key insights on habit formation and behavior change strategies...",
      lastModified: "3 days ago",
      owner: "You",
      icon: BookOpen
    },
    {
      id: 4,
      title: "Project Ideas",
      preview: "Mobile app concepts, web development projects, and startup ideas...",
      lastModified: "1 week ago",
      owner: "You",
      icon: Lightbulb
    },
    {
      id: 5,
      title: "Travel Itinerary - Japan",
      preview: "Tokyo, Kyoto, Osaka - places to visit, restaurants, and accommodations...",
      lastModified: "2 weeks ago",
      owner: "You",
      icon: Calendar
    }
  ]);

  const templates = [
    { icon: Plus, label: "Blank", isNew: true },
    { icon: FileText, label: "Note" },
    { icon: BookOpen, label: "Journal" },
    { icon: Calendar, label: "Planner" },
    { icon: Lightbulb, label: "Ideas" }
  ];

  const createNewNote = () => {
    console.log('Creating new note...');
  };

 const openNote = (noteId: number) => {
  console.log('Opening note:', noteId);
};


  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logoSection}>
            <div className={styles.logoIcon}>
              <Zap className={styles.logoIconSvg} />
            </div>
            <span className={styles.logoText}>SpeedyNotes</span>
          </div>
          
          <div className={styles.headerActions}>
            <button className={styles.headerButton}>
              <Bell className={styles.headerButtonIcon} />
            </button>
            <button className={styles.headerButton}>
              <Settings className={styles.headerButtonIcon} />
            </button>
            <button className={styles.headerButton}>
              <User className={styles.headerButtonIcon} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        {/* Welcome Section */}
        <div className={styles.welcomeSection}>
          <h1 className={styles.welcomeTitle}>Welcome back</h1>
          <p className={styles.welcomeSubtitle}>Pick up where you left off or start something new</p>
        </div>

        {/* Templates Section */}
        <section className={styles.templateSection}>
          <h2 className={styles.sectionTitle}>Start a new note</h2>
          <div className={styles.templateGrid}>
            {templates.map((template, index) => {
              const IconComponent = template.icon;
              return (
                <div
                  key={index}
                  className={`${styles.templateCard} ${template.isNew ? styles.newNote : ''}`}
                  onClick={template.isNew ? createNewNote : () => console.log('Template:', template.label)}
                >
                  <IconComponent 
                    className={template.isNew ? styles.newNoteIcon : styles.templateIcon} 
                  />
                  <span className={styles.templateLabel}>{template.label}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Recent Notes Section */}
        <section className={styles.recentSection}>
          <div className={styles.recentHeader}>
            <h2 className={styles.sectionTitle}>Recent notes</h2>
            <div className={styles.viewOptions}>
              <button 
                className={`${styles.viewButton} ${viewMode === 'list' ? styles.active : ''}`}
                onClick={() => setViewMode('list')}
              >
                <List className={styles.viewButtonIcon} />
              </button>
              <button 
                className={`${styles.viewButton} ${viewMode === 'grid' ? styles.active : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className={styles.viewButtonIcon} />
              </button>
            </div>
          </div>

          {recentNotes.length === 0 ? (
            <div className={styles.emptyState}>
              <FileText className={styles.emptyIcon} />
              <h3 className={styles.emptyTitle}>No notes yet</h3>
              <p className={styles.emptyDescription}>Create your first note to get started</p>
            </div>
          ) : viewMode === 'list' ? (
            <div className={styles.notesList}>
              {recentNotes.map((note) => {
                const IconComponent = note.icon;
                return (
                  <div
                    key={note.id}
                    className={styles.noteItem}
                    onClick={() => openNote(note.id)}
                  >
                    <IconComponent className={styles.noteIcon} />
                    <div className={styles.noteContent}>
                      <h3 className={styles.noteTitle}>{note.title}</h3>
                      <p className={styles.notePreview}>{note.preview}</p>
                    </div>
                    <div className={styles.noteInfo}>
                      <span className={styles.noteOwner}>{note.owner}</span>
                      <span className={styles.noteDate}>{note.lastModified}</span>
                    </div>
                    <div className={styles.noteActions}>
                      <button className={styles.actionButton}>
                        <Star className={styles.actionButtonIcon} />
                      </button>
                      <button className={styles.actionButton}>
                        <Share className={styles.actionButtonIcon} />
                      </button>
                      <button className={styles.actionButton}>
                        <MoreVertical className={styles.actionButtonIcon} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className={styles.notesGrid}>
              {recentNotes.map((note) => {
                const IconComponent = note.icon;
                return (
                  <div
                    key={note.id}
                    className={styles.noteCard}
                    onClick={() => openNote(note.id)}
                  >
                    <div className={styles.noteCardHeader}>
                      <IconComponent className={styles.noteCardIcon} />
                      <h3 className={styles.noteCardTitle}>{note.title}</h3>
                    </div>
                    <div className={styles.noteCardContent}>
                      {note.preview}
                    </div>
                    <div className={styles.noteCardFooter}>
                      <span className={styles.noteCardDate}>{note.lastModified}</span>
                      <div className={styles.noteCardActions}>
                        <button className={styles.actionButton}>
                          <Star className={styles.actionButtonIcon} />
                        </button>
                        <button className={styles.actionButton}>
                          <MoreVertical className={styles.actionButtonIcon} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default HomePage;