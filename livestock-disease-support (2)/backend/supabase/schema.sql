create table if not exists species (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  icon text,
  description text,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists diseases (
  id uuid primary key default gen_random_uuid(),
  species_id uuid references species(id),
  name text not null,
  local_name text,
  pathogen_type text,
  description text,
  symptoms text[] default '{}',
  transmission text,
  risk_factors text[] default '{}',
  diagnosis_notes text,
  treatment text,
  prevention text,
  vaccination_notes text,
  when_to_call_vet text,
  emergency_warning_signs text[] default '{}',
  farmer_summary text,
  source_reference text,
  status text default 'draft',
  verified boolean default false,
  metadata jsonb default '{}'::jsonb,
  last_updated_at timestamptz default now(),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists parasites (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  parasite_type text check (parasite_type in ('internal','external')),
  species_affected text[] default '{}',
  severity text,
  preventable boolean,
  description text,
  symptoms text[] default '{}',
  transmission text,
  treatment text,
  prevention text,
  control_recommendations text,
  drug_notes text,
  practical_advice text,
  verified boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists vet_shops (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  suburb text,
  address text,
  phone text,
  whatsapp text,
  latitude double precision,
  longitude double precision,
  services text[] default '{}',
  products text[] default '{}',
  opening_hours text,
  verified boolean default false,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists vet_doctors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  title text,
  area text,
  phone text,
  whatsapp text,
  email text,
  affiliation text,
  species_specialization text[] default '{}',
  emergency_available boolean default false,
  notes text,
  verified boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists vet_offices (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  office_type text,
  province text,
  district text,
  address text,
  phone text,
  email text,
  opening_hours text,
  officer_in_charge text,
  latitude double precision,
  longitude double precision,
  notes text,
  verified boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists sync_queue (
  id uuid primary key default gen_random_uuid(),
  entity_type text not null,
  entity_id uuid,
  operation text not null,
  payload jsonb not null,
  status text default 'pending',
  retry_count int default 0,
  created_at timestamptz default now(),
  synced_at timestamptz
);
