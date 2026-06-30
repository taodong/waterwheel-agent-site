import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import CodeBlock from '@theme/CodeBlock';
import Heading from '@theme/Heading';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

const SAMPLE_TEST = `# Test Wikipedia English Language Banner

## Success Condition
- [] Wikipedia is reachable.
- [] The English language entry point is clickable.
- [] The banner displays "Welcome to Wikipedia".

## Steps
1. Go to https://www.wikipedia.org.
2. Click the English language link.
3. Confirm the "Welcome to Wikipedia" banner is shown.`;

const HERO_BADGES = [
  'Plain-English Markdown tests',
  'Pennies per test case',
  'Any major AI provider',
  'Runs anywhere via Docker',
  'Nested agent loops',
  'Fully automated web development',
];

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className={clsx('hero__title', styles.heroTitle)}>
          {siteConfig.title}
        </Heading>
        <p className={clsx('hero__subtitle', styles.heroSubtitle)}>
          {siteConfig.tagline}
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/quick-start">
            Get Started — it&apos;s free
          </Link>
          <Link
            className={clsx('button button--lg', styles.heroGhostButton)}
            to="/docs/agent-loops">
            Explore the Agent Loops
          </Link>
        </div>
        <ul className={styles.heroBadges}>
          {HERO_BADGES.map((badge) => (
            <li key={badge} className={styles.heroBadge}>
              {badge}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

function HowItWorks() {
  return (
    <section className={styles.howItWorks}>
      <div className="container">
        <div className="text--center">
          <Heading as="h2" className={styles.sectionTitle}>
            Write a test the way you&apos;d describe it
          </Heading>
          <p className={styles.sectionSubtitle}>
            No selectors, no scripting, no flaky page objects. Describe the
            outcome in plain Markdown and let the agent drive the browser.
          </p>
        </div>
        <div className={clsx('row', styles.howItWorksRow)}>
          <div className="col col--6">
            <CodeBlock
              language="markdown"
              title="tasks/test-wikipedia-english.md">
              {SAMPLE_TEST}
            </CodeBlock>
          </div>
          <div className="col col--6">
            <ol className={styles.steps}>
              <li className={styles.step}>
                <span className={styles.stepNumber}>1</span>
                <div>
                  <Heading as="h3" className={styles.stepTitle}>
                    Describe it
                  </Heading>
                  <p>
                    Drop a Markdown file into your <code>tasks</code> folder
                    that states the steps and success conditions in plain
                    language.
                  </p>
                </div>
              </li>
              <li className={styles.step}>
                <span className={styles.stepNumber}>2</span>
                <div>
                  <Heading as="h3" className={styles.stepTitle}>
                    Run it
                  </Heading>
                  <p>
                    One <code>run-qa</code> command and the agent opens a real
                    browser, follows your steps, and reasons about the page.
                  </p>
                </div>
              </li>
              <li className={styles.step}>
                <span className={styles.stepNumber}>3</span>
                <div>
                  <Heading as="h3" className={styles.stepTitle}>
                    Read the result
                  </Heading>
                  <p>
                    Get a clear pass/fail report with a full diagnostic trail
                    when something breaks — no screenshots to decode.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

function CallToAction() {
  return (
    <section className={styles.cta}>
      <div className="container text--center">
        <Heading as="h2" className={styles.sectionTitle}>
          Skip the QA bottleneck
        </Heading>
        <div className={clsx('row', styles.ctaRow)}>
          <div className="col col--6">
            <div className={styles.ctaCard}>
              <Heading as="h3" className={styles.ctaCardTitle}>
                Run it yourself
              </Heading>
              <p className={styles.ctaCardText}>
                Pull the Docker image, point it at your site, and ship with
                confidence. Free to run on your own machine.
              </p>
              <div className={styles.ctaCode}>
                <CodeBlock language="bash">
                  docker pull taojdcn/duotail-waterwheel:1.3.0
                </CodeBlock>
              </div>
              <div className={styles.buttons}>
                <Link
                  className="button button--primary button--lg"
                  to="/docs/quick-start">
                  Read the Quick Start
                </Link>
              </div>
            </div>
          </div>
          <div className="col col--6">
            <div className={styles.ctaCard}>
              <Heading as="h3" className={styles.ctaCardTitle}>
                Let your code agent drive
              </Heading>
              <p className={styles.ctaCardText}>
                Add the skills to your code agent to run the full test-and-fix
                loop automatically.
              </p>
              <div className={styles.ctaCode}>
                <CodeBlock language="bash">
                  npx skills add taodong/duotail-waterwheel-skills --skill '*'
                </CodeBlock>
              </div>
              <div className={styles.buttons}>
                <Link
                  className="button button--secondary button--lg"
                  to="/docs/agent-loops">
                  Explore Agent Loops
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} — ${siteConfig.tagline}`}
      description="Waterwheel is an AI browser test agent. Write front-end tests in plain English, run them in Docker, and skip the QA bottleneck.">
      <HomepageHeader />
      <main>
        <HowItWorks />
        <HomepageFeatures />
        <CallToAction />
      </main>
    </Layout>
  );
}
