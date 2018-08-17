import * as React from 'react';

import { Link } from '@waldur/core/Link';

import { RatingStars } from '../common/RatingStars';
import { Product } from '../types';
import './ComparisonItem.scss';
import { ComparisonItemRemoveButtonContainer } from './ComparisonItemRemoveButtonContainer';

interface ComparisonItemProps {
  item: Product;
}

export const ComparisonItem = (props: ComparisonItemProps) => (
  <div className="text-center comparison-item">
    <ComparisonItemRemoveButtonContainer product={props.item}/>
    <Link
      state="marketplace-product"
      params={{product_uuid: props.item.uuid}}
      className="comparison-item-thumb">
      <img src={props.item.thumb}/>
    </Link>
    <h3>{props.item.name}</h3>
    <p>by{' '}
      <Link state="marketplace-provider-details">
        {props.item.vendor}
      </Link>
    </p>
    <RatingStars rating={props.item.rating} size="medium"/>
    <p>Based on <a>{props.item.reviews} reviews</a></p>
  </div>
);
