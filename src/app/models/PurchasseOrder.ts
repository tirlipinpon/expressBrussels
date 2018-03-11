export interface PurchasseOrder {
  id: number;
  fk_customer_id: number;
  fk_removal_id: number;
  fk_recipient_id: number;

  contact_removal: string;
  message_removal: string;

  contact_recipient: string;
  message_recipient: string;

  date: Date;
  price: number;
  options: string;
  tomorrow: boolean;

  cascades: boolean
}
