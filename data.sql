CREATE TABLE shops (
    id SERIAL PRIMARY KEY,
    shop_name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    item_name VARCHAR(255) NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    mrp DECIMAL(10,2) NOT NULL,
    stock DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE invoices (
    id SERIAL PRIMARY KEY,
    shop_id INT NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (shop_id) REFERENCES shops(id) ON DELETE CASCADE
);

CREATE TABLE invoice_items (
    id SERIAL PRIMARY KEY,
    invoice_id INT NOT NULL,
    item_id INT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) GENERATED ALWAYS AS (quantity * unit_price) STORED,
    FOREIGN KEY (invoice_id) REFERENCES invoices(id) ON DELETE CASCADE,
    FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE
);


CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT null,
    email VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE user_roles (
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    role_id INT REFERENCES roles(role_id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id)
);

CREATE TABLE privileges (
    privilege_id SERIAL PRIMARY KEY,
    privilege_name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE role_privileges (
    role_id INT REFERENCES roles(role_id) ON DELETE CASCADE,
    privilege_id INT REFERENCES privileges(privilege_id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, privilege_id)
);

INSERT INTO privileges (privilege_name) VALUES
('CREATE_PRODUCT'),
('UPDATE_PRODUCT'),
('DELETE_PRODUCT'),
('VIEW_PRODUCT'),
('ADD_INVOICE'),
('UPDATE_INVOICE'),
('DELETE_INVOICE'),
('VIEW_INVOICE'),
('ADD_SHOP'),
('UPDATE_SHOP'),
('DELETE_SHOP'),
('VIEW_SHOP');
