/**
 * Seed do cardápio Bakaninha
 *
 * Roda com:  npx ts-node prisma/seed.ts
 * Apaga itens, categorias, marmitas e popula tudo do zero.
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type Variant = { name: string; price: number };
type SeedItem = {
  name: string;
  description?: string;
  basePrice?: number;
  variants?: Variant[];
};
type SeedCategory = {
  name: string;
  description?: string;
  order: number;
  items: SeedItem[];
};

const VARIANT_LABELS = {
  completa: 'Completa',
  meia: '1/2',
  individual: 'Individual',
  g: 'G',
  m: 'M',
  p: 'P',
  media: 'Média',
};

/** ─────────────────────────────────────────────────────────────
 *  CARDÁPIO COMPLETO (extraído das imagens em public/intrucoes)
 *  ───────────────────────────────────────────────────────────── */
const CATEGORIES: SeedCategory[] = [
  // 1. Pratos à la carte
  {
    name: 'Pratos à la Carte',
    order: 10,
    description: 'Servidos em três tamanhos: Completa, Média e Individual.',
    items: [
      {
        name: 'Parmegiana Bakaninha',
        description: 'Arroz, batata frita, purê e maionese.',
        variants: [
          { name: 'Completa', price: 105 },
          { name: 'Média', price: 85 },
          { name: 'Individual', price: 52 },
        ],
      },
      {
        name: 'Parmegiana Tradicional',
        description: 'Arroz e batata frita.',
        variants: [
          { name: 'Completa', price: 95 },
          { name: 'Média', price: 75 },
          { name: 'Individual', price: 43 },
        ],
      },
      {
        name: 'Italiano',
        description: 'Arroz à grega e batata frita.',
        variants: [
          { name: 'Completa', price: 98 },
          { name: 'Média', price: 80 },
          { name: 'Individual', price: 49 },
        ],
      },
      {
        name: 'Milanesa Bakaninha',
        description: 'Arroz e maionese.',
        variants: [
          { name: 'Completa', price: 83 },
          { name: 'Média', price: 67 },
          { name: 'Individual', price: 46 },
        ],
      },
      {
        name: 'Bolonhesa',
        description: 'Filé grelhado coberto com molho bolonhesa, arroz e batata.',
        variants: [
          { name: 'Completa', price: 98 },
          { name: 'Média', price: 80 },
          { name: 'Individual', price: 49 },
        ],
      },
      {
        name: 'Portuguesa',
        description: 'Arroz, tutu de mineira, ovo e batata frita.',
        variants: [
          { name: 'Completa', price: 93 },
          { name: 'Média', price: 75 },
          { name: 'Individual', price: 47 },
        ],
      },
      {
        name: 'Francesa',
        description: 'Arroz e batata frita.',
        variants: [
          { name: 'Completa', price: 93 },
          { name: 'Média', price: 64 },
          { name: 'Individual', price: 42 },
        ],
      },
      {
        name: 'Cubana',
        description: 'Arroz, abacaxi e banana à milanesa, ovo e maionese.',
        variants: [
          { name: 'Completa', price: 85 },
          { name: 'Média', price: 74 },
          { name: 'Individual', price: 45 },
        ],
      },
      {
        name: 'Tropeiro',
        description: 'Arroz, feijão tropeiro e batata frita.',
        variants: [
          { name: 'Completa', price: 98 },
          { name: 'Média', price: 78 },
          { name: 'Individual', price: 45 },
        ],
      },
      {
        name: 'Bakaninha',
        description: 'Filé acebolado, arroz, feijão tropeiro, batata frita, ovo e salada crua.',
        variants: [
          { name: 'Completa', price: 110 },
          { name: 'Média', price: 89 },
        ],
      },
    ],
  },

  // 2. Filés de Frango à
  {
    name: 'Filés de Frango à',
    order: 20,
    description: 'Mesma cozinha, mas com filé de frango grelhado.',
    items: [
      {
        name: 'Parmegiana Bakaninha (Frango)',
        description: 'Arroz, batata frita, purê e maionese.',
        variants: [
          { name: 'Completa', price: 95 },
          { name: 'Média', price: 75 },
          { name: 'Individual', price: 45 },
        ],
      },
      {
        name: 'Parmegiana Tradicional (Frango)',
        description: 'Arroz e batata frita.',
        variants: [
          { name: 'Completa', price: 85 },
          { name: 'Média', price: 72 },
          { name: 'Individual', price: 40 },
        ],
      },
      {
        name: 'Italiano (Frango)',
        description: 'Arroz à grega e batata frita.',
        variants: [
          { name: 'Completa', price: 95 },
          { name: 'Média', price: 72 },
          { name: 'Individual', price: 42 },
        ],
      },
      {
        name: 'Milanesa (Frango)',
        description: 'Arroz e maionese.',
        variants: [
          { name: 'Completa', price: 85 },
          { name: 'Média', price: 68 },
          { name: 'Individual', price: 37 },
        ],
      },
      {
        name: 'Bolonhesa (Frango)',
        description: 'Filé grelhado coberto com molho bolonhesa, arroz e batata.',
        variants: [
          { name: 'Completa', price: 85 },
          { name: 'Média', price: 67 },
          { name: 'Individual', price: 42 },
        ],
      },
      {
        name: 'Portuguesa (Frango)',
        description: 'Arroz à grega, tutu de mineira, ovo e batata frita.',
        variants: [
          { name: 'Completa', price: 85 },
          { name: 'Média', price: 67 },
          { name: 'Individual', price: 39 },
        ],
      },
      {
        name: 'Francesa (Frango)',
        description: 'Arroz e batata frita.',
        variants: [
          { name: 'Completa', price: 85 },
          { name: 'Média', price: 67 },
          { name: 'Individual', price: 39 },
        ],
      },
      {
        name: 'Cubana (Frango)',
        description: 'Arroz, abacaxi e banana à milanesa, ovo e maionese.',
        variants: [
          { name: 'Completa', price: 85 },
          { name: 'Média', price: 67 },
          { name: 'Individual', price: 39 },
        ],
      },
      {
        name: 'Tropeiro (Frango)',
        description: 'Arroz, feijão tropeiro e batata frita.',
        variants: [
          { name: 'Completa', price: 85 },
          { name: 'Média', price: 67 },
          { name: 'Individual', price: 39 },
        ],
      },
      {
        name: 'Bakaninha (Frango)',
        description: 'Filé de frango acebolado, arroz, feijão tropeiro, batata frita, ovo e salada crua.',
        variants: [
          { name: 'Completa', price: 95 },
          { name: 'Média', price: 78 },
        ],
      },
    ],
  },

  // 3. Grelhados à mineira Bakaninha
  {
    name: 'Grelhados à Mineira Bakaninha',
    order: 30,
    items: [
      {
        name: 'Picanha Bakaninha',
        description: 'Arroz, feijão tropeiro e batata frita.',
        variants: [
          { name: 'Completa', price: 98 },
          { name: 'Média', price: 75 },
          { name: 'Individual', price: 52 },
        ],
      },
      {
        name: 'Picanha Alho e Óleo',
        description: 'Arroz, feijão caldão, batata frita e salada.',
        variants: [
          { name: 'Completa', price: 98 },
          { name: 'Média', price: 75 },
          { name: 'Individual', price: 52 },
        ],
      },
      {
        name: 'Carne de Sol Bakaninha',
        description: 'Arroz, feijão tropeiro e batata frita.',
        variants: [
          { name: 'Completa', price: 97 },
          { name: 'Média', price: 72 },
          { name: 'Individual', price: 50 },
        ],
      },
      {
        name: 'Carne de Sol Bakaninha Completa',
        description: 'Arroz, feijão caldão, batata frita, farofa acebolada e salada.',
        variants: [
          { name: 'Completa', price: 103 },
          { name: 'Média', price: 80 },
          { name: 'Individual', price: 50 },
        ],
      },
      {
        name: 'Churrasco Completo',
        description: 'Arroz, feijão tropeiro, batata frita, salada e maionese.',
        variants: [
          { name: 'Completa', price: 106 },
          { name: 'Média', price: 83 },
          { name: 'Individual', price: 52 },
        ],
      },
      {
        name: 'Especial Bakaninha',
        description: 'Arroz, feijão tropeiro, batata frita, salada e maionese.',
        variants: [
          { name: 'Completa', price: 106 },
          { name: 'Média', price: 83 },
        ],
      },
      {
        name: 'Lombo à Tutu Mineira',
        description: 'Arroz, tutu, ovo e batata frita.',
        variants: [
          { name: 'Completa', price: 94 },
          { name: 'Média', price: 70 },
          { name: 'Individual', price: 49 },
        ],
      },
      {
        name: 'Lombo Tropeiro Bakaninha',
        description: 'Arroz, feijão tropeiro e batata frita.',
        variants: [
          { name: 'Completa', price: 94 },
          { name: 'Média', price: 70 },
          { name: 'Individual', price: 49 },
        ],
      },
    ],
  },

  // 4. Massas
  {
    name: 'Massas',
    order: 40,
    items: [
      {
        name: 'Lasanha à Bolonhesa Bakaninha',
        description: 'Arroz e filé grelhado.',
        variants: [
          { name: 'Completa', price: 106 },
          { name: 'Média', price: 77 },
          { name: 'Individual', price: 50 },
        ],
      },
      {
        name: 'Lasanha à Bolonhesa',
        description: 'Arroz.',
        variants: [
          { name: 'Completa', price: 95 },
          { name: 'Média', price: 68 },
          { name: 'Individual', price: 45 },
        ],
      },
      {
        name: 'Lasanha Italiana',
        description: 'Arroz e filé de frango.',
        variants: [
          { name: 'Completa', price: 97 },
          { name: 'Média', price: 70 },
          { name: 'Individual', price: 47 },
        ],
      },
      {
        name: 'Macarrão à Bolonhesa Bakaninha',
        description: 'Arroz e filé grelhado.',
        variants: [
          { name: 'Completa', price: 105 },
          { name: 'Média', price: 70 },
          { name: 'Individual', price: 48 },
        ],
      },
      {
        name: 'Macarrão à Bolonhesa',
        description: 'Arroz.',
        variants: [
          { name: 'Completa', price: 92 },
          { name: 'Média', price: 68 },
          { name: 'Individual', price: 45 },
        ],
      },
      {
        name: 'Macarrão Italiano',
        description: 'Arroz e filé de frango grelhado.',
        variants: [
          { name: 'Completa', price: 92 },
          { name: 'Média', price: 68 },
          { name: 'Individual', price: 45 },
        ],
      },
      {
        name: 'Macarrão Alho e Óleo',
        description: 'Arroz e filé de frango.',
        variants: [
          { name: 'Completa', price: 90 },
          { name: 'Média', price: 67 },
          { name: 'Individual', price: 44 },
        ],
      },
    ],
  },

  // 5. Pizzas
  {
    name: 'Pizzas',
    order: 50,
    description: 'Todas acompanham tomate, cebola e azeitona.',
    items: [
      {
        name: 'À Moda',
        description: 'Mussarela, presunto, milho verde e frango.',
        variants: [
          { name: 'G', price: 69 },
          { name: 'M', price: 59 },
          { name: 'P', price: 47 },
        ],
      },
      {
        name: 'Mussarela',
        description: 'Mussarela.',
        variants: [
          { name: 'G', price: 65 },
          { name: 'M', price: 56 },
          { name: 'P', price: 44 },
        ],
      },
      {
        name: 'Mista Simples',
        description: 'Mussarela e presunto.',
        variants: [
          { name: 'G', price: 65 },
          { name: 'M', price: 56 },
          { name: 'P', price: 44 },
        ],
      },
      {
        name: 'Mista Bakaninha',
        description: 'Mussarela, presunto, milho verde, ovo, calabresa e frango.',
        variants: [
          { name: 'G', price: 72 },
          { name: 'M', price: 63 },
          { name: 'P', price: 52 },
        ],
      },
      {
        name: 'Milho Verde',
        description: 'Mussarela e milho verde.',
        variants: [
          { name: 'G', price: 60 },
          { name: 'M', price: 56 },
          { name: 'P', price: 44 },
        ],
      },
      {
        name: 'Calabresa',
        description: 'Mussarela e calabresa.',
        variants: [
          { name: 'G', price: 69 },
          { name: 'M', price: 59 },
          { name: 'P', price: 47 },
        ],
      },
      {
        name: 'Frango Simples',
        description: 'Mussarela e frango.',
        variants: [
          { name: 'G', price: 66 },
          { name: 'M', price: 56 },
          { name: 'P', price: 44 },
        ],
      },
      {
        name: 'Frango Catupiry',
        description: 'Mussarela, frango e Catupiry.',
        variants: [
          { name: 'G', price: 69 },
          { name: 'M', price: 59 },
          { name: 'P', price: 47 },
        ],
      },
      {
        name: 'Portuguesa',
        description: 'Mussarela e ovos.',
        variants: [
          { name: 'G', price: 69 },
          { name: 'M', price: 59 },
          { name: 'P', price: 47 },
        ],
      },
      {
        name: 'Bolonhesa',
        description: 'Mussarela e molho bolonhesa.',
        variants: [
          { name: 'G', price: 79 },
          { name: 'M', price: 65 },
          { name: 'P', price: 54 },
        ],
      },
      {
        name: 'Especial Bakaninha',
        description: 'Mussarela, Catupiry, milho verde, frango, presunto e calabresa.',
        variants: [
          { name: 'G', price: 72 },
          { name: 'M', price: 63 },
          { name: 'P', price: 52 },
        ],
      },
      {
        name: 'Bacon',
        description: 'Mussarela, bacon e orégano.',
        variants: [
          { name: 'G', price: 69 },
          { name: 'M', price: 59 },
          { name: 'P', price: 47 },
        ],
      },
      {
        name: 'Mocinha',
        description: 'Mussarela, Catupiry, creme de leite, frango desfiado, milho verde, batata palha.',
        variants: [
          { name: 'G', price: 69 },
          { name: 'M', price: 59 },
          { name: 'P', price: 47 },
        ],
      },
    ],
  },

  // 6. Porções Aperitivas
  {
    name: 'Porções Aperitivas',
    order: 60,
    items: [
      {
        name: 'Filé Aperitivo Especial',
        description: 'Torrada e maionese.',
        variants: [
          { name: 'Média', price: 52 },
          { name: 'Completa', price: 70 },
        ],
      },
      {
        name: 'Filé Aperitivo Acebolado',
        variants: [
          { name: 'Média', price: 48 },
          { name: 'Completa', price: 60 },
        ],
      },
      {
        name: 'Filé de Frango Aperitivo Acebolado',
        variants: [
          { name: 'Média', price: 38 },
          { name: 'Completa', price: 55 },
        ],
      },
      {
        name: 'Frango à Passarinho',
        variants: [
          { name: 'Média', price: 40 },
          { name: 'Completa', price: 58 },
        ],
      },
      {
        name: 'Carne de Sol com Mandioca',
        variants: [
          { name: 'Média', price: 45 },
          { name: 'Completa', price: 68 },
        ],
      },
      {
        name: 'Carne de Sol com Batata Frita',
        variants: [
          { name: 'Média', price: 45 },
          { name: 'Completa', price: 68 },
        ],
      },
      {
        name: 'Batata Frita',
        variants: [
          { name: 'Média', price: 28 },
          { name: 'Completa', price: 38 },
        ],
      },
      {
        name: 'Batata Frita com Queijo e Bacon',
        variants: [
          { name: 'Média', price: 38 },
          { name: 'Completa', price: 48 },
        ],
      },
      {
        name: 'Omelete Especial',
        variants: [
          { name: 'Média', price: 29 },
          { name: 'Completa', price: 39 },
        ],
      },
    ],
  },

  // 7. Guarnições
  {
    name: 'Guarnições',
    order: 70,
    items: [
      { name: 'Arroz Branco', basePrice: 10 },
      { name: 'Arroz à Grega', basePrice: 13 },
      { name: 'Feijão Tropeiro', basePrice: 15 },
      { name: 'Feijão Caldo', basePrice: 15 },
      { name: 'Purê', basePrice: 12 },
      { name: 'Maionese', basePrice: 12 },
    ],
  },

  // 8. Saladas
  {
    name: 'Saladas',
    order: 80,
    items: [
      {
        name: 'Salada Completa',
        description: 'Alface, tomate, beterraba, batata, cenoura e conservas.',
        basePrice: 45,
      },
      {
        name: 'Salada Mista',
        description: 'Alface, tomate, beterraba e cenoura.',
        basePrice: 35,
      },
    ],
  },

  // 9. Sucos
  {
    name: 'Sucos',
    order: 90,
    items: [
      { name: 'Laranja', basePrice: 12 },
      { name: 'Abacaxi', basePrice: 12 },
      { name: 'Maracujá', basePrice: 12 },
      { name: 'Limão', basePrice: 10 },
      { name: 'Misto', basePrice: 14 },
    ],
  },

  // 10. Cervejas
  {
    name: 'Cervejas 600 ml',
    order: 100,
    items: [
      { name: 'Brahma', basePrice: 14 },
      { name: 'Skol', basePrice: 14 },
      { name: 'Amstel', basePrice: 14 },
      { name: 'Stella', basePrice: 16 },
      { name: 'Heineken', basePrice: 18 },
      { name: 'Spaten', basePrice: 16 },
      { name: 'Original', basePrice: 16 },
    ],
  },

  // 11. Bebidas Destiladas (Dose)
  {
    name: 'Bebidas Destiladas (Dose)',
    order: 110,
    items: [
      { name: 'Whisky Cavalo Branco', basePrice: 18 },
      { name: 'Whisky Red Label', basePrice: 22 },
      { name: 'Vodka Absolut', basePrice: 16 },
      { name: 'Vodka Orloff', basePrice: 12 },
      { name: 'Campari', basePrice: 14 },
      { name: 'Bacardi', basePrice: 14 },
      { name: 'Vinho Pérgola', basePrice: 14 },
      { name: 'Cachaça Nova Aliança', basePrice: 8 },
      { name: 'Cachaça Seleta', basePrice: 10 },
      { name: 'Cachaça Borzinha', basePrice: 8 },
      { name: 'Cachaça Beleza de Minas', basePrice: 12 },
      { name: 'Cachaça Salicina', basePrice: 8 },
    ],
  },
];

