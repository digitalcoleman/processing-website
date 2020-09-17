import React from 'react';
import { LocalizedLink as Link } from 'gatsby-theme-i18n';
import { useLocalization } from 'gatsby-theme-i18n';

import Image from './Image';

const ExSubcategoryList = (props) => {
  const { subcategory, subcategoryRefs, link } = props;
  const { locale } = useLocalization();

  return (
    <div>
      <h3>{subcategory}</h3>
      <ul>
        {subcategoryRefs.map((node, key) => {
          return (
            <li key={key}>
              <Link to={node.childMdx.frontmatter.slug} language={locale}>
                {node.childMdx.frontmatter.img && <Image />}
                <h4>{node.childMdx.frontmatter.title}</h4>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ExSubcategoryList;