# Bakaninha — Backend

API REST do cardápio Bakaninha (NestJS + Prisma + PostgreSQL).

## Stack

- **NestJS 10** (TypeScript)
- **Prisma 5** + **PostgreSQL**
- **JWT** para auth do painel admin
- Upload local de imagens (`/uploads`)

---

## Desenvolvimento local

### Pré-requisitos
- Node.js 20+
- Docker Desktop (para subir o Postgres rapidamente)
  *Ou* PostgreSQL instalado nativamente.

### Setup

```bash
# 1. Instale as dependências
npm install

# 2. Suba o Postgres local
docker compose up -d

# 3. Copie o .env de exemplo
cp .env.example .env

# 4. Aplique as migrations + popule com dados de teste
npm run db:setup

# 5. Suba a API em modo dev (hot reload)
npm run start:dev
```

API sobe em `http://localhost:3001`.

### Scripts úteis

| Script | O que faz |
|---|---|
| `npm run start:dev` | sobe em modo dev (ts-node + watch) |
| `npm run build` | gera Prisma client + compila para `dist/` |
| `npm run start` | roda o build em produção |
| `npm run db:migrate` | aplica migrations pendentes (sem prompts) |
| `npm run db:seed` | popula o banco se estiver vazio |
| `npm run db:seed -- --force` | apaga tudo e re-popula |
| `npm run db:setup` | migrate + seed (idempotente) — usar no deploy |
| `npm run db:studio` | abre Prisma Studio (GUI do banco) |

---

## Deploy na VPS (IONOS)

### Variáveis de ambiente (`.env`)

| Var | Exemplo | Notas |
|---|---|---|
| `DATABASE_URL` | `postgresql://user:pass@localhost:5432/bakaninha?schema=public` | URL do Postgres do servidor |
| `ADMIN_USERNAME` | `bakaninha@admin.com` | Credencial do painel admin |
| `ADMIN_PASSWORD` | `bakana2026!` | Senha do painel admin |
| `JWT_SECRET` | `cole_aqui_uma_chave_forte` | Gere com `openssl rand -base64 48` |
| `PORT` | `3001` | Porta interna |
| `CORS_ORIGIN` | `https://bakaninha.netlify.app` | URL do Netlify (vírgulas para múltiplas) |
| `WHATSAPP_NUMBER` | `553838411604` | Número do bot WhatsApp (DDI+DDD+número) |

### Passo a passo na VPS

```bash
# 1. Clone o repo
git clone https://github.com/givasz/bakaninha-backend.git
cd bakaninha-backend

# 2. Instale as dependências (postinstall já roda prisma generate)
npm install

# 3. Crie o .env com os valores reais
nano .env

# 4. Suba o esquema do banco + seed inicial (idempotente)
npm run db:setup

# 5. Build de produção
npm run build

# 6. Suba o processo com pm2 (recomendado)
npm install -g pm2
pm2 start dist/main.js --name bakaninha-backend
pm2 save
pm2 startup    # siga as instruções para iniciar com o servidor
```

### Atualizações posteriores

```bash
cd ~/bakaninha-backend
git pull
npm install
npm run db:migrate    # aplica novas migrations sem reseedar
npm run build
pm2 restart bakaninha-backend
```

### Nginx (proxy reverso)

Exemplo de bloco para `/etc/nginx/sites-available/bakaninha-api`:

```nginx
server {
    listen 80;
    server_name api.bakaninha.seu-dominio.com;

    client_max_body_size 25m;   # uploads de imagem

    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Depois habilite e gere SSL:

```bash
sudo ln -s /etc/nginx/sites-available/bakaninha-api /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d api.bakaninha.seu-dominio.com
```

### Uploads persistentes

A pasta `uploads/` é montada em runtime e **não está em git**. Em produção:
- Configure um diretório dedicado fora do clone (ex.: `/var/lib/bakaninha/uploads`) e crie um symlink.
- *Ou* use volume do Docker / S3 (futuro).

---

## Rotas principais

- `GET  /categories/active` — categorias do cardápio
- `GET  /items/active` — itens do cardápio
- `GET  /marmita/sizes/active` — tamanhos de marmita disponíveis
- `GET  /marmita/sizes/:id` — tamanho com grupos + itens filtrados
- `POST /orders/whatsapp` — gera link `wa.me/...` do pedido
- `POST /auth/login` — login admin (JWT)
- `*/admin/*` — todas protegidas por JWT
