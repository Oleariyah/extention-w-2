import { InjectedFormProps } from 'redux-form';

import { OrderItemDetailsType } from '@waldur/marketplace/orders/types';
import { Offering } from '@waldur/marketplace/types';
import { Project } from '@waldur/workspace/types';

export type BillingPeriod =
  | 'day'
  | 'half_month'
  | 'month'
  ;

export interface GeolocationPoint {
  latitude: number;
  longitude: number;
}

export type Geolocations = GeolocationPoint[];

export interface BaseComponent {
  type: string;
  name: string;
  measured_unit: string;
  description: string;
}

export interface OfferingComponent extends BaseComponent {
  billing_type: 'usage' | 'fixed';
  limit_period?: 'month' | 'total';
  limit_amount: number;
}

export interface Plan {
  url: string;
  uuid?: string;
  name: string;
  description: string;
  unit_price: string;
  unit: BillingPeriod;
  quotas: {[key: string]: number};
  prices: {[key: string]: number};
  is_active: boolean;
}

export interface OptionField {
  type?: string;
  label: string;
  help_text?: string;
  required?: boolean;
  choices?: string[];
  default?: boolean | string | number;
  min?: number;
  max?: number;
}

export interface OfferingOptions {
  order: string[];
  options: {[key: string]: OptionField};
}

export interface ComparedOffering {
  name: string;
  attributes: AttributesType;
}

interface Quota {
  name: string;
  limit: number;
  usage: number;
}

export interface Offering {
  quotas?: Quota[];
  uuid?: string;
  thumbnail: string;
  name: string;
  native_name?: string;
  native_description?: string;
  terms_of_service?: string;
  rating: number;
  order_item_count: number;
  reviews: number;
  category?: string;
  category_title?: string;
  category_uuid?: string;
  vendor_details?: string;
  screenshots?: Screenshot[];
  description?: string;
  full_description: string;
  geolocations?: Geolocations;
  customer_uuid?: string;
  customer_name?: string;
  attributes: AttributesType;
  components: OfferingComponent[];
  options?: OfferingOptions;
  plans?: Plan[];
  type: string;
  state: string;
  scope?: string;
  scope_uuid?: string;
  created?: string;
  shared?: boolean;
  billable?: boolean;
}

export interface Screenshot {
  thumbnail: string;
  name: string;
  description: string;
}

type AttributeType =
  | 'boolean'
  | 'string'
  | 'integer'
  | 'choice'
  | 'list'
  | 'password'
  | 'html'
  ;

export interface Attribute {
  default?: any;
  title: string;
  key: string;
  type: AttributeType;
  options?: AttributeOption[];
  required?: boolean;
}

interface AttributeOption {
  key: string;
  title: string;
}

export interface Section {
  title: string;
  attributes: Attribute[];
  is_standalone?: boolean;
}

export interface CategoryColumn {
  index: number;
  title: string;
  attribute?: string;
  widget?: 'csv' | 'filesize' | 'attached_instance';
}

export interface Category {
  url: string;
  uuid?: string;
  title: string;
  icon: string;
  offering_count: number;
  sections?: Section[];
  columns?: CategoryColumn[];
  components?: BaseComponent[];
}

export interface CategoryComponentUsage {
  date: string;
  reported_usage: number;
  fixed_usage: number;
  category_uuid: string;
  category_title: string;
  name: string;
  type: string;
  measured_unit: string;
}

export interface CategoriesListType {
  items: Category[];
  loaded: boolean;
  loading: boolean;
}

export interface OfferingsListType {
  items: Offering[];
  loaded: boolean;
  loading: boolean;
}

export interface ServiceProvider {
  uuid: string;
  image?: string;
  description?: string;
  service_offerings?: Offering[];
  created: string;
}

export interface OfferingConfigurationFormProps extends InjectedFormProps {
  offering: Offering;
  project?: Project;
  plan?: Plan;
  initialAttributes?: AttributesType;
}

export interface OrderItemDetailsProps {
  orderItem: OrderItemDetailsType;
  offering: Offering;
}

export interface AttributesType {
  [key: string]: any;
}
