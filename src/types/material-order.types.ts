// model MaterialOrders {
//     id          Int      @id @default(autoincrement())
//     date        DateTime
//     received_by String
//     created_at  DateTime @default(now())
//     updated_at  DateTime @updatedAt
//     product_id  Int
//     vendor_id   Int
  
//     products Products @relation(fields: [product_id], references: [id])
//     vendors  Vendors  @relation(fields: [vendor_id], references: [id])
//   }