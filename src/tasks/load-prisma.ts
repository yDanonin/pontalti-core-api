import { PrismaClient } from "@prisma/client"
import userService from "@pontalti/modules/v1/auth/auth-service";

const dbClient = new PrismaClient();

async function main() {
  // registering users
  const users = [
    {
      email: "admin@gmail.com",
      password: "1234",
      name: "Admin",
      isAdmin: true
    }
  ];

  for (const user of users){
    userService.register(user)
  };

  // registering address
  const addressesData = [
    {
      zip_code: "12345-678",
      neighborhood: "Bairro1",
      public_place: "Rua A",
      city: "Cidade1",
      state: "Estado1",
      complement: "Complemento1",
      address_number: 1
    }
  ];

  for (const address of addressesData) {
    await dbClient.adresses.create({
      data: address
    });
  };

  // registering customers
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const customerData: any = {
    status: 1,
    phone: "11968901260",
    cel_number: "11968901260",
    store_name: "Magalu",
    deliver: true,
    pontalti: false,
    secondary_line: true,
    credit_limit: 1000,
    addressId: 1
  };

  for (let i = 0; i < 10; i++) {
    customerData.email = `${i}email${i}@gmail.com`;
    customerData.name = `John Snow ${i}`;
    customerData.cpf = `1555555555${i}`;

    await dbClient.customers.create({
      data: customerData
    });
  };
};

main()
  .catch((error) => {
    console.log(error);
  })
  .finally(async () => {
    await dbClient.$disconnect();
    process.exit(0);
  });
