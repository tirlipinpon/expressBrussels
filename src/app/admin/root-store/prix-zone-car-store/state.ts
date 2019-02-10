/**
 * Created by tirli on 05-02-19.
 */
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import {PrixZone} from "../../../models/prixZone";


export const prixZonesCarAdapter: EntityAdapter<PrixZone> = createEntityAdapter<PrixZone>({
  selectId: model => model.id,
  sortComparer: (a: PrixZone, b: PrixZone): number =>
    a.id.toString().localeCompare(b.id.toString())
});

export interface PrixZonesCarState extends EntityState<PrixZone> {
  isLoading?: boolean;
  error?: any;
}

export const initalPrixZonesCarState: PrixZonesCarState = prixZonesCarAdapter.getInitialState({
  isLoading: false,
  error: null
});
