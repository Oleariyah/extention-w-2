import { FunctionComponent } from 'react';

import { TranslateProps } from '@waldur/i18n/types';
import { Button } from '@waldur/marketplace/offerings/service-providers/shared/Button';

interface GridRefreshButtonProps extends TranslateProps {
  fetch: () => void;
}

const RefreshIcon = require('./refresh.svg');

export const GridRefreshButton: FunctionComponent<GridRefreshButtonProps> = ({
  fetch,
}) => <Button label="Refresh" onClick={fetch} iconPrefix={RefreshIcon} />;