/** ─────────────────────────────────────────────────────────────
 *  MARMITAS — novo modelo (global)
 *  ───────────────────────────────────────────────────────────── */

// Tamanhos (sizes)
const MARMITA_SIZES = [
  { name: 'P', price: 22, order: 1 },
  { name: 'M', price: 28, order: 2 },
  { name: 'G', price: 35, order: 3 },
];

// Grupos globais (de itens) + config por tamanho
type SizeName = 'P' | 'M' | 'G';
type SizeGroupConfig = { sizeName: SizeName; maxChoices: number; required: boolean; order: number };
type SeedItemGroup = {
  name: string;
  order: number;
  sizeConfigs: SizeGroupConfig[];      // em quais tamanhos esse grupo entra, e como
  items: { name: string; extraPrice?: number; allowedSizes?: SizeName[] }[];
};

const ITEM_GROUPS: SeedItemGroup[] = [
  {
    name: 'Arroz',
    order: 1,
    sizeConfigs: [
      { sizeName: 'P', maxChoices: 1, required: true, order: 1 },
      { sizeName: 'M', maxChoices: 1, required: true, order: 1 },
      { sizeName: 'G', maxChoices: 1, required: true, order: 1 },
    ],
    items: [
      { name: 'Arroz Branco' },
      { name: 'Arroz à Grega' },
    ],
  },
  {
    name: 'Feijão',
    order: 2,
    sizeConfigs: [
      { sizeName: 'P', maxChoices: 1, required: true, order: 2 },
      { sizeName: 'M', maxChoices: 1, required: true, order: 2 },
      { sizeName: 'G', maxChoices: 1, required: true, order: 2 },
    ],
    items: [
      { name: 'Feijão Caldo' },
      { name: 'Feijão Tropeiro' },
    ],
  },
  {
    name: 'Proteína',
    order: 3,
    sizeConfigs: [
      { sizeName: 'P', maxChoices: 1, required: true, order: 3 },
      { sizeName: 'M', maxChoices: 1, required: true, order: 3 },
      { sizeName: 'G', maxChoices: 2, required: true, order: 3 },
    ],
    items: [
      { name: 'Frango Grelhado' },
      { name: 'Filé Bovino' },
      { name: 'Carne de Sol' },
      { name: 'Lombo Suíno', allowedSizes: ['M', 'G'] },      // não aparece no P
      { name: 'Picanha', extraPrice: 8, allowedSizes: ['G'] }, // só G
    ],
  },
  {
    name: 'Acompanhamentos',
    order: 4,
    sizeConfigs: [
      { sizeName: 'P', maxChoices: 2, required: false, order: 4 },
      { sizeName: 'M', maxChoices: 3, required: false, order: 4 },
      { sizeName: 'G', maxChoices: 4, required: false, order: 4 },
    ],
    items: [
      { name: 'Batata Frita' },
      { name: 'Purê' },
      { name: 'Salada Mista' },
      { name: 'Farofa' },
      { name: 'Maionese' },
      { name: 'Vinagrete', allowedSizes: ['G'] }, // só no G
    ],
  },
  {
    name: 'Extras (opcional)',
    order: 5,
    sizeConfigs: [
      // P não tem extras
      { sizeName: 'M', maxChoices: 2, required: false, order: 5 },
      { sizeName: 'G', maxChoices: 3, required: false, order: 5 },
    ],
    items: [
      { name: 'Ovo Frito', extraPrice: 3 },
      { name: 'Bacon', extraPrice: 5 },
      { name: 'Queijo', extraPrice: 4 },
      { name: 'Catupiry', extraPrice: 5, allowedSizes: ['G'] }, // só G
    ],
  },
];

