import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

export const FeatureList: FeatureItem[] = [
  {
    title: 'Plain Text Testing',
    Svg: require('@site/static/img/feature_plain_text.svg').default,
    description: (
      <>
        All test tasks are plain Markdown files — no scripting required. Write
        automation in plain language. <a href="/docs/reference/test-task-manual">Manage Test Tasks</a>
      </>
    ),
  },
  {
    title: 'Minimal Token Usage',
    Svg: require('@site/static/img/feature_minimize_tokens.svg').default,
    description: (
      <>
        Handles complex scenarios and large chained test suites without hitting
        token limits. Efficient token handling reduces real-world test costs 
        to pennies per test case.{' '}
        <a href="/docs/how-it-works/benchmark-report">AI Benchmark</a>
      </>
    ),
  },
  {
    title: 'Fully Harnessed',
    Svg: require('@site/static/img/feature_harnessed.svg').default,
    description: (
      <>
        The agent is isolated through multiple layers of permission controls,
        from the container down to individual tools.{' '}
        <a href="/docs/how-it-works/permissions">Agent Permissions</a>
      </>
    ),
  },
  {
    title: 'AI Agnostic',
    Svg: require('@site/static/img/feature_provider_agnostic.svg').default,
    description: (
      <>
        Supports all major AI providers: Claude, OpenAI, Google Gemini, 
        DeepSeek, and Gemma 4.{' '}
        <a href="/docs/reference/provider-guide">Provider Guide</a>
      </>
    ),
  },
  {
    title: 'Easy to Use',
    Svg: require('@site/static/img/feature_easy_to_use.svg').default,
    description: (
      <>
        Delivered as a Docker image. Configure once and integrate seamlessly
        into your development, CI/CD, or QA pipeline. {' '}
        <a href="https://hub.docker.com/r/taojdcn/duotail-waterwheel">Waterwheel Docker Page</a>
      </>
    ),
  },
  {
    title: 'Nested Agent Loops',
    Svg: require('@site/static/img/feature_agent_loops.svg').default,
    description: (
      <>
        Pair the agent with a code agent to wrap an autonomous browser test
        loop in a test-and-fix coding loop. {' '}
        <a href="/docs/guides/agent-loops">Agent Loops</a>
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4', styles.featureCol)}>
      <div className={styles.featureCard}>
        <div className="text--center">
          <Svg className={styles.featureSvg} role="img" />
        </div>
        <div className="text--center padding-horiz--md">
          <Heading as="h3" className={styles.featureTitle}>
            {title}
          </Heading>
          <p className={styles.featureText}>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="text--center">
          <Heading as="h2" className={styles.featuresHeading}>
            Built for real-world QA
          </Heading>
          <p className={styles.featuresSubtitle}>
            Everything you need to automate front-end testing without the
            usual maintenance tax.
          </p>
        </div>
        <div className={clsx('row', styles.featuresRow)}>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
