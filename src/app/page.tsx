"use client";

import React from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";


import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";
interface HomeProps {
  user?: boolean;
}

const Home: React.FC<HomeProps> = ({ user }) => {

  const router = useRouter();

  const handleEnter = async () => {
    console.log(auth)
    if (auth.currentUser) {
      router.push("/home");
    } else {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        router.push("/home");
        console.log(result.user);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className={styles["home-container"]}>
      {/* Hero Section */}
      <section className={styles["hero-section"]}>
        <div className={styles["hero-content"]}>
          <div className={styles["hero-text"]}>
            <h1 className={styles["hero-title"]}>
              Welcome to <span className={styles["brand-highlight"]}>SpeedyNotes</span>
            </h1>
            <p className={styles["hero-subtitle"]}>
              Your fast, organized, and intuitive digital note-taking app
            </p>

            {/* Stats */}
            <div className={styles["hero-stats"]}>
              <div className={styles["stat-item"]}>
                <span className={styles["stat-number"]}>50k+</span>
                <span className={styles["stat-label"]}>Active Users</span>
              </div>
              <div className={styles["stat-item"]}>
                <span className={styles["stat-number"]}>200k+</span>
                <span className={styles["stat-label"]}>Notes Created</span>
              </div>
              <div className={styles["stat-item"]}>
                <span className={styles["stat-number"]}>99%</span>
                <span className={styles["stat-label"]}>User Satisfaction</span>
              </div>
            </div>

            {/* Buttons */}
            <div className={styles["hero-buttons"]}>
              {!user ? (
                <>
                  <div className={`${styles["cta-button"]} ${styles["primary"]}`} onClick={handleEnter}>
                    Start Taking Notes
                  </div>
                </>
              ) : (
                <>
                  <Link href="/notes" className={`${styles["cta-button"]} ${styles["primary"]}`}>
                    View Notes
                  </Link>
                  <Link href="/new-note" className={`${styles["cta-button"]} ${styles["secondary"]}`}>
                    Create New Note
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Hero Visual Cards */}

        </div>
      </section>

      {/* Features Section */}
      <section className={styles["features-section"]}>
        <div className={styles["section-header"]}>
          <h1 className={styles["hero-title2"]}>
            Everything you need <br />
            <span className={styles["brand-highlight2"]}>to stay productive</span>
          </h1>
          <p className={styles["section-subtitle"]}>
            Powerful tools to help you capture ideas, organize notes, and boost your productivity
          </p>
        </div>
        <div className={styles["features-grid"]}>
          <div className={styles["feature-card"]}>
            <div className={styles["feature-content"]}>
              <h3>Quick Capture</h3>
              <p>Take notes instantly with minimal clicks and distraction-free interface.</p>
              <ul className={styles["feature-list"]}>
                <li>Fast text editor</li>
                <li>Shortcut support</li>
                <li>Markdown formatting</li>
              </ul>
            </div>
          </div>

          <div className={`${styles["feature-card"]} ${styles["feature"]}`}>
            <div className={styles["featured-badge"]}>Most Popular</div>
            <div className={styles["feature-content"]}>
              <h3>Organized Folders</h3>
              <p>Keep your notes categorized with folders, tags, and smart search options.</p>
              <ul className={styles["feature-list"]}>
                <li>Unlimited folders</li>
                <li>Tag system</li>
                <li>Easy search & filter</li>
              </ul>
            </div>
          </div>

          <div className={styles["feature-card"]}>
            <div className={styles["feature-content"]}>
              <h3>Cloud Sync</h3>
              <p>Access your notes anytime, anywhere, and across all devices.</p>
              <ul className={styles["feature-list"]}>
                <li>Automatic backup</li>
                <li>Multi-device sync</li>
                <li>Offline mode</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className={styles["benefits-section"]}>
        <div className={styles["benefits-container"]}>
          <div className={styles["benefits-content"]}>
            <h1 className={styles["hero-title2"]}>
              Why choose <span className={styles["brand-highlight2"]}>SpeedyNotes?</span>
            </h1>
            <div className={styles["benefits-list"]}>
              <div className={styles["benefit-item"]}>
                <div className={styles["benefit-icon"]}>🔒</div>
                <div>
                  <h4>Secure Notes</h4>
                  <p>Your data is private and encrypted for safety.</p>
                </div>
              </div>
              <div className={styles["benefit-item"]}>
                <div className={styles["benefit-icon"]}>⚡</div>
                <div>
                  <h4>Fast & Lightweight</h4>
                  <p>Experience lightning-fast note-taking with zero lag.</p>
                </div>
              </div>
              <div className={styles["benefit-item"]}>
                <div className={styles["benefit-icon"]}>💻</div>
                <div>
                  <h4>Multi-Device</h4>
                  <p>Access your notes on desktop, tablet, and mobile.</p>
                </div>
              </div>
              <div className={styles["benefit-item"]}>
                <div className={styles["benefit-icon"]}>🆓</div>
                <div>
                  <h4>Free to Use</h4>
                  <p>All essential features available at no cost.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className={styles["cta-section"]}>
        <h2>Ready to organize your ideas?</h2>
        <p>Start using SpeedyNotes today and take control of your productivity.</p>
        {!user && (
          <Link href="/signup" className={styles["cta-final-button"]}>
            Get Started for Free
          </Link>
        )}
      </section>
    </div>
  );
};

export default Home;
