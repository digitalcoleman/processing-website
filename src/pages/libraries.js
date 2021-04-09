import React, { useState, memo } from 'react';
import { Helmet } from 'react-helmet';
import classnames from 'classnames';
import { graphql } from 'gatsby';
import unique from 'array-unique';
import { useIntl } from 'react-intl';

import { LocalizedLink as Link } from 'gatsby-theme-i18n';
import { useLocalization } from 'gatsby-theme-i18n';

import CategoryNav from '../components/CategoryNav';
import Donate from '../components/character/Donate';
import Layout from '../components/Layout';
import FilterBar from '../components/FilterBar';

import { useFilteredArray } from '../hooks';
import { usePreparedContributions } from '../hooks/libraries';
import { referencePath } from '../utils/paths';

import css from '../styles/pages/libraries.module.css';
import grid from '../styles/grid.module.css';

const Libraries = ({ data }) => {
  const { locale } = useLocalization();
  const intl = useIntl();
  const { coreLibraries, currentLang, english } = data;
  const [searchTerm, setSearchTerm] = useState('');

  const contributions = usePreparedContributions(
    english.nodes,
    currentLang.nodes,
    locale
  );

  const filtered = useFilteredArray(contributions, searchTerm);
  const categories = unique(filtered.flatMap((con) => con.categories));

  return (
    <Layout>
      <Helmet>
        <title>Libraries</title>
      </Helmet>
      <div className={classnames(grid.grid, css.root)}>
        <Donate />
        <h1 className={grid.col}>{intl.formatMessage({ id: 'libraries' })}</h1>
        <h3 className={grid.col}>
          {intl.formatMessage({ id: 'librariesIntro' })}
        </h3>
        <CoreList libraries={coreLibraries} locale={locale} />
        <h1 className={grid.col}>
          {intl.formatMessage({ id: 'contributions' })}
        </h1>
        <FilterBar
          placeholder={intl.formatMessage({ id: 'librariesFilter' })}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClick={(e) => setSearchTerm('')}
          searchTerm={searchTerm}
          large
        />
        <CategoryNav categories={categories} />
        <ContributionsList libraries={filtered} categories={categories} />
      </div>
    </Layout>
  );
};

const CoreList = memo(({ libraries, locale }) => {
  return (
    <div className={classnames(grid.nest, css.listWrapper)}>
      <h2 className={grid.col}>Core</h2>
      <ul className={css.list}>
        {libraries.nodes.map((node, key) => {
          return (
            <li key={key} className={css.subgrid}>
              <Link
                className={classnames(css.librarieName, grid.col)}
                to={referencePath('index', node.frontmatter.name)}
                language={locale}>
                <h3>{node.frontmatter.title}</h3>
              </Link>
              <p className={grid.col}>{node.frontmatter.description}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
});

const ContributionsList = memo(({ categories, libraries }) => {
  return (
    <ul className={classnames(grid.nest, css.contributionsList)}>
      {categories.map((cat) => {
        const filtered = libraries.filter((c) => c.categories.includes(cat));
        return (
          <li key={cat} className={grid.nest}>
            <h2 className={grid.col} id={cat}>
              {cat}
            </h2>
            <ul className={classnames(grid.col, grid.nest)}>
              {filtered.map((node, key) => {
                return (
                  <li key={key + 'c'} className={css.subgrid}>
                    <div className={classnames(grid.col, css.contributionData)}>
                      <h3>
                        <a href={node.url} target="_blank" rel="noreferrer">
                          {node.name}
                        </a>
                      </h3>
                      {node.authors.map((author, key) => (
                        <a
                          key={key + 'a'}
                          href={author.slice(
                            author.indexOf('(') + 1,
                            author.indexOf(')')
                          )}
                          target="_blank"
                          rel="noreferrer"
                          className={css.contributionAuthor}>
                          {author.slice(
                            author.indexOf('[') + 1,
                            author.indexOf(']')
                          )}
                        </a>
                      ))}
                    </div>
                    <div
                      className={classnames(grid.col, css.contributionBrief)}>
                      <p>{node.sentence}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </li>
        );
      })}
    </ul>
  );
});

export default Libraries;

export const query = graphql`
  query($locale: String!) {
    coreLibraries: allMdx(
      filter: {
        frontmatter: { library: { eq: "true" } }
        fields: { locale: { eq: $locale } }
      }
    ) {
      nodes {
        frontmatter {
          name
          title
          description
        }
      }
    }
    currentLang: allFile(
      filter: {
        sourceInstanceName: { eq: "contributions" }
        fields: { lang: { eq: $locale } }
        childJson: { type: { eq: "library" } }
      }
    ) {
      nodes {
        name
        childJson {
          sentence
        }
      }
    }
    english: allFile(
      filter: {
        sourceInstanceName: { eq: "contributions" }
        fields: { lang: { eq: "en" } }
        childJson: { type: { eq: "library" } }
      }
    ) {
      nodes {
        name
        childJson {
          name
          url
          authors
          sentence
          categories
        }
      }
    }
  }
`;
