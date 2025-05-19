-- Database: Go-Job

-- DROP DATABASE IF EXISTS "Go-Job";

CREATE DATABASE "Go-Job"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_world.1252'
    LC_CTYPE = 'English_world.1252'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

DROP TABLE IF EXISTS address CASCADE;
DROP TABLE IF EXISTS employee CASCADE;
DROP TABLE IF EXISTS account CASCADE;

CREATE TABLE address (
    address_id SERIAL PRIMARY KEY,
    street_name VARCHAR(255) NOT NULL,
    barangay_name VARCHAR(255) NOT NULL,
    city_name VARCHAR(255) NOT NULL,
    province_name VARCHAR(255) NOT NULL
);

CREATE TABLE employee (
    employee_id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    middle_name VARCHAR(100),
    address_id INT REFERENCES address(address_id) ON DELETE SET NULL
);

CREATE TABLE account (
    account_id SERIAL PRIMARY KEY,
    account_email VARCHAR(255) UNIQUE NOT NULL,
    account_password TEXT,  -- Nullable for SSO-only accounts
    account_role VARCHAR(50) NOT NULL CHECK (account_role IN ('employer', 'employee')),

    sso_provider VARCHAR(100),
    sso_id VARCHAR(255),
    sso_token TEXT,
    sso_expiry TIMESTAMP
);

