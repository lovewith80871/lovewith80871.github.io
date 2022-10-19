import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title"></h1>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ textAlign: 'left' }}>
            <h3>關於我以及此部落格：</h3>
            <p>
              Hi 我是 Henry，目前是一名軟體工程師，專注於前端領域。
              <br />
              對於有興趣的技術或文章，都會想寫成文章記錄下來。
              <br />
              期許這部落格能做到以下兩點～
            </p>
            <div style={{ display: 'flex' }}>
              <ul style={{ textAlign: 'left' }}>
                <li>幫助自己記憶和複習所學習過的技術</li>
                <li>若文章內容能幫助到別人，那也很不錯！</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />
      <main>{/* <HomepageFeatures /> */}</main>
    </Layout>
  );
}
