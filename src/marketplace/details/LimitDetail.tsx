import { FunctionComponent } from 'react';
import { Table } from 'react-bootstrap';

import { translate } from '@waldur/i18n';
import { OfferingComponent } from '@waldur/marketplace/types';

interface LimitProps {
  limits: OfferingComponent[];
}

export const LimitTable: FunctionComponent<LimitProps> = (props) => (
  <Table bordered={true} hover={true} responsive={true}>
    <tbody>
      {props.limits.map((item, index) => (
        <>
          <tr key={index}>
            <td className="col-md-3">{translate('Limit Name')}</td>
            <td className="col-md-9">{item.name}</td>
          </tr>
          <tr key={index}>
            <td className="col-md-3">{translate('Limit Description')}</td>
            <td className="col-md-9">{item.description}</td>
          </tr>
          <tr key={index}>
            <td className="col-md-3">{translate('Limit Amount')}</td>
            <td className="col-md-9">{item.limit_amount}</td>
          </tr>
          <tr key={index}>
            <td className="col-md-3">{translate('Limit Period')}</td>
            <td className="col-md-9">{item.limit_period}</td>
          </tr>
        </>
      ))}
    </tbody>
  </Table>
);
