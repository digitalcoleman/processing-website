import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';
import { Link } from 'gatsby';
import classnames from 'classnames';
import { useIntl } from 'react-intl';

import Layout from '../components/Layout';
import P5Wrapper from '../components/P5Wrapper';
import Sidebar from '../components/Sidebar';
import Tabs from '../components/Tabs';
import sketch from './ArrayObjects';

import css from '../styles/templates/example-template.module.css';
import grid from '../styles/grid.module.css';

const ExampleTemplate = ({ data, pageContext }) => {
  const [show, setShow] = useState(false);
  const intl = useIntl();
  // console.log(`content/${pageContext.relDir}`);
  // const path = `../../content/examples/${pageContext.relDir}/sketch`;
  // const sketch1 = require(path);
  // console.log(sketch1);

  let json, subcategory;

  if (data.json !== null) {
    json = data.json;
    subcategory = data.json.relativeDirectory.split('/')[1];
  }

  const mainPde = data.pdes.nodes.find(
    (pde) => pde.name === pageContext.name.split('.')[0]
  );

  const orderedPdes = data.pdes.nodes.filter(
    (pde) => pde.name !== pageContext.name.split('.')[0]
  );

  orderedPdes.unshift(mainPde);

  const related = data.examples.nodes.filter(
    (item) => item.relativeDirectory.split('/')[1] === subcategory
  );

  const toggleSidebar = (show) => {
    setShow(show);
  };

  return (
    <Layout>
      <Sidebar
        items={data.examples}
        onChange={toggleSidebar}
        show={show}
        type={'examples'}
      />
      {data.json !== null ? (
        <div
          className={classnames(
            css.root,
            { [css.collapsed]: !show },
            { [css.expanded]: show }
          )}>
          <div className={classnames(css.section, grid.grid)}>
            <h1 className={grid.col}>{json.childJson.title}</h1>
            {json.childJson.author && (
              <h3 className={grid.col}>
                {' '}
                {intl.formatMessage({ id: 'by' })} {json.childJson.author}
              </h3>
            )}
            <div className={classnames(grid.col, css.description)}>
              <p
                dangerouslySetInnerHTML={{
                  __html: json.childJson.description,
                }}></p>
            </div>
            {json.childJson.featured.length > 0 && (
              <div className={classnames(grid.col, css.featured)}>
                <h3>{intl.formatMessage({ id: 'featured' })}</h3>
                <ul>
                  {json.childJson.featured.map((feature, key) => (
                    <li key={key + 'f'}>
                      <Link to={feature}>{feature}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className={classnames(css.exampleSketch, grid.col)}>
              <P5Wrapper sketch={sketch} responsive={true} />
            </div>
            <Tabs pdes={orderedPdes} />
            {related.length > 0 && (
              <div className={classnames(css.relatedWrapper, grid.nested)}>
                <h3 className={grid.col}>
                  {intl.formatMessage({ id: 'relatedExamples' })}
                </h3>
                <ul className={css.related}>
                  {related.slice(0, 6).map((rel, key) => {
                    return (
                      rel.relativeDirectory !== pageContext.relDir && (
                        <li key={key + 'rel'}>
                          <Link to={'../' + rel.name.toLowerCase() + '.html'}>
                            <div className={css.placeholder}></div>
                            <span className={css.relatedName}>{rel.name}</span>
                          </Link>
                        </li>
                      )
                    );
                  })}
                </ul>
              </div>
            )}
            <p className={classnames(grid.col, css.note)}>
              {intl.formatMessage({ id: 'exampleInfo' })}
              <a
                href={
                  'https://github.com/processing/processing-docs/issues?state=open'
                }>
                {intl.formatMessage({ id: 'letUsKnow' })}
              </a>
              .
            </p>
          </div>
        </div>
      ) : (
        <div
          className={classnames(
            grid.grid,
            { [css.collapsed]: !show },
            { [css.expanded]: show }
          )}>
          <div className={classnames(grid.push1)}>
            {intl.formatMessage({ id: 'notTranslated' })}
            <Link to={pageContext.slug}>
              {' '}
              {intl.formatMessage({ id: 'englishPage' })}
            </Link>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ExampleTemplate;

export const query = graphql`
  query($name: String!, $relDir: String!, $locale: String!) {
    json: file(
      fields: { name: { eq: $name }, lang: { eq: $locale } }
      sourceInstanceName: { eq: "examples" }
    ) {
      relativeDirectory
      childJson {
        name
        title
        author
        description
        featured
      }
    }
    pdes: allFile(
      filter: {
        relativeDirectory: { eq: $relDir }
        extension: { regex: "/(pde)/" }
      }
    ) {
      nodes {
        name
        internal {
          content
        }
      }
    }
    sketch: allFile(
      filter: {
        relativeDirectory: { eq: $relDir }
        extension: { regex: "/(js)/" }
      }
    ) {
      nodes {
        name
        internal {
          content
        }
      }
    }
    examples: allFile(
      filter: {
        sourceInstanceName: { eq: "examples" }
        fields: { lang: { eq: "en" } }
      }
    ) {
      nodes {
        name
        relativeDirectory
        childJson {
          name
          title
        }
      }
    }
    image: allFile(
      filter: {
        relativeDirectory: { eq: $relDir }
        extension: { regex: "/(png)/" }
      }
    ) {
      nodes {
        name
        relativeDirectory
        childImageSharp {
          fluid(maxWidth: 162) {
            base64
            srcWebp
            srcSetWebp
            originalImg
            originalName
          }
        }
      }
    }
  }
`;
