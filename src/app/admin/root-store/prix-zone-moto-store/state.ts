/**
 * Created by tirli on 05-02-19.
 */
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import {PrixZone} from "../../../models/prixZone";


export const prixZonesMotoAdapter: EntityAdapter<PrixZone> = createEntityAdapter<PrixZone>({
  selectId: model => model.id,
  sortComparer: (a: PrixZone, b: PrixZone): number =>
    a.id.toString().localeCompare(b.id.toString())
});

export interface PrixZonesMotoState extends EntityState<PrixZone> {
  isLoading?: boolean;
  error?: any;
}

export const initalPrixZonesMotoState: PrixZonesMotoState = prixZonesMotoAdapter.getInitialState({
  isLoading: false,
  error: null
});
