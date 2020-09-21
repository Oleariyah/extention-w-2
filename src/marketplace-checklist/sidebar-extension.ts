import { SidebarExtensionService } from '@waldur/navigation/sidebar/SidebarExtensionService';
import { USER_WORKSPACE, SUPPORT_WORKSPACE } from '@waldur/workspace/types';

import { getMenuForUser, getMenuForSupport } from './utils';

SidebarExtensionService.register(USER_WORKSPACE, getMenuForUser);
SidebarExtensionService.register(SUPPORT_WORKSPACE, getMenuForSupport);
