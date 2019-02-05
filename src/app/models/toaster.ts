/**
 * Created by tirli on 24-12-18.
 */
export interface Toaster {
  severity: string;
  summary: string;
  detail: string;
}

export interface ToasterState {
  data: Toaster[];
  count: number;
}
