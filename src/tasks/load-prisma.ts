import { PrismaClient } from "@prisma/client"
import userService from "@pontalti/modules/v1/auth/auth-service";

const dbClient = new PrismaClient();

async function main() {

  function getRandomNumber(min, max) {
    return Number((Math.random() * (max - min) + min).toFixed(2));
  }

  // registering users
  const users = [
    {
      email: "admin@gmail.com",
      password: "123",
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
    phone: "11968901260",
    cel_number: "11968901260",
    store_name: "Magalu",
    credit_limit: 1000,
    debts: 0,
    addressId: 1,
  };

  for (let i = 1; i <= 12; i++) {
    customerData.status= Math.floor(Math.random() * 2)
    customerData.deliver = Boolean(Math.floor(Math.random() * 2))
    customerData.pontalti = Boolean(Math.floor(Math.random() * 2))
    customerData.secondary_line = Boolean(Math.floor(Math.random() * 2))
    customerData.email = `${i}email${i}@gmail.com`;
    customerData.name = `John Snow ${i}`;
    customerData.cpf = `1555555555${i}`;
    customerData.created_at = new Date();
    customerData.updated_at = new Date();

    await dbClient.customers.create({
      data: customerData
    });
  };

  // registering employees
  const employeeData: any = {
    phone: "1168901260",
    cel_number: "11968901260",
    admission: new Date("2021-02-01")
  }

  for (let i = 0; i <= 5; i++) {
    employeeData.classification = Math.floor(Math.random() * 3);
    employeeData.salary = getRandomNumber(1000, 5000)
    employeeData.name = `Hodor ${i}`;
    employeeData.cpf = `3088954903${i}`;
    employeeData.created_at = new Date();
    employeeData.updated_at = new Date();

    await dbClient.employees.create({
      data: employeeData
    });
  }

  // registering machines
  const machineData: any = {
    model: "Dublagem",
    machine_number: 1,
    location: "ilha 1",
    location_status: 1,
  }

  for (let i = 0; i <= 5; i++) {
    machineData.status = Math.floor(Math.random() * 2);
    machineData.created_at = new Date();
    machineData.updated_at = new Date();

    await dbClient.machines.create({
      data: machineData
    });
  }

  // registering procedures
  const procedureData: any = {
    process_name: "teste",
    workers: 3
  }

  for (let i = 0; i <= 5; i++) {
    procedureData.status = Math.floor(Math.random() * 2);
    procedureData.created_at = new Date();
    procedureData.updated_at = new Date();

    await dbClient.procedures.create({
      data: procedureData
    });
  }

  // registering products
  const productData: any = {
    name: "bojo",
    volume_sales: 20,
    sales: 20,
    invoicing: 20,
    model: "Casca",
    size: "18",
    character: "sem aba",
    moldes: 1,
    equivalency: 200
  }

  for (let i = 0; i <= 5; i++) {
    productData.status = Math.floor(Math.random() * 2);
    productData.created_at = new Date();
    productData.updated_at = new Date();

    await dbClient.products.create({
      data: productData
    });
  }
  // registering vendors
  const vendorData: any = {
    phone: "11968901260",
    cel_number: "11968901260",
    store_name: "Magalu",
    volume_purchases: 20,
    purchases: 20,
    invoicing: 20,
    addressId: 1,
  };

  for (let i = 1; i <= 5; i++) {
    vendorData.status= Math.floor(Math.random() * 2)
    vendorData.deliver = Boolean(Math.floor(Math.random() * 2))
    vendorData.name = `John Snow ${i}`;
    vendorData.cnpj = `999999999999${i}`;
    vendorData.created_at = new Date();
    vendorData.updated_at = new Date();

    await dbClient.vendors.create({
      data: vendorData
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
