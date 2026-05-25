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
        automation in plain language. <a href="/docs/test-task-manual">Manage Test Tasks</a>
      </>
    ),
  },
  {
    title: 'Minimal Token Usage',
    Svg: require('@site/static/img/feature_minimize_tokens.svg').default,
    description: (
      <>
        Handles complex scenarios and large chained test suites without hitting
        token limits. Real-world tests average as little as $0.02 per test case.{' '}
        <a href="/docs/benchmark-report">AI Benchmark</a>
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
        <a href="/docs/permissions">Agent Permissions</a>
      </>
    ),
  },
  {
    title: 'AI Agnostic',
    Svg: require('@site/static/img/feature_provider_agnostic.svg').default,
    description: (
      <>
        Supports all major AI providers: Claude, OpenAI, Google Gemini, and
        DeepSeek.
      </>
    ),
  },
  {
    title: 'Easy to Use',
    Svg: require('@site/static/img/feature_easy_to_use.svg').default,
    description: (
      <>
        Delivered as a Docker image. Configure once and integrate seamlessly
        into your development, CI/CD, or QA pipeline.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={clsx('row', styles.featuresRow)}>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
