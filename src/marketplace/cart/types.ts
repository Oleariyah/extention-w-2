import { OrderItemResponse } from '@waldur/marketplace/orders/types';
import { AttributesType, Offering, Plan } from '@waldur/marketplace/types';

export interface CartState {
  items: OrderItemResponse[];
  addingItem: boolean;
  removingItem: boolean;
  updatingItem: boolean;
  creatingOrder: boolean;
}

export interface SubmitCartRequest {
  project: string;
}

export interface OrderItemRequest {
  offering: Offering;
  plan?: Plan;
  attributes?: AttributesType;
  limits?: { [key: string]: number };
}
