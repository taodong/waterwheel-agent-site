import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Waterwheel',
  tagline: 'AI browser test agent — write tests in plain English, skip the QA bottleneck',
  favicon: 'img/waterwheel_favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://waterwheel.duotail.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'taodong', // Usually your GitHub org/user name.
  projectName: 'waterwheel-agent-site', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        // The docs were reorganized into categories; keep every pre-category
        // URL resolving. Redirect pages are only emitted by `npm run build`,
        // not by `npm start`.
        redirects: [
          // The docs landing page is Quick Start.
          {from: '/docs', to: '/docs/getting-started/quick-start'},
          {from: '/docs/quick-start', to: '/docs/getting-started/quick-start'},
          {
            from: '/docs/write-your-first-test',
            to: '/docs/getting-started/write-your-first-test',
          },
          {
            from: '/docs/chain-tests-together',
            to: '/docs/getting-started/chain-tests-together',
          },
          {
            from: '/docs/create-test-skills',
            to: '/docs/getting-started/create-test-skills',
          },
          {from: '/docs/advanced-usage', to: '/docs/guides/docker-compose'},
          {from: '/docs/agent-loops', to: '/docs/guides/agent-loops'},
          {from: '/docs/token-efficiency', to: '/docs/guides/token-efficiency'},
          {from: '/docs/tuning', to: '/docs/guides/tuning'},
          {
            from: '/docs/test-task-manual',
            to: '/docs/reference/test-task-manual',
          },
          {from: '/docs/usage', to: '/docs/reference/usage'},
          {
            from: '/docs/env-vars-reference',
            to: '/docs/reference/env-vars-reference',
          },
          {from: '/docs/provider-guide', to: '/docs/reference/provider-guide'},
          {from: '/docs/permissions', to: '/docs/how-it-works/permissions'},
          {from: '/docs/mcp-guide', to: '/docs/how-it-works/mcp-guide'},
          {
            from: '/docs/benchmark-report',
            to: '/docs/how-it-works/benchmark-report',
          },
          {from: '/docs/release-notes', to: '/docs/about/release-notes'},
          {from: '/docs/support', to: '/docs/about/support'},
          {from: '/docs/license', to: '/docs/about/license'},
        ],
      },
    ],
  ],

  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        indexDocs: true,
        indexBlog: false,
        docsRouteBasePath: '/docs',
        language: ['en'],
      },
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/waterwheel_social_card.png',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Waterwheel',
      logo: {
        alt: 'Waterwheel Logo',
        src: 'img/waterwheel_128.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Document',
        },
        {
          type: 'search',
          position: 'right',
        },
        {
          href: 'https://hub.docker.com/r/taojdcn/duotail-waterwheel',
          label: 'Docker',
          position: 'right',
        },
        {
          href: 'https://github.com/taodong/duotail-greenhouse',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Document',
              to: '/docs/getting-started/quick-start',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.gg/6kDkXr5Teh',
            },
            {
              label: 'X',
              href: 'https://x.com/taodong_duotail',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Docker',
              href: 'https://hub.docker.com/r/taojdcn/duotail-waterwheel',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/taodong/duotail-greenhouse',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} duotail.com. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
