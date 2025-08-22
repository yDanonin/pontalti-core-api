import { PrismaClient } from "@prisma/client"
import userService from "@pontalti/modules/v1/auth/auth-service";
import bcrypt from 'bcrypt'

const dbClient = new PrismaClient();

async function main() {
  // Funções auxiliares
  function getRandomNumber(min: number, max: number) {
    return Number((Math.random() * (max - min) + min).toFixed(2));
  }

  function getRandomDate(start: Date, end: Date) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  function getRandomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }

  // Criando usuários com diferentes níveis de acesso
  const userTypes = [
    { email: "admin@pontalti.com", name: "Admin Master", isAdmin: true },
    { email: "gerente@pontalti.com", name: "Gerente", isAdmin: true },
    { email: "vendedor@pontalti.com", name: "Vendedor", isAdmin: false },
    { email: "operador@pontalti.com", name: "Operador", isAdmin: false }
  ];

  for (const userType of userTypes) {
    await dbClient.users.create({
      data: {
        ...userType,
        password: await bcrypt.hash("123", 10),
      }
    });
  }

  // Criando endereços
  const addressesData = [
    {
      zip_code: "01311-000",
      neighborhood: "Bela Vista",
      public_place: "Avenida Paulista",
      city: "São Paulo",
      state: "SP",
      complement: "Sala 1001",
      address_number: 1000
    },
    {
      zip_code: "20040-020",
      neighborhood: "Centro",
      public_place: "Rua do Ouvidor",
      city: "Rio de Janeiro",
      state: "RJ",
      complement: "Andar 5",
      address_number: 50
    },
    {
      zip_code: "90050-170",
      neighborhood: "Centro Histórico",
      public_place: "Rua dos Andradas",
      city: "Porto Alegre",
      state: "RS",
      complement: "Loja 10",
      address_number: 123
    }
  ];

  const createdAddresses = [];
  for (const address of addressesData) {
    const createdAddress = await dbClient.adresses.create({
      data: address
    });
    createdAddresses.push(createdAddress);
  }

  // Criando clientes
  const customerTypes = [
    { store_name: "Loja Premium", credit_limit: 50000, deliver: true, pontalti: true },
    { store_name: "Loja Standard", credit_limit: 20000, deliver: true, pontalti: false },
    { store_name: "Loja Básica", credit_limit: 5000, deliver: false, pontalti: false }
  ];

  for (let i = 1; i <= 10; i++) {
    const customerType = getRandomElement(customerTypes);
    const address = getRandomElement(createdAddresses);
    
    await dbClient.customers.create({
      data: {
        status: Math.floor(Math.random() * 2),
        address_id: address.id,
        credit_limit: customerType.credit_limit,
        debts: getRandomNumber(0, customerType.credit_limit * 0.3),
        name: `Cliente ${i}`,
        phone: `1199999${i.toString().padStart(4, '0')}`,
        cel_number: `1198888${i.toString().padStart(4, '0')}`,
        email: `cliente${i}@email.com`,
        store_name: customerType.store_name,
        deliver: customerType.deliver,
        pontalti: customerType.pontalti,
        secondary_line: Math.random() > 0.5,
        cpf: `1234567890${i}`,
        created_at: getRandomDate(new Date(2023, 0, 1), new Date()),
        updated_at: new Date()
      }
    });
  }

  // Criando funcionários
  const classifications = [1, 2, 3]; // 1: Operador, 2: Supervisor, 3: Gerente
  const salaryRanges = {
    1: { min: 2000, max: 3000 },
    2: { min: 3000, max: 5000 },
    3: { min: 5000, max: 8000 }
  };

  for (let i = 1; i <= 8; i++) {
    const classification = getRandomElement(classifications);
    const salaryRange = salaryRanges[classification];
    
    const employee = await dbClient.employees.create({
      data: {
        email: `funcionario${i}@pontalti.com`,
        name: `Funcionário ${i}`,
        phone: `1197777${i.toString().padStart(4, '0')}`,
        cel_number: `1196666${i.toString().padStart(4, '0')}`,
        cpf: `9876543210${i}`,
        classification,
        admission: getRandomDate(new Date(2020, 0, 1), new Date()),
        salary: getRandomNumber(salaryRange.min, salaryRange.max),
        created_at: new Date(),
        updated_at: new Date()
      }
    });

    // Criando horários para cada funcionário
    for (let day = 0; day <= 6; day++) {
      await dbClient.schedules.create({
        data: {
          employee_id: employee.id,
          day_of_week: day,
          start_time: "08:00:00",
          end_time: "17:00:00"
        }
      });
    }
  }

  // Criando máquinas
  const machineModels = ["Dublagem", "Corte", "Costura", "Acabamento"];
  const locations = ["Ilha 1", "Ilha 2", "Setor A", "Setor B"];

  for (let i = 1; i <= 10; i++) {
    await dbClient.machines.create({
      data: {
        model: getRandomElement(machineModels),
        machine_number: i,
        status: Math.floor(Math.random() * 2),
        location: getRandomElement(locations),
        location_status: Math.floor(Math.random() * 3),
        created_at: new Date(),
        updated_at: new Date()
      }
    });
  }

  // Criando procedimentos
  const processNames = ["Corte", "Costura", "Acabamento", "Qualidade", "Embalagem"];
  
  for (let i = 1; i <= 8; i++) {
    await dbClient.procedures.create({
      data: {
        process_name: getRandomElement(processNames),
        status: Math.floor(Math.random() * 2),
        workers: Math.floor(Math.random() * 5) + 1,
        created_at: new Date(),
        updated_at: new Date()
      }
    });
  }

  // Criando produtos
  const productTypes = [
    { name: "Bojo", model: "Casca", size: "18", character: "Sem aba" },
    { name: "Bojo", model: "Casca", size: "20", character: "Com aba" },
    { name: "Bojo", model: "Dublagem", size: "22", character: "Sem aba" },
    { name: "Bojo", model: "Dublagem", size: "24", character: "Com aba" }
  ];

  for (let i = 1; i <= 12; i++) {
    const productType = getRandomElement(productTypes);
    await dbClient.products.create({
      data: {
        status: Math.floor(Math.random() * 2),
        volume_sales: getRandomNumber(100, 1000),
        sales: getRandomNumber(50, 500),
        invoicing: getRandomNumber(1000, 10000),
        name: productType.name,
        model: productType.model,
        size: productType.size,
        character: productType.character,
        moldes: Math.floor(Math.random() * 5) + 1,
        equivalency: getRandomNumber(100, 1000),
        created_at: new Date(),
        updated_at: new Date()
      }
    });
  }

  // Criando fornecedores
  for (let i = 1; i <= 6; i++) {
    const address = getRandomElement(createdAddresses);
    await dbClient.vendors.create({
      data: {
        name: `Fornecedor ${i}`,
        address_id: address.id,
        store_name: `Loja Fornecedor ${i}`,
        cnpj: `1234567890123${i}`,
        status: Math.floor(Math.random() * 2),
        phone: `1195555${i.toString().padStart(4, '0')}`,
        cel_number: `1194444${i.toString().padStart(4, '0')}`,
        deliver: Math.random() > 0.3,
        volume_purchases: getRandomNumber(1000, 5000),
        purchases: getRandomNumber(100, 500),
        invoicing: getRandomNumber(5000, 20000),
        created_at: new Date(),
        updated_at: new Date()
      }
    });
  }

  // Criando registros de ponto
  const employees = await dbClient.employees.findMany();
  const startDate = new Date(2024, 0, 1);
  const endDate = new Date();

  for (const employee of employees) {
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      // Registro de entrada
      await dbClient.workHours.create({
        data: {
          employee_id: employee.id,
          clock_in: new Date(currentDate.setHours(8, 0, 0, 0)),
          clock_out: new Date(currentDate.setHours(12, 0, 0, 0)),
          created_at: new Date(),
          updated_at: new Date()
        }
      });

      // Registro de saída
      await dbClient.workHours.create({
        data: {
          employee_id: employee.id,
          clock_in: new Date(currentDate.setHours(13, 0, 0, 0)),
          clock_out: new Date(currentDate.setHours(17, 0, 0, 0)),
          created_at: new Date(),
          updated_at: new Date()
        }
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Criando férias para cada funcionário
    // Cada funcionário terá 1 ou 2 períodos de férias em 2024
    const numVacations = Math.floor(Math.random() * 2) + 1;
    
    for (let i = 0; i < numVacations; i++) {
      // Data de início aleatória entre janeiro e outubro de 2024
      const startDate = new Date(2025, Math.floor(Math.random() * 10), Math.floor(Math.random() * 28) + 1);
      // Duração de 20 a 30 dias
      const duration = Math.floor(Math.random() * 11) + 20;
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + duration);

      await dbClient.vacations.create({
        data: {
          employee_id: employee.id,
          start_date: startDate,
          end_date: endDate,
          sold_days: Math.floor(Math.random() * 10), // 0 a 10 dias vendidos
          created_at: new Date(),
          updated_at: new Date()
        }
      });
    }
  }

  // Criando configurações de horário
  const weekDays = [
    { day: 0, name: "Domingo" },
    { day: 1, name: "Segunda" },
    { day: 2, name: "Terça" },
    { day: 3, name: "Quarta" },
    { day: 4, name: "Quinta" },
    { day: 5, name: "Sexta" },
    { day: 6, name: "Sábado" }
  ];

  for (const day of weekDays) {
    await dbClient.timeConfiguration.create({
      data: {
        day_of_week: day.day,
        work_start: "08:00:00",
        work_end: "17:00:00",
        late_limit_in_minutes: 15,
        created_at: new Date(),
        updated_at: new Date()
      }
    });
  }

  // Criando pacotes (packagings)
  const packagingTypes = [
    { name: "Caixa Padrão", quantity: 100, storage_location: "Depósito A" },
    { name: "Caixa Grande", quantity: 50, storage_location: "Depósito B" },
    { name: "Caixa Pequena", quantity: 200, storage_location: "Depósito A" },
    { name: "Saco Plástico", quantity: 500, storage_location: "Depósito C" }
  ];

  const createdPackagings = [];
  for (const packaging of packagingTypes) {
    const createdPackaging = await dbClient.packaging.create({
      data: {
        ...packaging,
        created_at: new Date(),
        updated_at: new Date()
      }
    });
    createdPackagings.push(createdPackaging);
  }

  // Criando pedidos e entregas
  const customers = await dbClient.customers.findMany();
  const products = await dbClient.products.findMany();

  for (let i = 1; i <= 5; i++) {
    const customer = getRandomElement(customers);
    const order = await dbClient.orders.create({
      data: {
        final_price: getRandomNumber(1000, 5000),
        date: getRandomDate(new Date(2024, 0, 1), new Date()),
        customer_id: customer.id,
        created_at: new Date(),
        updated_at: new Date()
      }
    });

    // Adicionando produtos ao pedido
    const numProducts = Math.floor(Math.random() * 3) + 1;
    const usedProducts = new Set(); // Para evitar produtos duplicados no mesmo pedido
    
    for (let j = 0; j < numProducts; j++) {
      // Filtrar produtos que ainda não foram usados neste pedido
      const availableProducts = products.filter(p => !usedProducts.has(p.id));
      if (availableProducts.length === 0) break; // Se não houver mais produtos disponíveis, para o loop
      
      const product = getRandomElement(availableProducts);
      usedProducts.add(product.id); // Marca o produto como usado
      
      await dbClient.orderItems.create({
        data: {
          order_id: order.id,
          product_id: product.id,
          quantity: Math.floor(Math.random() * 5) + 1,
          created_at: new Date(),
          updated_at: new Date()
        }
      });
    }

    // Criando entrega para o pedido
    const delivery = await dbClient.delivery.create({
      data: {
        order_id: order.id,
        status: Math.floor(Math.random() * 3) + 1, // 1: Em planejamento, 2: Em rota, 3: Entregue
        delivery_date: getRandomDate(new Date(), new Date(2024, 11, 31)),
        created_at: new Date(),
        updated_at: new Date()
      }
    });

    // Adicionando pacotes à entrega
    const numPackagings = Math.floor(Math.random() * 3) + 1;
    const usedPackagings = new Set(); // Para evitar pacotes duplicados na mesma entrega
    
    for (let j = 0; j < numPackagings; j++) {
      // Filtrar pacotes que ainda não foram usados nesta entrega
      const availablePackagings = createdPackagings.filter(p => !usedPackagings.has(p.id));
      if (availablePackagings.length === 0) break; // Se não houver mais pacotes disponíveis, para o loop
      
      const packaging = getRandomElement(availablePackagings);
      usedPackagings.add(packaging.id); // Marca o pacote como usado
      
      await dbClient.deliveryPackaging.create({
        data: {
          delivery_id: delivery.id,
          packaging_id: packaging.id,
          quantity: Math.floor(Math.random() * 5) + 1,
          created_at: new Date(),
          updated_at: new Date()
        }
      });
    }
  }

  // Criando previsões de venda (SalesForecasts) - 3 registros mock
  const statusList = [1, 2, 3, 4]; // 1: Pendente, 2: Aceito, 3: Rejeitado, 4: Ordenado
  const reasons = [
    "média móvel 3 pedidos",
    "pedido recorrente (30 dias)",
    "sazonalidade (fim de ano)"
  ];

  for (let i = 0; i < 3; i++) {
    const customer = getRandomElement(customers);
    const product = getRandomElement(products);
    const freq = [15, 30, 45][i % 3];
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + freq);

    await dbClient.salesForecasts.create({
      data: {
        customer: { connect: { id: customer.id } },
        product: { connect: { id: product.id } },
        status: statusList[i],
        reason: reasons[i],
        next_estimated_date: nextDate,
        frequency_days: freq,
        quantity: Math.round(getRandomNumber(10, 250)),
        created_by: "seed",
        updated_by: "seed",
      }
    });
  }

  // Criando impressões de etiqueta (LabelPrints) - 3 registros mock
  const someOrders = await dbClient.orders.findMany({ take: 3, orderBy: { id: 'desc' }});
  for (const ord of someOrders) {
    await dbClient.labelPrints.create({
      data: {
        order: { connect: { id: ord.id } },
        created_by: 'seed',
        updated_by: 'seed'
      }
    });
  }

  // Criando configurações de mensagem para clientes
  const customersForMessages = await dbClient.customers.findMany({ take: 5 });
  
  for (const customer of customersForMessages) {
    const messageConfig = await dbClient.customerMessageConfig.create({
      data: {
        customer_id: customer.id,
        can_whatsapp: Math.random() > 0.3,
        can_whatsapp_attachments: Math.random() > 0.5,
        can_telegram: Math.random() > 0.3,
        can_telegram_attachments: Math.random() > 0.5,
        can_email: Math.random() > 0.2,
        can_email_attachments: Math.random() > 0.4,
        created_at: new Date(),
        updated_at: new Date()
      }
    });

    // Criando horários para envio de mensagens
    for (let day = 0; day <= 6; day++) {
      await dbClient.customerMessageSchedule.create({
        data: {
          message_config_id: messageConfig.id,
          day_of_week: day,
          can_send: Math.random() > 0.3,
          start_time: "09:00",
          end_time: "18:00",
          created_at: new Date(),
          updated_at: new Date()
        }
      });
    }
  }

  // Criando templates de mensagem
  const messageTemplates = [
    {
      name: "Boas-vindas",
      description: "Mensagem de boas-vindas para novos clientes",
      subject: "Bem-vindo à Pontalti!",
      content: "Olá {{nome}}, seja bem-vindo à Pontalti! Estamos felizes em tê-lo como cliente.",
      variables: { nome: "string" }
    },
    {
      name: "Pedido Confirmado",
      description: "Confirmação de pedido",
      subject: "Seu pedido foi confirmado",
      content: "Olá {{nome}}, seu pedido #{{pedido}} foi confirmado e está em processamento.",
      variables: { nome: "string", pedido: "number" }
    },
    {
      name: "Entrega Realizada",
      description: "Confirmação de entrega",
      subject: "Seu pedido foi entregue",
      content: "Olá {{nome}}, seu pedido #{{pedido}} foi entregue com sucesso!",
      variables: { nome: "string", pedido: "number" }
    }
  ];

  for (const template of messageTemplates) {
    await dbClient.messageTemplate.create({
      data: {
        ...template,
        created_at: new Date(),
        updated_at: new Date()
      }
    });
  }

  // Criando relações entre clientes e embalagens
  for (const customer of customers) {
    // Cada cliente terá entre 2 e 4 tipos de embalagem
    const numPackagings = Math.floor(Math.random() * 3) + 2;
    const selectedPackagings = [...createdPackagings]
      .sort(() => Math.random() - 0.5)
      .slice(0, numPackagings);

    for (const packaging of selectedPackagings) {
      await dbClient.customerPackaging.create({
        data: {
          customer_id: customer.id,
          packaging_id: packaging.id,
          pontalti_brand: Math.random() > 0.5, // 50% de chance de ser marca Pontalti
          created_at: new Date(),
          updated_at: new Date()
        }
      });
    }
  }
}

main()
  .catch((error) => {
    console.log(error);
  })
  .finally(async () => {
    await dbClient.$disconnect();
    process.exit(0);
  });
