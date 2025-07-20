# Digital Products Online Store - Cloudery

Ovo je aplikacija za online prodaju digitalnih proizvoda. Korisnici mogu pregledati proizvode, kupovati ih i preuzimati sadržaje, dok administratori imaju mogućnost upravljanja kategorijama, proizvodima i narudžbinama.

## Sadržaj repozitorijuma
Projekat se sastoji iz dva dela:
- `backend` – Laravel RESTful API
- `frontend` – ReactJS aplikacija

## Pokretanje projekta lokalno

### Kloniranje repozitorijuma

git clone https://github.com/elab-development/internet-tehnologije-2024-projekat-digitalproductsonlinestore_2021_0179.git
cd internet-tehnologije-2024-projekat-digitalproductsonlinestore_2021_0179

# Backend - Laravel

cd backend

## Instalacija paketa
composer install

## Kopiranje .env fajla i podešavanje
cp .env.example .env

## Generisanje ključa
php artisan key:generate

## Podesiti konekciju ka MySQL bazi u .env fajlu
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=digitalproducts_db
DB_USERNAME=root
DB_PASSWORD=

# Migracije i seedovanje 
php artisan migrate --seed

# Pokretanje servera
php artisan serve

# Frontend

cd frontend

## Instalacija paketa
npm install

## Pokretanje aplikacije
npm start

# Funkcionalnosti
## Korisnici
1. Registracija i prijava korisnika
2. Pregled proizvoda po kategorijama
3. Kupovina proizvoda i pristup kupljenom sadržaju
4. Prikaz detalja proizvoda i mogućnost preuzimanja nakon kupovine
5. Pretraga, filtriranje, sortiranje i konverzija cena (RSD, EUR, USD)
6. Reset lozinke

## Administratori
1. Upravljanje proizvodima i kategorijama
2. Pregled narudžbina korisnika
3. Statistika kupovina po kategorijama (grafikon)
4. Različiti interfejs za admin korisnika (admin@gmail.com)

Test korisnički nalog
Admin nalog:
Email: admin@gmail.com
Lozinka: admin123
Korisnički nalog (samostalno kreiranje)

# Tehnologije
Frontend: ReactJS, Axios, Bootstrap, Recharts
Backend: Laravel 10, Sanctum, MySQL
Baza podataka: relacije, transakcije, trigeri
API integracije: ExchangeRate API, šale API

