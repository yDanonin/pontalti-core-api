// model ProductReturns {
//     id         Int      @id @default(autoincrement())
//     amount     Int
//     created_at DateTime @default(now())
//     updated_at DateTime @updatedAt
  
//     order_id Int
  
//     orders Orders @relation(fields: [order_id], references: [id])
//   }
  