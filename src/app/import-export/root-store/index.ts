/**
 * Created by tirli on 18-02-19.
 */

import { RootStoreModule } from './root-store.module';
import * as RootStoreState from './ie-store/state';
export * from './my-feature-store';
export * from './my-other-feature-store';
export { RootStoreState, RootStoreSelectors, RootStoreModule };
