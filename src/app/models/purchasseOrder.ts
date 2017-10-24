export interface PurchasseOrder {
  id: number,
  fk_customer_id: number,
  fk_removal_id: number,
  fk_recipient_id: number,
  order_date: Date,
  price: number,
  option: string,
  tomorrow: boolean
}