async function main() {
  // Pass `--force` (or set SEED_FORCE=1) to wipe existing data and reseed.
  // Without it, seed only runs when the database is empty — safe to call
  // every deploy on the VPS as `npm run db:setup`.
  const force = process.argv.includes('--force') || process.env.SEED_FORCE === '1';

  const [catCount, sizeCount] = await Promise.all([
    prisma.category.count(),
    prisma.marmitaSize.count(),
  ]);
  const alreadyHasData = catCount > 0 || sizeCount > 0;

  if (alreadyHasData && !force) {
    console.log(`Banco já tem dados (${catCount} categorias, ${sizeCount} tamanhos de marmita). Pulando seed.`);
    console.log('Use `npm run db:seed -- --force` (ou SEED_FORCE=1) para reseedar.');
    return;
  }

  if (alreadyHasData && force) {
    console.log('Modo --force: limpando dados existentes...');
    await prisma.marmitaItem.deleteMany();
    await prisma.marmitaSizeGroup.deleteMany();
    await prisma.marmitaItemGroup.deleteMany();
    await prisma.marmitaSize.deleteMany();
    await prisma.item.deleteMany();
    await prisma.category.deleteMany();
  }

  console.log('Inserindo categorias e itens do cardápio...');
  for (const cat of CATEGORIES) {
    const createdCat = await prisma.category.create({
      data: {
        name: cat.name,
        description: cat.description,
        order: cat.order,
        active: true,
      },
    });

    for (const it of cat.items) {
      await prisma.item.create({
        data: {
          name: it.name,
          description: it.description,
          basePrice: it.basePrice ?? 0,
          variantsJson: JSON.stringify(it.variants ?? []),
          active: true,
          categoryId: createdCat.id,
        },
      });
    }
    console.log(`  + ${cat.name} (${cat.items.length} itens)`);
  }

  console.log('Inserindo tamanhos de marmita...');
  const sizesByName: Record<SizeName, number> = { P: 0, M: 0, G: 0 };
  for (const s of MARMITA_SIZES) {
    const size = await prisma.marmitaSize.create({
      data: { name: s.name, price: s.price, order: s.order, active: true },
    });
    sizesByName[s.name as SizeName] = size.id;
    console.log(`  + Tamanho ${s.name} (R$ ${s.price})`);
  }

  console.log('Inserindo grupos de itens (globais) + itens...');
  for (const ig of ITEM_GROUPS) {
    const itemGroup = await prisma.marmitaItemGroup.create({
      data: { name: ig.name, order: ig.order },
    });
    for (const sc of ig.sizeConfigs) {
      await prisma.marmitaSizeGroup.create({
        data: {
          marmitaSizeId: sizesByName[sc.sizeName],
          itemGroupId: itemGroup.id,
          maxChoices: sc.maxChoices,
          required: sc.required,
          order: sc.order,
        },
      });
    }
    for (const it of ig.items) {
      const allowed = it.allowedSizes?.map(n => sizesByName[n]) ?? [];
      await prisma.marmitaItem.create({
        data: {
          name: it.name,
          extraPrice: it.extraPrice ?? 0,
          itemGroupId: itemGroup.id,
          active: true,
          allowedSizesJson: JSON.stringify(allowed),
        },
      });
    }
    console.log(`  + Grupo "${ig.name}" (${ig.sizeConfigs.length} tamanhos, ${ig.items.length} itens)`);
  }

  console.log('\nSeed concluído.');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
