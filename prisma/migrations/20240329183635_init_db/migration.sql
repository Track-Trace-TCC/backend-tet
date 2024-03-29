-- CreateTable
CREATE TABLE "Cliente" (
    "id_Cliente" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id_Cliente")
);

-- CreateTable
CREATE TABLE "Motorista" (
    "id_Motorista" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cnh" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "localizacaoAtual" JSONB NOT NULL,

    CONSTRAINT "Motorista_pkey" PRIMARY KEY ("id_Motorista")
);

-- CreateTable
CREATE TABLE "UsuarioAdministrador" (
    "id_Admin" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "UsuarioAdministrador_pkey" PRIMARY KEY ("id_Admin")
);

-- CreateTable
CREATE TABLE "Entrega" (
    "id_Entrega" TEXT NOT NULL,
    "id_Cliente" TEXT NOT NULL,
    "origem" JSONB NOT NULL,
    "destino" JSONB NOT NULL,
    "status" TEXT NOT NULL,
    "dataHoraCriacao" TIMESTAMP(3) NOT NULL,
    "dataHoraAtualizacao" TIMESTAMP(3) NOT NULL,
    "id_Motorista" TEXT,

    CONSTRAINT "Entrega_pkey" PRIMARY KEY ("id_Entrega")
);

-- CreateTable
CREATE TABLE "Rota" (
    "id_Rota" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "origem" JSONB NOT NULL,
    "destino" JSONB NOT NULL,
    "duracao" DOUBLE PRECISION NOT NULL,
    "direcoes" JSONB NOT NULL,
    "dataCriacao" TIMESTAMP(3) NOT NULL,
    "dataAtualizacao" TIMESTAMP(3) NOT NULL,
    "id_Motorista" TEXT NOT NULL,

    CONSTRAINT "Rota_pkey" PRIMARY KEY ("id_Rota")
);

-- AddForeignKey
ALTER TABLE "Entrega" ADD CONSTRAINT "Entrega_id_Cliente_fkey" FOREIGN KEY ("id_Cliente") REFERENCES "Cliente"("id_Cliente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entrega" ADD CONSTRAINT "Entrega_id_Motorista_fkey" FOREIGN KEY ("id_Motorista") REFERENCES "Motorista"("id_Motorista") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rota" ADD CONSTRAINT "Rota_id_Motorista_fkey" FOREIGN KEY ("id_Motorista") REFERENCES "Motorista"("id_Motorista") ON DELETE RESTRICT ON UPDATE CASCADE;
