# teteu-beats

**Plataforma de streaming pessoal dos beats do Teteu.**

Plataforma de streaming para ouvir os beats do Teteu direto no browser, sem download, sem cadastro.

---

## Stack

- **Next.js 14** + TypeScript
- **Supabase** — banco de dados PostgreSQL + armazenamento dos arquivos de áudio

## Rodando localmente

```bash
git clone https://github.com/seuusuario/teteu-beats.git
cd teteu-beats
npm install
npm run dev
```

Crie um arquivo `.env.local` na raiz do projeto:

```bash
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima
```

## Como funciona

Os beats são armazenados como arquivos MP3 no **Supabase Storage** e seus metadados (título, artista, gênero) em uma tabela **PostgreSQL**. O frontend busca a lista e faz o stream do áudio direto pela URL do storage — sem necessidade de download.

---

Feito por Fguimaraes12
