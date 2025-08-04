import { SetMetadata } from '@nestjs/common';

export const IS_ROUTE_PUBLIC = 'is_route_public';

export const Public = () => SetMetadata(IS_ROUTE_PUBLIC, true);
