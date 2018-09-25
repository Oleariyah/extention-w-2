import * as classNames from 'classnames';
import * as React from 'react';

import { Category } from '@waldur/marketplace/types';

import { CategoryLink } from './CategoryLink';

interface CategoryItemProps {
  category: Category;
  active?: boolean;
}

export const CategoryItem = (props: CategoryItemProps) => (
  <li className={classNames('m-b-xs', {'link--active': props.active})}>
    <i className="fa fa-angle-right"/>
    {' '}
    <CategoryLink category_uuid={props.category.uuid}>
      {props.category.title}
    </CategoryLink>
    {' '}
    ({props.category.offering_count})
  </li>
);
